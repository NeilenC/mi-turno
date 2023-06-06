import { Box, FormControl, Grid, Input, TextField } from '@mui/material'
import React from 'react'

const createBranch = () => {
  return (
<Box> 
  <Grid container>
  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />  
         <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
      />
         <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
           <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
           <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
           <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
      </div>
      </Box>
  </Grid>
   </Box>

)}

export default createBranch