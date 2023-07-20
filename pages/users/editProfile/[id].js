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
  const [verifyPassword, setVerifyPassword] = useState("")
  const router = useRouter();
  const { id } = router.query;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const isPasswordMismatch = password !== verifyPassword;

  const editProfile = async () => {

    if (password !== verifyPassword) {
      alert("Las contraseñas deben coincidir.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || user.name,
          lastname: lastName || user.lastname,
          email: email || user.email,
          DNI: DNI || user.DNI,
          phoneNumber: phoneNumber || user.phoneNumber,
          password: password || user.password,
        }),
      });
      const data = response.json();
      alert("Sus datos fueron actualizados exitosamente");
      window.location.reload();
      return data
    } catch (e) {
      alert("Error al actualizar los datos");
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
          width: "800px",
          height: "680px",
          left: "calc(50% - 800px/2)",
          top: "160px",
          p: "60px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ fontSize: "20px", fontWeight: "bold", pb: 2 }}
        >
          Editar datos de mi perfil
        </Box>
        <Grid container xs={12} spacing={3}>
          <Grid item xs={6} sm={6} sx={{ pb: 0.5 }}>
            <InputLabel>Nombre</InputLabel>
            <TextField
              placeholder={user.name}
              variant="outlined"
              fullWidth
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid xs={6} sm={6} item sx={{ pb: 0.5 }}>
            <InputLabel>Apellido</InputLabel>
            <TextField
              placeholder={user.lastname}
              variant="outlined"
              fullWidth
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid xs={12} item sx={{ pb: 0.5 }}>
          <InputLabel>DNI</InputLabel>
          <TextField
            variant="outlined"
            type="number"
            placeholder={user.DNI}
            fullWidth
            value={DNI} 
            onChange={(e) => setDNI(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb:  0.5 }}>
          <InputLabel>Email</InputLabel>
          <TextField
            placeholder={user.email}
            type="email"
            variant="outlined"
            fullWidth
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb:  0.5 }}>
          <InputLabel>Teléfono</InputLabel>
          <TextField
            placeholder={user.phoneNumber}
            variant="outlined"
            type="number"
            fullWidth
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid container xs={12} spacing={3}>
         <Grid item xs={12} sm={6}>
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput
                  fullWidth
                  value={password}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
               </Grid>
               <Grid item xs={12} sm={6}>
                <InputLabel>Repetir contraseña</InputLabel>
                <OutlinedInput
                  fullWidth
                  name="contraseña"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    ...(isPasswordMismatch ? { color: "red" } : { color: "black" }),
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
               </Grid>
              </Grid>
        <Button
          fullWidth
          onClick={editProfile}
          sx={{
            mt:"35px",
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
