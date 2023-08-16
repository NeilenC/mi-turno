import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
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
      const response = await axios.post(
        "/api/admin/createOp",
        {
          name: name,
          lastname: lastName,
          email: email,
          DNI: DNI,
          password: password,
          branchId: branch._id,
          branchName: branch.name,
          phoneNumber: phoneNumber,
          isOp: true,
        }
      );
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
    <Box sx={{ height: "100vh", bgcolor: "#ECECEC" }}>
      <Grid container>
        <Box
          onSubmit={handleNewOperator}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              margin: "auto",
              justifyContent: " center",
              position: "absolute",
              borderRadius: "12px",
              boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12);",
              width: "980px",
              height: "730px",
              left: "calc(50% - 980px/2)",
              top: "160px",
              padding: "40px 32px 32px",
              bgcolor: "#FFFFFF",
            }}
          >
            <Box sx={{ fontSize: "21px", fontWeight: "bold", pt: 2, pb: 3 }}>
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
            <Grid xs={12} item sx={{ pb: 2 }}>
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
            <Grid xs={12} item sx={{ pb: 2 }}>
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

            <Grid container spacing={2} sx={{ pb: 3 }}>
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
              <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
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
                      ? { color: "red" }
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
              </Grid>
            </Grid>
            <Button
              fullWidth
              onClick={handleNewOperator}
              sx={{
                bgcolor: "#A442F1",
                color: "#ffffff",
                p: 2,
                borderRadius: "10px",
                "&:hover": { bgcolor: "rgba(164, 66, 241, 0.6)" },
              }}
            >
              Crear
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default CreateOperator;
