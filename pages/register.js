import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { StyledInputLabel } from "../components/LayOut";

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
  ]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      Swal.fire({
        title: "Las contraseñas deben coincidir.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    axios
      .post(`/api/users/register`, {
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
          title: "HUBO UN ERROR",
          text: "Verifica los datos ingresados",
          icon: "error",
          confirmButtonText: "Continuar",
        });
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
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#F5F5F5",
      p: { xs: 2, sm: 4 },
    }}
  >
    <Box
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.1)",
        maxWidth: { xs: "90%", sm: "750px" },
        width: "100%",
        bgcolor: "#FFFFFF",
        padding: { xs: 3, sm: 5 },
      }}
    >
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Crear cuenta
      </Typography>
  
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <StyledInputLabel>Nombre</StyledInputLabel>
              <TextField
                name="name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <StyledInputLabel>Apellido</StyledInputLabel>
              <TextField
                name="lastname"
                variant="outlined"
                fullWidth
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <StyledInputLabel>Email</StyledInputLabel>
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
            <Grid item xs={6}>
              <StyledInputLabel>DNI</StyledInputLabel>
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
            <Grid item xs={6} sm={6}>
              <StyledInputLabel>Contraseña</StyledInputLabel>
              <OutlinedInput
                fullWidth
                value={password}
                name="contraseña"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <StyledInputLabel>Repetir contraseña</StyledInputLabel>
              <OutlinedInput
                fullWidth
                value={verifyPassword}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setVerifyPassword(e.target.value)}
                sx={{ color: isPasswordMismatch ? "red" : "black" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {isPasswordMismatch && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  *Las contraseñas deben coincidir
                </Typography>
              )}
            </Grid>
  
            {/* Validaciones de contraseña */}
            <Grid item xs={12}>
              <Box
                sx={{
                  bgcolor: "#ECECEC",
                  p: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography sx={{ mb: 1 }}>La contraseña debe contener:</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={1} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
                  {validations.map((validation) => (
                    <Box key={validation.id} sx={{ display: "flex", alignItems: "center", color: validation.color }}>
                      {validation.color === "red" ? (
                        <CancelPresentationOutlined sx={{ fontSize: "15px" }} />
                      ) : (
                        <CheckBox sx={{ color: "green", fontSize: "15px" }} />
                      )}
                      &nbsp; {validation.oracion}
                    </Box>
                  ))}
                </Grid>
              </Box>
            </Grid>
  
            <Grid item xs={12}>
              <Typography sx={{ textAlign: "center", color: "#A442F1", fontWeight: "bold", mt: 2 }}>
                ¿Olvidaste tu contraseña?
              </Typography>
              <Button
                type="submit"
                fullWidth
                sx={{
                  color: "white",
                  bgcolor: "#A442F1",
                  padding: "10px 22px",
                  borderRadius: "10px",
                  mt: 2,
                  "&:hover": { color: "#A442F1", bgcolor: "white", border: "1px solid #A442F1" },
                }}
              >
                Registrarme
              </Button>
              <Divider sx={{ my: 3 }} />
              <Link href="/">
                <Button
                  fullWidth
                  sx={{
                    color: "#A442F1",
                    bgcolor: "rgba(164, 66, 241, 0.1)",
                    padding: "10px 22px",
                    borderRadius: "10px",
                  }}
                >
                  ¿Ya tienes cuenta? Iniciar sesión
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  </Box>
  
  );
};
export default Register;
