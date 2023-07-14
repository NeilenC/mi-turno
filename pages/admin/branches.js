import { Box, Button, Grid, InputLabel } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useBranchData from "../../Hooks/useBranchData";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useSelector } from "react-redux";
import axios from "axios";

const Branches = () => {
  useBranchData();
  const branches = useSelector((state) => state.branches);
  const [selectedBranch, setSelectedBranch] = useState([])

  // const deleteBranch = async () => {
  //   try {
  //     const confirmed = window.confirm('¿Estás seguro de que deseas borrar la sucursal?');
  //     if (confirmed) {
  //       const remove = await axios.delete(`http://localhost:3000/api/admin/updateBranch/${selectedBranch._id}`);
  //       // Realizar cualquier acción adicional después de eliminar la sucursal
  //       window.location.reload()
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // };


  const deleteBranch = async (id) => {
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de querer eliminar esta sucursal?"
      );
      if (confirmed) {
        const response = await fetch(
          `http://localhost:3000/api/admin/updateBranch/${id}`,
          {
            method: "DELETE",
          }
        );
console.log("RESPONSE", response.ok, "ID", id)
        if (response.ok) {
          alert("Sucursal eliminada exitosamente");
             window.location.reload()
        } else {
          alert("Error al eliminar la Sucursal");
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };



  return (
    <Box sx={{ height: "100vh", pt: "80px", bgcolor: "#FAFAFAFA" }}>
      <Box sx={{ fontWeight: "bold", fontSize: "24px", pb: 3, pl: "154px" }}>
        {" "}
        Sucursales{" "}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2} sx={{ display: "flex", pb:"40px" }}>
          {branches.map((branch) => (
            <Grid item key={branch._id} xs={10} sx={{ m: "auto" }}>
              <Box
                sx={{
                  border: "1.5px solid #F0F0F0",
                  p: "24px",
                  borderRadius: "12px",
                  display: "flex",
                  direction: "column",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                <Grid item xs={6}>
                  <InputLabel>Nombre</InputLabel>
                  {branch.name}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Email</InputLabel>
                  {branch.email}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Dirección</InputLabel>
                  <Grid>{branch.direction}</Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Teléfono</InputLabel>
                  <Grid>{branch.phoneNumber}</Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Horario</InputLabel>
                  <Grid>
                    {branch.openingH} - {branch.closingH} HS
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    sx={{
                      p: "12px 24px",
                      bgcolor: "#F5F5F5",
                      color: "#A442F1",
                      fontWeight: "bold",
                    }}
                  >
                    <Link href={`/admin/editBranch/${branch._id}`}>Editar</Link>
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    sx={{
                      p: "10px 24px",
                      // bgcolor: "#F5F5F5",
                      color: "#e73c35",
                      fontWeight: "bold",
                    }}
                    // onClick={()=> {router.push(`/admin/editOperators/${operator._id}`)}}
                  >
                  
                  <DeleteForeverOutlinedIcon onClick={() => deleteBranch(branch._id)} />
                  </Button>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Branches;
