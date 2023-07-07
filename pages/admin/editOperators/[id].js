import axios from "axios";
import { Box, Button, Grid, InputLabel, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditOperators = () => {
  // const userInfo = useSelector(state => state.userInfo)
  // const [updateOperator, setUpdateOperator] = useState("")
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  // const [password, setPassword] = useState("")

  const id = "648c704de38b236e45f16803";

  async function editOperators() {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/operator/edit/${id}`
        //    {
        //     name: name,
        //     lastName: lastName,
        //     email: email,
        //     branch: branch
        //   }
      );
      alert("Se actualizaron los datos del operador");
    } catch (e) {
      alert("No se pudo actualizar datos de operador");
      console.log("ERROR DEL CATCH", e);
    }
  }

  useEffect(() => {
    editOperators();
  }, []);

  console.log(name, lastName, email, branch);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          margin: "auto",
          justifyContent: " center",
          position: "absolute",
          borderRadius: "12px",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12);",
          width: "980px",
          height: "544px",
          left: "calc(50% - 980px/2)",
          top: "160px",
          padding: "40px 32px 32px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ fontSize: "20px", fontWeight: "bold", p: 3 }}
        >
          Editar datos de operador
        </Box>
        <Grid xs={12} item sx={{ pt: 2, pb: 2 }}>
          <InputLabel>Nombre</InputLabel>
          <TextField
            name="name"
            type="name"
            variant="outlined"
            fullWidth
            value={name} // agregar el valor del estado
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pt: 2, pb: 2 }}>
          <InputLabel>Apellido</InputLabel>
          <TextField
            name="Apellido"
            type="Apellido"
            variant="outlined"
            fullWidth
            value={lastName} // agregar el valor del estado
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pt: 2, pb: 2 }}>
          <InputLabel>Email</InputLabel>
          <TextField
            name="Apellido"
            type="Apellido"
            variant="outlined"
            fullWidth
            value={email} // agregar el valor del estado
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pt: 2, pb: 5 }}>
          <InputLabel>Sucursal</InputLabel>

          <TextField
            name="branch"
            type="branch"
            variant="outlined"
            fullWidth
            value={branch} // agregar el valor del estado
            onChange={(e) => setBranch(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pt: 2, pb: 5 }}>
          <InputLabel>Contraseña</InputLabel>

          <TextField
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            //   value={password} // agregar el valor del estado
            //   onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ color: "#A442F1", fontWeight: "bold" }}>
            Editar contraseña
          </Box>
        </Grid>
        <Button
          fullWidth
          onClick={editOperators}
          sx={{
            bgcolor: "#A442F1",
            color: "#ffffff",
            p: 2,
            borderRadius: "10px",
          }}
        >
          Aceptar
        </Button>
      </Box>
    </Box>
  );
};

export default EditOperators;
