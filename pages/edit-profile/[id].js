import { Box, Button, Grid, Input, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

const Profile = () => {
  async function handlerEdit() {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${id}`);
    } catch (e) {
      throw e;
    }
  }

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
          onSubmit={handlerEdit}
          component="form"
          noValidate
          sx={{ fontSize: "20px", fontWeight: "bold", p: 3 }}
        >
          Mis datos
        </Box>
        <Grid xs={12} item sx={{ pt: 2, pb: 2 }}>
          <InputLabel>Email</InputLabel>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            // value={email} // agregar el valor del estado
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pt: 2, pb: 2 }}>
          <InputLabel>Contraseña</InputLabel>
          <TextField
            name="contraseña"
            type="contraseña"
            variant="outlined"
            fullWidth
            // value={email} // agregar el valor del estado
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pt: 2, pb: 5 }}>
          <InputLabel>Teléfono</InputLabel>

          <TextField
            name="Teléfono"
            type="Teléfono"
            variant="outlined"
            fullWidth
            // value={email} // agregar el valor del estado
            // onChange={(e) => setEmail(e.target.value)}
          />
          <Box sx={{ color: "#A442F1", fontWeight: "bold" }}>
            Editar contraseña
          </Box>
        </Grid>
        <Button
          fullWidth
          onClick={handlerEdit}
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

export default Profile;
