import {
  Box,
  Button,
  Divider,
  FormGroup,
  InputLabel,
  IconButton,
  Input,
  InputAdornment,
  Link,
  OutlinedInput,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import { StyledInputLabel } from "./LayOut";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

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
        height: "100vh",
        display: " flex",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          justifyContent: " center",
          position: "absolute",
          borderRadius: "12px",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12);",
          width: "700px",
          // height: "560px",
          left: "calc(50% - 700px/2)",
          top: "160px",
          padding: "40px 32px 32px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            paddingBottom: 5,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            borderRadius: "10px",
          }}
        >
          Iniciar sesión
        </Box>
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <StyledInputLabel>Email</StyledInputLabel>

          <TextField
            name="email"
            // value={email}
            fullWidth
            focused={false}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ paddingBottom: 3 }}
          />

          <StyledInputLabel>Contraseña</StyledInputLabel>
          <OutlinedInput
            fullWidth
            focused={false}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            // value={password}
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Box
            sx={{
              textAlign: "center",
              color: "#A442F3",
              fontWeight: "bold",
              p: 2,
            }}
          >
            ¿Olvidaste tu contraseña?
          </Box>
          <Box sx={{ paddingBottom: 3, paddingTop: 1.5 }}>
            <Button
              type="submit"
              sx={{
                color: "white",
                bgcolor: "#A442F1",
                padding: "12px 24px",
                "&:hover": { color: "#A442F1" },
                borderRadius: "10px",
              }}
              fullWidth
            >
              Ingresar
            </Button>
          </Box>
          <Box sx={{ paddingBottom: 3 }}>
            <Divider />
          </Box>
          <Box>
            <Link href="/register">
              <Button
                sx={{
                  color: "#A442F1",
                  bgcolor: "rgba(164, 66, 241, 0.1)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                }}
                fullWidth
              >
                {" "}
                No tienes cuenta? Regístrate
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
