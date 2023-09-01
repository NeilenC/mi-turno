import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { StyledInputLabel } from "../../components/LayOut";

const Createbranch = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phtoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState("");
  const [openingH, setOpeningH] = useState("");
  const [closingH, setClosingH] = useState("");
  const [maxCap, setMaxCap] = useState(0);
  const [direction, setDirection] = useState("");

  async function handlerNewBranch(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/branches", {
        name: name,
        email: email,
        phoneNumber: phtoneNumber,
        maxCap: maxCap,
        direction: direction,
        openingH: openingH,
        closingH: closingH,
      });
      if (response.status === 200) {
        router.push("/admin/branches");
      }
    } catch (e) {
      Swal.fire({
        title: "Hubo un error",
        icon: "error",
        confirmButtonText: "Continuar",
      });
    }
  }

  return (
    <Box sx={{ height: "100vh", bgcolor: "#ECECEC" }}>
      <Grid container>
        <Box
          onSubmit={handlerNewBranch}
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
            <Box sx={{ fontSize: "21px", fontWeight: "bold", pt: 2, pb: 3 }}>
              Crear una nueva sucursal
            </Box>
            <Grid container spacing={2} sx={{ pb: 2 }}>
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 0 }}>
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
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 0 }}>
                <StyledInputLabel>Dirección</StyledInputLabel>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  fullWidth
                  value={direction}
                  onChange={(e) => {
                    setDirection(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} item sx={{ pt: 0, pb: 2 }}>
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
            {/* <Grid container spacing={2} sx={{ pb: 2 }}> */}
            <Grid xs={12} item sx={{ pb: 2 }}>
              <StyledInputLabel>Teléfono</StyledInputLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                value={phtoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Grid>
            {/* <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 0 }}>
                 <StyledInputLabel  >Capacidad máxima</StyledInputLabel>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  fullWidth
                  onChange={(e) => {
                    setMaxCap(e.target.value);
                  }}
                />
              </Grid> */}
            {/* </Grid> */}
            <Grid container spacing={2} sx={{ pb: 2 }}>
              <Grid xs={12} sm={6} item sx={{ pt: 2, pb: 5 }}>
                <StyledInputLabel>Horario de apertura</StyledInputLabel>
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
                <StyledInputLabel>Horario de cierre</StyledInputLabel>
                <TextField
                  placeholder="HH:mm"
                  id="outlined-multiline-flexible"
                  multiline
                  fullWidth
                  value={closingH}
                  onChange={(e) => {
                    setClosingH(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              onClick={handlerNewBranch}
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

export default Createbranch;
