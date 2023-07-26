import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"

import axios from "axios";
import { CancelPresentationOutlined, CheckBox } from "@mui/icons-material";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [DNI, setDNI] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const isPasswordMismatch = password !== verifyPassword;

  // const passwordsMatchValidation = {
  //   id: 5,
  //   oracion: "Las contraseñas deben coincidir",
  //   color: isPasswordMismatch ? "red" : "grey",
  // };
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
    // passwordsMatchValidation
  ]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  // console.log("PASSWO", isPasswordMismatch);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      Swal.fire({
        title:"Las contraseñas deben coincidir.",
        icon:"error",
        confirmButtonText:"Ok"
      })
      return;
    }

    axios
      .post("http://localhost:3000/api/users/register", {
        name: name,
        lastname: lastname,
        password: password,
        email: email,
        DNI: DNI,
      })
      .then((res) => {
        router.push("/");
      })
      .catch((error) => {
        Swal.fire({
          title:"HUBO UN ERROR",
          text:"Verifica los datos ingresados",
          icon:"error",
          confirmButtonText:"Continuar"
        })
      });
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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          justifyContent: "center",
          position: "absolute",
          borderRadius: "12px",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12);",
          maxWidth: "750px",
          height: "900px",
          left: "calc(50% - 750px/2)",
          top: "85px",
          padding: "40px 32px 32px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            ml: 4,
            color: "#A442F1",
            display: "flex",
            mr: 4,
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          <AiOutlineArrowLeft />
          <Box sx={{ ml: 1 }}>Atras</Box>
        </Box>
        <Box sx={{ fontSize: "22px", fontWeight: "bold", textAlign: "center" }}>
          Crear cuenta
        </Box>
  
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: "32px",
            gap: "20px",
           
          }}
        >
          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <InputLabel>Nombre</InputLabel>
                <TextField
                  name="name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Apellido</InputLabel>
                <TextField
                  name="lastname"
                  variant="outlined"
                  fullWidth
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Email</InputLabel>
                <TextField
                  name="email"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>DNI</InputLabel>
                <TextField
                  name="DNI"
                  type="DNI"
                  variant="outlined"
                  required
                  fullWidth
                  value={DNI}
                  onChange={(e) => setDNI(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput
                  fullWidth
                  value={password}
                  name="contraseña"
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {setPassword(e.target.value),
                    handlePassword(e.target.value)}}
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
              <Grid item xs={12} sm={6} sx={{pb:2}}>
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
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{pt:5}}>
                <Box sx={{bgcolor: "#ECECEC", pt: 2, pb:2}}>
                  <Box sx={{ ml: 3, fontSize:"18px" }}>
                    La contraseña debe contener:
                    <Divider sx={{ width: "400px" }} />
                    <Grid container spacing={2} sm={10} sx={{ pt: 2, width: "516px", height: "104px" }}>
  <Grid item xs={6} sx={{p:2}}>
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

  <Grid item xs={6}>
    {validations.slice(2, 4).map((validation) => (
      <Box key={validation.id} style={{ color: validation.color }}>
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
</Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  sx={{
                    color: "#A442F1",
                    fontWeight: "bold",
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Grid>
                <Box>
                  <Button
                    type="submit"
                    sx={{
                      color: "white",
                      bgcolor: "#A442F1",
                      padding: "12px 24px",
                      "&:hover": { color: "#A442F1" },
                    }}
                    fullWidth
                  >
                    Registrarme
                  </Button>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Divider />
                </Box>
                <Link href="/">
                  <Box>
                    <Button
                      sx={{
                        color: "#A442F1",
                        bgcolor: "rgba(164, 66, 241, 0.1)",
                        padding: "12px 24px",
                      }}
                      fullWidth
                    >
                      Ya tienes cuenta? Iniciar sesión
                    </Button>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
 }
export default Register;
