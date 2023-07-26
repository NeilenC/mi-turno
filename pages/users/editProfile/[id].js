import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { CancelPresentationOutlined, CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import useUserData from "../../../Hooks/useUserData";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2"
import handlePassword from "../../../functions"

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
  const [validations, setValidations] = useState([
    {
      id: 1,
      oracion: "ABC tiene una mayúscula",
      color: "grey",
    },
    {
      id: 2,
      oracion: "abc tiene una minúscula",
      color: "grey",
    },
    {
      id: 3,
      oracion: "123 tiene un Número",
      color: "grey",
    },
    {
      id: 4,
      oracion: "*** Minimo 8 caracteres",
      color: "grey",
    },
  ]);


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
      Swal.fire({
        title: 'Sus datos fueron actualizados exitosamente',
        icon: 'success',
        confirmButtonText: 'Continuar'
      })
      window.location.reload();
      return data
    } catch (e) {
      Swal.fire({
        title: 'Error al actualizar los datos',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      })
      throw e;
    }
  };

  const handlePassword = (data) => {
    const min = /[a-z]/;
    const may = /[A-Z]/;
    const num = /\d/;

    const updatedValidations = validations.map((validation) => {
      if (validation.id === 1) {
        return {
          ...validation,
          color: may.test(data) ? "green" : "red",
        };
      }
      if (validation.id === 2) {
        return {
          ...validation,
          color: min.test(data) ? "green" : "red",
        };
      }
      if (validation.id === 3) {
        return {
          ...validation,
          color: num.test(data) ? "green" : "red",
        };
      }
      if (validation.id === 4) {
        return {
          ...validation,
          color: data.length >= 8 ? "green" : "red",
        };
      }
      return validation;
    });

    setValidations(updatedValidations);
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
          height: "800px",
          left: "calc(50% - 800px/2)",
          top: "160px",
          p: "50px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ fontSize: "22px", fontWeight: "bold", pb: 2 }}
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
        <Grid xs={12} item sx={{ pb: 0.5 , width:"96.5%"}}>
          <InputLabel>DNI</InputLabel>
          <TextField
            variant="outlined"
            // type="number"
            placeholder={user.DNI}
            fullWidth
            // value={DNI}   
            onChange={(e) => setDNI(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb:  0.5,width:"96.5%" }}>
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
        <Grid xs={12} item sx={{ pb:  0.5 ,width:"96.5%"}}>
          <InputLabel>Teléfono</InputLabel>
          <TextField
            placeholder={user.phoneNumber}
            variant="outlined"
            // type="number"
            fullWidth
            // value={phoneNumber} 
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
                  onChange={(e) => {setPassword(e.target.value),
                    handlePassword(e.target.value)}}
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
               <Grid item xs={12} sm={6} sx={{mb:3}}>
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

              <Grid item xs={10}>
                <Box sx={{ bgcolor: "#ECECEC", pt: 2 , pb:2 , width:"96%"}}>
                  <Box sx={{ ml: 3, fontSize:"18px"}}>
                    La contraseña debe contener:
                    <Divider sx={{ width: "400px" }} />
                    <Grid container spacing={2} sm={10} sx={{ pt: 2 }}>
  <Grid item xs={6.5} sx={{p:2}}>
    {validations.slice(0, 2).map((validation) => (
      <Box key={validation.id} style={{ color: validation.color}}>
        <Box sx={{ mb:1}}>

        {validation.color === "grey" ? (
          validation.oracion
          ) : (
          <>
            {validation.color === "red" ? (
              <CancelPresentationOutlined />
              ) : (
                <CheckBox sx={{ color: "green" }} />
                )}
            {validation.oracion}
          </>
        )}
        </Box>
      </Box>
    ))}
  </Grid>

  <Grid item xs={5} sx={{}}>
    {validations.slice(2, 4).map((validation) => (
      <Box key={validation.id} style={{ color: validation.color }}>
        <Box sx={{ mb:1, width:"150%"}}>

        {validation.color === "grey" ? (
          validation.oracion
        ) : (
          <>
            {validation.color === "red" ? (
              <CancelPresentationOutlined />
              ) : (
              <CheckBox sx={{ color: "green" }} />
            )}
            {validation.oracion}
          </>
        )}
      </Box>
    </Box>
    ))}
  </Grid>
</Grid>
                  </Box>
                </Box>
              </Grid>


        <Button
          fullWidth
          onClick={editProfile}
          sx={{
            mt:"20px",
            bgcolor: "#A442F1",
            color: "#ffffff",
            p: 2,
            borderRadius: "10px",
           width:"96%"
          }}
        >
          Aceptar
        </Button>
      </Grid>
    </Box>
  );
};

export default EditProfile;
