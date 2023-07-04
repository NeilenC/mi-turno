import { Box, Button, InputLabel } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setBranches } from '../../redux/branchesInfo';
import React, { useEffect, useState } from 'react';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    const handlerBranches = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/branches');
        if (response.status === 200) {
          const branches = await response.json();
          setBranches(branches);
          // dispatch(setBranches({
          //   email: branches.email,
          //   name: branches.name,
          //   direction: branches.direction,
          //   phoneNumber: branches.phoneNumber,
          //   maxCap: branches.maxCap,
          //   id: branches.id,
          //   openingH: branches.openingH,
          //   closingH: branches.closingH,
          // }))
        } else {
          throw new Error('Error al obtener los datos de las sucursales');
        }
      } catch (e) {
        console.error(e);
      }
    };
    handlerBranches();
  }, [dispatch]);

  return (
    <Box sx={{ pt: '150px' }}>
      <Box sx={{ fontWeight: 'bold', fontSize: '24px', pb: 3, pl: '152px' }}>
        {' '}
        Sucursales{' '}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '85%', m: 'auto' }}>
          {branches.map((branch) => (
            <Box key={branch._id} sx={{ p: 1 }}>
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
                  {branch.name}
                </Box>
                <Box>
                  <InputLabel>Dirección</InputLabel>
                  <Box>{branch.direction}</Box>
                </Box>

                <Box>
                  <InputLabel>Teléfono</InputLabel>
                  <Box>{branch.phoneNumber}</Box>
                </Box>

                <Box>
                  <InputLabel>Capacidad máxima</InputLabel>
                  <Box>{branch.maxCap}</Box>
                </Box>

                <Box>
                  <InputLabel>Horario</InputLabel>
                  <Box>
                    {branch.openingH} - {branch.closingH} HS
                  </Box>
                </Box>
                <Button
                  sx={{
                    p: '12px 24px',
                    bgcolor: '#F5F5F5',
                    color: '#A442F1',
                    fontWeight: 'bold',
                  }}
                >
                  <Link href={`/admin/editBranch/${branch._id}`}>Editar</Link>
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Branches;
