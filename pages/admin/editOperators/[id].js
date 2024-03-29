import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { StyledInputLabel } from "../../../components/LayOut";

const EditOperators = () => {
  useBranchData();
  useUserData();
  const branches = useSelector((state) => state.branches);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [selectedOp, setSelectedOp] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [DNI, setDNI] = useState(null);
  const isPasswordMismatch = password !== verifyPassword;
  const router = useRouter();
  const { id } = router.query;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const getOp = async () => {
    try {
      const response = await fetch(`/api/admin/operators/${id}`, {
        method: "GET",
      });
      const data = response.json();
      setSelectedOp(data);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getOp(id);
  }, []);

  const editOperators = async () => {
    if (password !== verifyPassword) {
      Swal.fire({
        title: "Las contraseñas deben coincidir.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      if (id) {
        const response = await fetch(`/api/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name || selectedOp.name,
            email: email || selectedOp.email,
            lastname: lastName || selectedOp.lastname,
            phoneNumber: phoneNumber || selectedOp.phoneNumber,
            branchId: selectedBranch._id || selectedOp.branchId,
            branchName: selectedBranch.name || selectedOp.branchName,
            password: password || selectedOp.password,
            DNI: DNI || selectedOp.DNI,
          }),
        });
        if (response.ok) {
          Swal.fire({
            title: "Datos del operador actualizados",
            icon: "success",
            confirmButtonText: "Continuar",
          });
        }
        router.push("/admin/operators");
      }
    } catch (error) {
      console.error("Error al actualizar operador:", error);
    }
  };

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
          left: "calc(50% - 980px/2)",
          top: "160px",
          pl: 5,
          padding: "50px 32px 32px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          noValidate
          sx={{ fontSize: "20px", fontWeight: "bold", pb: 3 }}
        >
          Editar datos de operador
        </Box>
        <Grid container xs={12} spacing={3}>
          <Grid xs={12} sm={6} item sx={{ pb: 1 }}>
            <StyledInputLabel>Nombre</StyledInputLabel>
            <TextField
              name="name"
              type="name"
              variant="outlined"
              fullWidth
              value={name} // agregar el valor del estado
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} sx={{ pb: 1 }}>
            <StyledInputLabel>Apellido</StyledInputLabel>
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
        <Grid>
          <Grid xs={12} item sx={{ pb: 1 }}>
            <StyledInputLabel>Email</StyledInputLabel>
            <TextField
              disabled={true}
              sx={{ width: "97.4%" }}
              name="email"
              placeholder={"Deshabilitado"}
              type="email"
              variant="outlined"
              fullWidth
              value={email} // agregar el valor del estado
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={3}>
          <Grid xs={12} sm={6} item sx={{ pb: 1 }}>
            <StyledInputLabel>Teléfono</StyledInputLabel>
            <TextField
              variant="outlined"
              fullWidth
              value={phoneNumber} // agregar el valor del estado
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} sx={{ pb: 1 }}>
            <StyledInputLabel>DNI</StyledInputLabel>
            <TextField
              variant="outlined"
              fullWidth
              value={DNI} // agregar el valor del estado
              onChange={(e) => setDNI(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid xs={12} item sx={{ pb: 1 }}>
          <StyledInputLabel>Sucursal</StyledInputLabel>

          <Select
            fullWidth
            sx={{ width: "97.4%" }}
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
            }}
          >
            {branches.map((branch) => (
              <MenuItem key={branch._id} value={branch}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid container xs={12} spacing={3}>
          <Grid item xs={12} sm={6}>
            <StyledInputLabel>Contraseña</StyledInputLabel>
            <OutlinedInput
              disabled={true}
              placeholder={"Deshabilitado"}
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
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <StyledInputLabel>Repetir contraseña</StyledInputLabel>
            <OutlinedInput
              placeholder={"Deshabilitado"}
              disabled={true}
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
          onClick={editOperators}
          sx={{
            bgcolor: "#A442F1",
            color: "#ffffff",
            p: 2,
            width: "97.4%",
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
