import { connectMongoDb } from '../../lib/mongodb';
import Branches from '../../backend/models/branches.js';
import cron from "node-cron"

export default function handler ( )  {
 connectMongoDb()
// Tarea programada que se ejecuta al finalizar el día (por ejemplo, a las 00:00)
cron.schedule('0 0 * * *', async () => {
    try {
      const branches = await Branches.find({});
  
      for (const branch of branches) {
        for (const turno of branch.virtualTurns) {
          turno.disabled = false;
        }
  
        await branch.save();
        console.log(`Turnos renovados para la sucursal ${branch.name}`);
      }
    } catch (err) {
      console.error('Error al renovar los turnos:', err);
    }
  });
  
}