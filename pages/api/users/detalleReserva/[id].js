import { connectMongoDb } from "../../../../lib/mongodb";
import Shift from "../../../../backend/models/shift";
import nodemailer, { createTransport } from "nodemailer"
import google from "googleapis"
import accountTransport from "../../../../account_transport.json"
import { oauth2 } from "googleapis/build/src/apis/oauth2";
// import { OAuth2 } from "nodemailer/lib/smtp-connection";

//Obtenemos las reservas que tiene el usuario
export default async function handler(req, res) {
  await connectMongoDb();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const detalleReserva = await Shift.findOne({ _id: id });
      if (detalleReserva) {
        res.status(200).send([detalleReserva]);
      } else {
        res.status(404).send([]);
      }
    } catch (e) {
      res.status(500).send("Error al obtener la reserva");
    }
  }

  if(req.method === "POST") {
    try{

      const reserva = await Shift.findOne({_id:id});
    
        const transporter =  nodemailer.createTransport({
          host: 'smtp.gmail.com',
          // service: "Gmail",
          secure: true, 
          port: 465,
          auth: {
              user: 'neilen.monlezun@gmail.com',
              pass: ""
          },
        
      });
        console.log("detalle reserva", reserva, reserva.email)
        const mailOptions = {
          from: "Remitente",
          to: `${reserva.email}`,
          subjet: "Enviado desde nodemailer",
          title: "Tu turno",
          text: `El turno fué reservado para el día ${reserva.date} a las ${reserva.shift} en ${reserva.branchName} `
        }
        console.log("MAIL", mailOptions)
        transporter.sendMail(mailOptions, (error,info) => {
          if (error) {
            console.error("Error al enviar el correo:", error);
            res.status(500).send({ message: "Error al enviar mail" });
          } else {
            console.log("Correo enviado con éxito:", info.response);
            res.status(200).send({ message: "Mail enviado con éxito" });
          }
        })
      
    }catch(e) {
      console.log("ERROR CATCH" , e)
      res.status(500).send("Error al enviar mail ");

    }
  }
}


   // const mail = async (callback) => {
      //   const oauth2Client = new oauth2(
      //     accountTransport.auth.clientId,
      //     accountTransport.auth.clientSecret,
      //     'https://developers.google.com/oauthplayground'
      //   );
      //   oauth2Client.setCredentials({
      //     refresh_token: accountTransport.auth.refreshToken,
      //     tls: {
      //       rejectUnauthorized: false
      //     }
      //   });
      //   oauth2Client.getAccessToken((err,token) => {
      //     if(err) {
      //       return console.log(err);
      //     }
      //     accountTransport.auth.accessToken = token;
      //     callback(nodemailer.createTransport(accountTransport))
      //   })
      // }
