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
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserData from "../Hooks/useUserData";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";

const Login = () => {
  useUserData();
  const user = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("USER EN LOGIN??", user);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isLoggedIn) {
      redirectToUserPage();
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("id", JSON.stringify(response.data.user._id));

          alert("LOGIN EXITOSO");
          setIsLoggedIn(true);
        }
      })
      .catch((e) => {
        alert("NO SE PUDO LOGUEAR");
        console.log(e);
      });
  };

  const redirectToUserPage = () => {
    if (!user) {
      return;
    }
    !user.isOp && !user.isAdmin
      ? router.push(`/users/reserva/${user._id}`)
      : null;
    user.isOp ? router.push(`/verReservas/${user.branchId}`) : null;
    user.isAdmin ? router.push(`/admin/branches`) : null;
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
          height: "560px",
          left: "calc(50% - 700px/2)",
          top: "160px",
          padding: "40px 32px 32px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            ml: 1,
            color: "#A442F1",
            display: "flex",
            mr: 4,
            fontWeight: "bold",
            fontSize: "16px  ",
          }}
        >
          <AiOutlineArrowLeft />
          <Box sx={{ ml: 1 }}>Atras</Box>
        </Box>
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
          <InputLabel>Email</InputLabel>

          <TextField
            name="email"
            // value={email}
            fullWidth
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ paddingBottom: 3 }}
          />

          <InputLabel>Contraseña</InputLabel>
          <OutlinedInput
            fullWidth
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            // value={password}
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
          <Box sx={{ paddingBottom: 3, paddingTop: 3 }}>
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
              onClick={redirectToUserPage}
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
                  bgcolor: "rgba(164, 66, 241, 0.6)",
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
