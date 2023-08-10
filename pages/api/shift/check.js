import { connectMongoDb } from "../../../lib/mongodb";
import Branches from "../../../backend/models/branches";
import Shift from "../../../backend/models/shift";
import moment from "moment";
//GET
export default async function handler(req, res) {
  await connectMongoDb();

  const { _id, date, branchId } = req.body;


  if (req.method === "POST") {
    try {
      //------------------Sucursal
      const branch = await Branches.findOne({ _id: branchId });

      const startTime = moment(branch.openingH, "HH:mm");
      const endTime = moment(branch.closingH, "HH:mm");
      const duration = moment.duration(30, "minutes");
      // Arreglo de horarios disponibles
      const timeSlots = [];

      let currentTime = startTime.clone();

      while (currentTime.isBefore(endTime)) {
        timeSlots.push(currentTime.format("HH:mm"));
        currentTime.add(duration);
      }

      //------------------Turnos
      const shifts = await Shift.find({ branchId, date });

      //Arreglo con los turnos ocupados
      const horariosTomados = shifts.map((turno) => {
        if(turno && turno.status !== "cancelada" || turno.status !== "asistida") {
          return turno.shift;
        }
      });

      //Si el resultado es false filtra los horarios ya tomados y devuelve los disponibles
      const horariosDisponibles = timeSlots.filter((horario) => {
        return !horariosTomados.includes(horario);
      });

      //Pushea el horario que se canceló
      // if(shift){
      //   horariosDisponibles.push(shift)
      // }

      res.send(horariosDisponibles);
    } catch (e) {
      res.send(e);
    }
  }
}
