import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Branches = () => {
const [branches, setBranches] = useState([])


useEffect(() => {
  const handlerBranches = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/branches");
      if (response.ok) {
        const branches = await response.json();
        setBranches(branches);
      } else {
        throw new Error("Error al obtener los datos de las sucursales");
      }
    } catch (e) {
      console.error(e);
    }
  };
  handlerBranches();
}, []);


console.log(branches, "BRANCHES")



  return (
    <Box>
        <Box>
        Sucursales 

        </Box>

        
    </Box>
  )
}

export default Branches