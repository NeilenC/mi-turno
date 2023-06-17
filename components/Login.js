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
} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { useDispatch } from "react-redux";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataUser, setDataUser] = useState({});
  const router = useRouter();
  // const dispatch = useDispatch()
  // console.log("PASSS", typeof(password))
  // console.log("DATOS", dataUser)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/users/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        setDataUser({
          email: response.data.user.email,
          name: response.data.user.name,
          id: response.data.user._id,
          DNI: response.data.user.DNI,
          isAdmin: response.data.user.isAdmin,
        });
        console.log(response.data.user);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('id', JSON.stringify(response.data.user._id));
        alert('LOGIN EXITOSO');
        router.push(`/users/reserva/${response.data.user._id}`);
      })
      .catch((e) => {
        alert('NO SE PUDO LOGUEAR');
        console.log(e, 'ERRORRRR LOGIN');
      });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: ' flex',
      }}
    >
                      {/* <TextField
            name="email"
            value={email}
            fullWidth
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ paddingBottom: 3 }}
          /> */}
      <Box
        sx={{
          margin: 'auto',
          justifyContent: ' center',
          position: 'absolute',
          borderRadius: '12px',
          boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.12);',
          width: '700px',
          height: '560px',
          left: 'calc(50% - 700px/2)',
          top: '160px',
          padding: '40px 32px 32px',
          bgcolor: '#FFFFFF',
        }}
      >
        <Box
          sx={{
            ml: 1,
            color: '#A442F1',
            display: 'flex',
            mr: 4,
            fontWeight: 'bold',
            fontSize: '16px  ',
          }}
        >
          <AiOutlineArrowLeft />
          <Box sx={{ ml: 1 }}>Atras</Box>
        </Box>
        <Box
          sx={{
            paddingBottom: 5,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            borderRadius: '10px',
          }}
        >
          Iniciar sesión
        </Box>
        <Box
        component="form"
        onSubmit={handleSubmit}>
          <InputLabel>Nombre</InputLabel>

          <TextField
            name="email"
            value={email}
            fullWidth
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ paddingBottom: 3 }}
          />

          <InputLabel>Contraseña</InputLabel>
          <OutlinedInput
            fullWidth
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
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
              textAlign: 'center',
              color: '#A442F3',
              fontWeight: 'bold',
              p: 2,
            }}
          >
            ¿Olvidaste tu contraseña?
          </Box>
          <Box sx={{ paddingBottom: 3, paddingTop: 3 }}>
            <Button
              type="submit"
              sx={{
                color: 'white',
                bgcolor: '#A442F1',
                padding: '12px 24px',
                '&:hover': { color: '#A442F1' },
                borderRadius: '10px',
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
                  color: '#A442F1',
                  bgcolor: 'rgba(164, 66, 241, 0.6)',
                  padding: '12px 24px',
                  borderRadius: '10px',
                }}
                fullWidth
              >
                {' '}
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
