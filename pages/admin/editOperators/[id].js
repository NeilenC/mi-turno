import axios from "axios";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";

const EditOperators = () => {
  useBranchData();
  useUserData();
  const branches = useSelector((state) => state.branches);
  // const user = useSelector((state)=> state.user)
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const router = useRouter();
  const { id } = router.query;

  console.log("ID QUERY", id);

  const editOperators = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/operators/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            lastname: lastName,
            branchId: selectedBranch._id,
            branchName: selectedBranch.name,
          }),
        }
      );
      const data = await response.json();
      alert("Datos del operador actualizados");
      router.push("/admin/operators");
      return response.data;
    } catch (error) {
      console.error("Error al actualizar operador:", error);
    }
  };

  useEffect(() => {
    editOperators();
  }, []);

  console.log(name, lastName, email);

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
        <Grid xs={12} sm={6} item sx={{ pb: 1 }}>
          <InputLabel>Nombre</InputLabel>
          <TextField
            name="name"
            type="name"
            variant="outlined"
            fullWidth
            // value={name} // agregar el valor del estado
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid xs={12} sm={6} item sx={{ pb: 1 }}>
          <InputLabel>Apellido</InputLabel>
          <TextField
            name="Apellido"
            type="Apellido"
            variant="outlined"
            fullWidth
            // value={lastName} // agregar el valor del estado
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb: 1 }}>
          <InputLabel>Email</InputLabel>
          <TextField
            name="Apellido"
            type="Apellido"
            variant="outlined"
            fullWidth
            // value={email} // agregar el valor del estado
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid xs={12} item sx={{ pb: 1 }}>
          <InputLabel>Sucursal</InputLabel>

          <Select
            sx={{ width: "85%", ml: 4 }}
            // value={selectedBranch}
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
        <Grid xs={12} item sx={{ pb: 5 }}>
          <InputLabel>Contraseña</InputLabel>

          <TextField
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            //   value={password} // agregar el valor del estado
            //   onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ color: "#A442F1", fontWeight: "bold" }}>
            Editar contraseña
          </Box>
        </Grid>
        <Button
          fullWidth
          onClick={editOperators}
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

export default EditOperators;
