import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Operators = () => {
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    const handlerOperators = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/findOp');
        if (response.ok) {
          const operators = await response.json();
          setOperators(operators);
        } else {
          throw new Error('Error al obtener los datos de los operadores');
        }
      } catch (e) {
        console.error(e);
      }
    };
    handlerOperators();
  }, []);

  console.log('OPERATORSSSS', operators);

  return (
    <Box sx={{ pt: '150px' }}>
      <Box sx={{ fontWeight: 'bold', fontSize: '24px', pb: 3, pl: '152px' }}>
        {' '}
        Operadores{' '}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '85%', m: 'auto' }}>
          {operators.map((operator) => (
            <Box key={operator._id} sx={{ p: 1 }}>
              <Box
                sx={{
                  border: '1px solid #F0F0F0',
                  p: '24px',
                  borderRadius: '12px',
                  display: 'flex',
                  direction: 'row',
                  alignItems: 'center',
                  fontSize: '14px',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <InputLabel>Nombre</InputLabel>
                  {operator.name} {operator.lastName}
                </Box>

                <Box>
                  <InputLabel>Email</InputLabel>
                  <Box>{operator.email}</Box>
                </Box>

                <Box>
                  <InputLabel>Sucursal</InputLabel>
                  <Box>{operator.branch}</Box>
                </Box>

                <Box>
                  <InputLabel>Contraseña</InputLabel>
                  <Typography variant="body1">**************</Typography>
                </Box>

                <Button
                  sx={{
                    p: '12px 24px',
                    bgcolor: '#F5F5F5',
                    color: '#A442F1',
                    fontWeight: 'bold',
                  }}
                >
                  <Link href={`/admin/editOperators/${operator._id}`}>
                    Editar
                  </Link>
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Operators;
