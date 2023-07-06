import { Schema, model, models } from 'mongoose';
// import moment from "moment"

const Branch = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  maxCap: {
    type: Number,
  },
  openingH: {
    type: String,
  },
  closingH: {
    type: String,
  },
  virtualTurns: [{
    turno: String,
    disabled: Boolean,
  }],
  virtualBooking: [{
    booking: String
  }]
});
  
// Branch.pre('save', function (next) {
//   const intervalo = 30; // Intervalo de tiempo en minutos
//   const turnos = [];
//   const fechaActual = new Date();
//   const mesActual = fechaActual.getMonth();
//   const añoActual = fechaActual.getFullYear();

//   const apertura = new Date();
//   apertura.setHours(parseInt(this.openingH.split(':')[0], 10));
//   apertura.setMinutes(parseInt(this.openingH.split(':')[1], 10));

//   const cierre = new Date();
//   cierre.setHours(parseInt(this.closingH.split(':')[0], 10));
//   cierre.setMinutes(parseInt(this.closingH.split(':')[1], 10));

//   // Generar turnos para cada día del mes, desde el mes actual hasta tres meses en adelante
//   for (let mes = mesActual; mes <= mesActual + 2; mes++) {
//     const fecha = new Date(añoActual, mes, 1);

//     while (fecha.getMonth() === mes) {
//       let turno = new Date(apertura);
//       while (turno <= (cierre - intervalo)) {
//         const turnoString = turno.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
//         const turnoObj = { turno: turnoString, disabled: false };
//         turnos.push(turnoObj);

//         turno.setMinutes(turno.getMinutes() + intervalo);
//       }

//       // Avanzar al siguiente día
//       fecha.setDate(fecha.getDate() + 1);
//     }
//   }

//   this.virtualTurns = turnos;
//   next();
// });


Branch.pre('save', function (next) {
  const intervalo = 30; // Intervalo de tiempo en minutos
  const turnos = [];
  const mes = new Date().getMonth(); // Mes actual
  
  const apertura = new Date();
  apertura.setHours(parseInt(this.openingH.split(':')[0], 10));
  apertura.setMinutes(parseInt(this.openingH.split(':')[1], 10));

  const cierre = new Date();
  cierre.setHours(parseInt(this.closingH.split(':')[0], 10));
  cierre.setMinutes(parseInt(this.closingH.split(':')[1], 10));
  
  // Obtener la fecha del primer día del mes
  const fecha = new Date(new Date().getFullYear(), mes, 1);

  // Generar turnos para cada día del mes
  while (fecha.getMonth() === mes) {
    let turno = new Date(apertura);
    while (turno <= (cierre - intervalo)) {
      const turnoString = turno.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const turnoObj = { turno: turnoString, disabled: false };
      turnos.push(turnoObj);
  
      turno.setMinutes(turno.getMinutes() + intervalo);
    }
    
    // Avanzar al siguiente día
    fecha.setDate(fecha.getDate() + 1);
  }
  
  this.virtualTurns = turnos;
  next();
});


const Branches = models.Branches || model('Branches', Branch);

// // export { mongoose, Schema }
export default Branches;
