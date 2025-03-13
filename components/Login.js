import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);



  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const user = response.data.user;

        if (response.status === 200) {
         
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("id", JSON.stringify(response.data.user._id));
          !user.isOp && !user.isAdmin
            ? router.push(`/users/reserva/${user._id}`)
            : null;
          user.isAdmin ? router.push(`/admin/branches`) : null;
          user.isOp
            ? router.push(`operator/verReservas/${user.branchId}`)
            : null;
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Algo anda mal",
          text: "por favor chequea los datos ingresados",
          icon: "error",
          confirmButtonText: "Continuar",
        });
        console.log(e);
      });
  };

  return (
    <Box
    sx={{
      display:'flex',
      height:'100vh',
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#f4f4f4",
    }}
  >
    <Box
      sx={{
        minWidth:'500px',
        borderRadius: "12px",
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.12)",
        bgcolor: "white",
        padding: { xs: 3, md: 3},
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" pb={2}>
        Iniciar sesión
      </Typography>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Typography >
          Email
        </Typography>
        <TextField
          name="email"
          fullWidth
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography  >
          Contraseña
        </Typography>
        <OutlinedInput
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />


        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "#A442F1",
            color: "white",
            py: 1,
            borderRadius: "10px",
            "&:hover": { bgcolor: "#8a32d1" },
          }}
        >
          Ingresar
        </Button>

        <Divider sx={{ my: 2 }} />

        <Link href="/register" sx={{ textDecoration: "none" }}>
          <Button
            fullWidth
            sx={{
              color: "#A442F1",
              bgcolor: "rgba(164, 66, 241, 0.1)",
              py: 1,
              borderRadius: "10px",
            }}
          >
            No tienes cuenta? Regístrate
          </Button>
        </Link>
      </Box>
    </Box>
  </Box>
  );
};

export default Login;
