import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [DNI, setDNI] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/users/register', {
        name: name,
        lastname: lastname,
        password: password,
        email: email,
        DNI: DNI,
      })
      .then((res) => {
        alert('BIENBENIDO! ACABAS DE REGISTRARTE');
        router.push('/');
      })
      .catch((error) => {
        alert('HUBO UN ERROR');
      });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          justifyContent: ' center',
          position: 'absolute',
          borderRadius: '12px',
          boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.12);',
          maxWidth: '750px',
          height: '900',
          left: 'calc(50% - 750px/2)',
          top: '160px',
          padding: '40px 32px 32px',
          bgcolor: '#FFFFFF',
        }}
      >
        <Box
          sx={{
            ml: 4,
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
        <Box sx={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}>
          Crear cuenta
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyConten: 'center',
            p: '32px',
            gap: '20px',
          }}
        >
          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <Grid sx={{ pb: 2 }}>
              <Grid container spacing={1} sx={{ pb: 2 }}>
                <Grid xs={12} sm={6} item sx={{}}>
                  <InputLabel>Nombre</InputLabel>
                  <TextField
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <InputLabel>Apellido</InputLabel>
                  <TextField
                    name="lastname"
                    variant="outlined"
                    fullWidth
                    value={lastname} // agregar el valor del estado
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    name="email"
                    type="email"
                    variant="outlined"
                    required
                    fullWidth
                    value={email} // agregar el valor del estado
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <InputLabel>DNI</InputLabel>
                  <TextField
                    name="DNI"
                    type="DNI"
                    variant="outlined"
                    required
                    fullWidth
                    value={DNI} // agregar el valor del estado
                    onChange={(e) => setDNI(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <InputLabel>Constraseña</InputLabel>
                  <OutlinedInput
                    fullWidth
                    value={password} // agregar el valor del estado
                    name="contraseña"
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
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
                </Grid>
                <Grid xs={12} sm={6} item>
                  {/* <OutlinedInput
               fullWidth
               name="contraseña"
              "
               value={password} // agregar el valor del estado
               onChange={(e) => setPassword(e.target.value)}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
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
           
          /> */}
                </Grid>
              </Grid>
              <Box sx={{ bgcolor: '#ECECEC', pt: 2 }}>
                <Box sx={{ ml: 3 }}>
                  La contraseña debe contener:
                  <Divider sx={{ width: '400px' }} />
                  <Grid
                    sm={10}
                    sx={{
                      pt: 2,
                      display: 'flex',
                      width: '516px',
                      height: ' 104px',
                    }}
                    item
                  >
                    ABC Una letra mayúscula <br />
                    123 Un número
                    <Grid sm={6} sx={{ pl: 5 }} item>
                      abc Una letra minúscula <br />
                      *** Mínimo 3 caractéres
                    </Grid>
                  </Grid>
                </Box>
                <Box></Box>
              </Box>
              <Grid xs={12} item>
                <Grid
                  sx={{
                    color: '#A442F1',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  ¿olvidaste tu contraseña?
                </Grid>
                <Box>
                  <Button
                    type="submit"
                    sx={{
                      color: 'white',
                      bgcolor: '#A442F1',
                      padding: '12px 24px',
                      '&:hover': { color: '#A442F1' },
                    }}
                    fullWidth
                  >
                    {' '}
                    Registrarme{' '}
                  </Button>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Divider />
                </Box>
                <Link href="/">
                  <Box>
                    <Button
                      sx={{
                        color: '#A442F1',
                        bgcolor: 'rgba(164, 66, 241, 0.1)',
                        padding: '12px 24px',
                      }}
                      fullWidth
                    >
                      {' '}
                      Ya tenes cuenta? Iniciar sesión{' '}
                    </Button>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
