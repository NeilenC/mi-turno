import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useUserData from "../../../Hooks/useUserData";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const EditProfile = () => {
  useUserData();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DNI, setDNI] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const editProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || user.name,
          lastname: lastName || user.lastname,
          email: email || user.email,
          password: password || user.password,
        }),
      });
      const data = response.json();
      alert("Sus datos fueron actualizados exitosamente");
      window.location.reload();
    } catch (e) {
      throw e;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Grid
        sx={{
          margin: "auto",
          justifyContent: " center",
          position: "absolute",
          borderRadius: "12px",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12);",
          width: "980px",
          height: "700px",
          left: "calc(50% - 980px/2)",
          top: "160px",
          padding: "40px 32px 32px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ fontSize: "20px", fontWeight: "bold", pb: 1 }}
        >
          Editar datos de operador
        </Box>
        <Grid container xs={12} spacing={3} >
          <Grid item xs={6} sm={6} sx={{ pb: 1 }}>
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
          <Grid xs={6} sm={6} item sx={{ pb: 1 }}>
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
        </Grid>
        <Grid xs={12} item sx={{ pb: 1 }}>
          <InputLabel>DNI</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={DNI} // agregar el valor del estado
            onChange={(e) => setDNI(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb: 1 }}>
          <InputLabel>Email</InputLabel>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={email} // agregar el valor del estado
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb: 1 }}>
          <InputLabel>Teléfono</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={phoneNumber} // agregar el valor del estado
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb: 5 }}>
          <InputLabel>Constraseña</InputLabel>
          <OutlinedInput
            fullWidth
            value={password} // agregar el valor del estado
            name="contraseña"
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Button
          fullWidth
          onClick={editProfile}
          sx={{
            bgcolor: "#A442F1",
            color: "#ffffff",
            p: 2,
            borderRadius: "10px",
          }}
        >
          Aceptar
        </Button>
      </Grid>
    </Box>
  );
};

export default EditProfile;
