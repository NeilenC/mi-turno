import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Swal from "sweetalert2"
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';



const Operators = () => {
  const router = useRouter();
  const [operators, setOperators] = useState([]);

  const handlerOperators = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/findOp");
      if (response.ok) {
        const operators = await response.json();
        setOperators(operators);
      } else {
        throw new Error("Error al obtener los datos de los operadores");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handlerOperators();
  }, []);

  const deleteOp = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Espera",
        text:"¿Estas seguro de querer eliminar este operador?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#9c27b0 ',
        confirmButtonText: 'Aceptar',
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: false
     })

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:3000/api/admin/operators/${id}`,
          {
            method: "DELETE",
          }
        );
        console.log("RESPONSE", response.ok, "ID", id);
        if (response.ok) {
          Swal.fire({
            title:"Operador eliminado",
            icon:"success",
          })
          window.location.reload();
        } else {
          Swal.fire({
            title:"Error al eliminar el operador",
            icon:"error",
            confirmButtonText:"Continuar"
          })
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
    {operators.length ? 
   
    <Box sx={{ pt: "90px" }}>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          pb: 3,
          pl: "155px",
          display: "flex",
          direction: "column",
        }}
      >
        Operadores
      </Box>
      <Grid container spacing={2} sx={{ display: "flex" }}>
        {operators.map((operator) => (
          <Grid item key={operator._id} xs={10} sx={{ m: "auto" }}>
            <Box
              sx={{
                border: "1.5px solid #DEDEDE",
                p: "24px",
                borderRadius: "12px",
                display: "flex",
                direction: "column",
                alignItems: "center",
                fontSize: "14px",
                // justifyContent: "space-between",
              }}
            >
              <Grid item xs={6}>
                <InputLabel>Nombre</InputLabel>
                {operator.name} {operator.lastname}
              </Grid>

              <Grid item xs={6}>
                <InputLabel>Email</InputLabel>
                <Grid>{operator.email}</Grid>
              </Grid>

              <Grid item xs={6}>
                <InputLabel>Teléfono</InputLabel>
                <Grid>{operator.phoneNumber}</Grid>
              </Grid>

              <Grid item xs={6}>
                <InputLabel>DNI</InputLabel>
                <Grid>{operator.DNI}</Grid>
              </Grid>

              <Grid item xs={6}>
                <InputLabel>Sucursal</InputLabel>
                <Grid>{operator.branchName}</Grid>
              </Grid>

              <Grid item xs={6}>
                <InputLabel>Contraseña</InputLabel>
                <Typography variant="body1">**************</Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  sx={{
                    p: "12px 24px",
                    bgcolor: "#F5F5F5",
                    color: "#A442F1",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    router.push(`/admin/editOperators/${operator._id}`);
                  }}
                >
                  Editar
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  sx={{
                    p: "10px 24px",
                    // bgcolor: "#F5F5F5",
                    color: "#e73c35",
                    fontWeight: "bold",
                  }}
                  // onClick={()=> {router.push(`/admin/editOperators/${operator._id}`)}}
                >
                  <DeleteForeverOutlinedIcon
                    onClick={() => deleteOp(operator._id)}
                  />
                </Button>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box> :  <Box
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          display: "flex",
        }}
      >
        <Box  sx={{m:"auto", pt:"300px"}} >
        <Stack sx={{ color: 'purple.500' }} spacing={2} direction="row">
          
      <CircularProgress color="secondary" />
    </Stack> </Box> </Box> }
    </>
  );
};

export default Operators;
