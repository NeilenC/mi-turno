import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import useBranchData from "../../Hooks/useBranchData";
import { Box, Button, Grid, InputLabel } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import useUserData from "../../Hooks/useUserData";

const Branches = () => {
  useUserData();
  useBranchData();
  const branches = useSelector((state) => state.branches);
  const user = useSelector((state) => state.user);

  const deleteBranch = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Espera",
        text: "¿Estas seguro de querer eliminar esta sucursal?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9c27b0",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
      if (confirmed.isConfirmed) {
        const response = await fetch(`/api/admin/branches/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire({
            title: "Sucursal eliminada",
            icon: "success",
          });
          window.location.reload();
        } else {
          Swal.fire({
            title: "Error al eliminar la Sucursal",
            icon: "error",
            confirmButtonText: "Continuar",
          });
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      {branches.length && user?.isAdmin ? (
        <Box sx={{ pt: "90px" }}>
          <Box
            sx={{
              fontWeight: "bold",
              fontSize: "24px",
              pb: 3,
              pl: "155px",
              display: "flex",
              direction: "column",
            }}
          >
            Sucursales{" "}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Grid container spacing={2} sx={{ display: "flex", pb: "40px" }}>
              {branches.map((branch) => (
                <Grid item key={branch._id} xs={10} sx={{ m: "auto" }}>
                  <Box
                    sx={{
                      border: "1.5px solid #DEDEDE",
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
                        <Link href={`/admin/editBranch/${branch._id}`}>
                          Editar
                        </Link>
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
                        <DeleteForeverOutlinedIcon
                          onClick={() => deleteBranch(branch._id)}
                        />
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            display: "flex",
          }}
        >
          <Box sx={{ m: "auto", pt: "300px" }}>
            <Stack sx={{ color: "purple.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>{" "}
          </Box>{" "}
        </Box>
      )}
    </>
  );
};

export default Branches;
