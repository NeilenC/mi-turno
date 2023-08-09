import { Box, Button, Grid } from "@mui/material";
import React,{ useEffect, useState } from "react";

export default function Buscador() {

  const [dni, setDni] = useState("");
  const [result, setResult] = useState([]);

  const buscarTurno = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/operators/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni }),
      });

      const data = await response.json();
      console.log("DATA", data)
      setResult(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  console.log("RESULT", result)

  console.log(dni)

//   useEffect(()=>{
//     buscarTurno()
//   },[])

  return (
    <Box>
      <input
        type="text"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="Ingresa el DNI"
      />
  {result.map((item, index) => (
        <Box key={index}>
          <p>Nombre: {item.fullname}</p>
          <p>Fecha: {item.date}</p>
          {/* Agrega aquí los demás campos que quieras mostrar */}
        </Box>
      ))}
    </Box>
  );
}
