import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import useBranchData from "../../Hooks/useBranchData";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledInputLabel } from "../../components/LayOut";

const CreateOperator = () => {
  useBranchData();
  const [name, setName] = useState("");
  const [DNI, setDNI] = useState(null);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [branch, setBranch] = useState("");
  const branches = useSelector((state) => state.branches);
  const isPasswordMismatch = password !== verifyPassword;

  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleNewOperator(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/createOp", {
        name: name,
        lastname: lastName,
        email: email,
        DNI: DNI,
        password: password,
        branchId: branch._id,
        branchName: branch.name,
        phoneNumber: phoneNumber,
        isOp: true,
      });
      if (password === verifyPassword && response.status === 200) {
        router.push("/admin/operators");
      }
    } catch (e) {
      Swal.fire({
        title: "Hubo un error",
        text: "No se ha podido crear el operador",
        icon: "error",
        confirmButtonText: "Continuar",
      });
      console.log("ERROR", e);
    }
  }

  return (
    <Box sx={{ height: "120vh", bgcolor: "#ECECEC", pt: 7 }}>
      <Grid container>
        <Box
          onSubmit={handleNewOperator}
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            margin: "auto",
            borderRadius: "12px",
            boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12)",
            padding: "20px 32px 32px",
            bgcolor: "#FFFFFF",
            display: "inline-block",
          }}
        >
          <Box sx={{ fontSize: "21px", fontWeight: "bold", pb: 3 }}>
            Crear nuevo operador
          </Box>
          <Grid container spacing={2} sx={{ pb: 2 }}>
            <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 1 }}>
              <StyledInputLabel>Nombre</StyledInputLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 1 }}>
              <StyledInputLabel>Apellido</StyledInputLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pb: 2 }}>
            <Grid xs={6} item sx={{ pb: 2 }}>
              <StyledInputLabel>Email</StyledInputLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={6} item sx={{ pb: 2 }}>
              <StyledInputLabel>Teléfono</StyledInputLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pb: 2 }}>
            <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 1 }}>
              <StyledInputLabel>DNI</StyledInputLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                value={DNI}
                onChange={(e) => {
                  setDNI(e.target.value);
                }}
              />
            </Grid>

            <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 1 }}>
              <StyledInputLabel>Sucursal</StyledInputLabel>
              <Select
                fullWidth
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
              >
                {branches.map((branch) => (
                  <MenuItem key={branch._id} value={branch}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pb: 1 }}>
            <Grid item xs={12} sm={6}>
              <StyledInputLabel>Contraseña</StyledInputLabel>
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
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <StyledInputLabel>Repetir contraseña</StyledInputLabel>
              <OutlinedInput
                fullWidth
                name="contraseña"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                sx={{
                  ...(isPasswordMismatch
                    ? { color: "purple" }
                    : { color: "black" }),
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
              {isPasswordMismatch ? (
                <Typography variant="body2">
                  *las contraseñas deben coincidir
                </Typography>
              ) : null}
            </Grid>
          </Grid>
          <Box
            sx={{
              pl: "30px",
              bgcolor: "lightgray",
              p: 2,
              mb: 2,
              borderRadius: "10px",
            }}
          >
            <Typography sx={{ p: 0.5 }}>
              {" "}
              La contraseña debe contener:{" "}
            </Typography>
            <Divider />
            <Grid container xs={12} spacing={2} sx={{ p: 0.5 }}>
              <Grid item xs={6}>
                <Typography> ABC al menos una letra mayúscula </Typography>
                <Typography> abc al menos una letra minúscula </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography> 123 al menos un número </Typography>
                <Typography> *** al menos 8 caracteres </Typography>
              </Grid>
            </Grid>
          </Box>
          <Button
            fullWidth
            onClick={handleNewOperator}
            sx={{
              bgcolor: "#A442F1",
              color: "#ffffff",
              p: 1,
              borderRadius: "10px",
              "&:hover": { bgcolor: "rgba(164, 66, 241, 0.6)" },
            }}
          >
            Crear operador
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default CreateOperator;
