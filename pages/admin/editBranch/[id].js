import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useBranchData from "../../../Hooks/useBranchData";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"

const EditBranch = () => {
  useBranchData();
  const branches = useSelector((state) => state.branches);
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [openingH, setOpeningH] = useState("");
  const [closingH, setClosingH] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState("");
  const { id } = router.query;

  const getBranch = async () => {
    try {
      if (id) {
        const response = await fetch(
          `http://localhost:3000/api/admin/branches/${id}`,
          {
            method: "GET",
          }
        );
        const data = response.json();
        setSelectedBranch(data);
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

  const updateBranch = async () => {
    try {
      if (id) {
        const response = await fetch(
          `http://localhost:3000/api/admin/branches/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name || selectedBranch.name,
              direction: address || selectedBranch.direction,
              openingH: openingH || selectedBranch.openingH,
              closingH: closingH || selectedBranch.closingH,
              phoneNumber: phoneNumber || selectedBranch.phoneNumber,
              email: email || selectedBranch.email,
            }),
          }
        );
        if (response.ok) {
          Swal.fire({
            title: 'La sucursal se actualizó correctamente',
            icon: 'success',
            confirmButtonText: 'Continuar'
          })
          router.push("/admin/branches");
        } else {
          Swal.fire({
            title: 'Error al actualizar la sucursal',
            text: 'Por favor, intente nuevamente',
            icon: 'error',
            confirmButtonText: 'Continuar'
          })
        }
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          borderRadius: "12px",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12);",
          width: "900px",
          height: "590px",
          left: "calc(50% - 900px/2)",
          top: "23%",
          padding: "50px 70px 0px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ fontSize: "20px", fontWeight: "bold", pb: 1 }}
        >
          Editar datos de Sucursal
        </Box>
        <Grid xs={12} sm={6} item sx={{ pb: 1 }}>
          <InputLabel  sx={{color:"black"}}>Nombre</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={name} // agregar el valor del estado
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid xs={12} sm={6} item sx={{ pb: 1 }}>
          <InputLabel  sx={{color:"black"}}>Dirección</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={address} // agregar el valor del estado
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid container spacing={2} sx={{}}>
          <Grid xs={12} sm={6} item sx={{ pt: 2 }}>
            <InputLabel  sx={{color:"black"}}>Horario de apertura</InputLabel>
            <TextField
              id="outlined-multiline-flexible"
              placeholder="HH:mm"
              multiline
              fullWidth
              value={openingH}
              onChange={(e) => {
                setOpeningH(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
            <InputLabel  sx={{color:"black"}}>Horario de cierre</InputLabel>
            <TextField
              id="outlined-multiline-flexible"
              placeholder="HH:mm"
              multiline
              fullWidth
              value={closingH}
              onChange={(e) => {
                setClosingH(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ pb: 2 }}>
          <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
            <InputLabel  sx={{color:"black"}}>Email</InputLabel>
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
          <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 2 }}>
            <InputLabel  sx={{color:"black"}}>Teléfono</InputLabel>
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

        <Button
          fullWidth
          onClick={updateBranch}
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

export default EditBranch;
