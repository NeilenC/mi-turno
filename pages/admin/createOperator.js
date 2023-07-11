import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import useBranchData from "../../Hooks/useBranchData";
import { useSelector } from "react-redux";
import React, { useState } from "react";

const CreateOperator = () => {
  useBranchData();
  const [name, setName] = useState("");
  const [DNI, setDNI] = useState(0);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [branch, setBranch] = useState("");
  const branches = useSelector((state) => state.branches);


  async function handleNewOperator(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/createOp",
        {
          name: name,
          lastname: lastName,
          email: email,
          DNI: DNI,
          password: password,
          branchId: branch._id,
          branchName: branch.name,
          isOp: true,
        }
      );
      console.log(response.data);
      if (password === verifyPassword && response.status === 200) {
        alert("CREASTE UN NUEVO OPERADOR");
      }
    } catch (e) {
      alert("NO SE CREO");
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
              height: "644px",
              left: "calc(50% - 980px/2)",
              top: "160px",
              padding: "40px 32px 32px",
              bgcolor: "#FFFFFF",
            }}
          >
            <Box sx={{ fontSize: "20px", fontWeight: "bold", pt: 2, pb: 3 }}>
              Crear nuevo operador
            </Box>
            <Grid container spacing={2} sx={{ pb: 2 }}>
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
                <InputLabel>Nombre</InputLabel>
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
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
                <InputLabel>Apellido</InputLabel>
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
              <InputLabel>Email</InputLabel>
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
            <Grid container spacing={2} sx={{ pb: 2 }}>
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
                <InputLabel>DNI</InputLabel>
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
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
                <InputLabel sx={{ m: 1, ml: 4 }}>Sucursal</InputLabel>
                <Select
                  sx={{ width: "85%", ml: 4 }}
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

            <Grid container spacing={2} sx={{ pb: 2 }}>
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
                <InputLabel>Contraseña</InputLabel>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  fullWidth
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
                <InputLabel>Repetir contraseña</InputLabel>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  fullWidth
                  value={verifyPassword}
                  onChange={(e) => {
                    setVerifyPassword(e.target.value);
                  }}
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
