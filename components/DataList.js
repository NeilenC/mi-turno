import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DataList = ({
  title,
  data,
  isLoading,
  onDelete,
  onEdit,
  fields,
  emptyMessage = "No hay datos disponibles",
  showActions = true,
  customActions,
  containerSx = {},
  itemSx = {},
  titleSx = {},
}) => {
  const router = useRouter();

  return (
    <Box sx={{ pt: "90px", ...containerSx }}>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          pb: 3,
          pl: { xs: "20px", md: "155px" },
          display: "flex",
          direction: "column",
          ...titleSx
        }}
      >
        {title}
      </Box>

      {isLoading ? (
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
            </Stack>
          </Box>
        </Box>
      ) : data?.length > 0 ? (
        <Grid container spacing={2} sx={{ display: "flex", pb: "40px" }}>
          {data.map((item) => (
            <Grid item key={item._id} xs={10} sx={{ m: "auto" }}>
              <Box
                sx={{
                  border: "1.5px solid #DEDEDE",
                  p: "24px",
                  borderRadius: "12px",
                  display: "flex",
                  direction: "column",
                  alignItems: "center",
                  fontSize: "14px",
                  ...itemSx
                }}
              >
                {fields.map((field) => (
                  <Grid item key={field.key} xs={field.width || 6}>
                    <InputLabel>{field.label}</InputLabel>
                    {field.render ? field.render(item) : item[field.key]}
                  </Grid>
                ))}

                {showActions && (
                  <>
                    {onEdit && (
                      <Grid item xs={1}>
                        <Button
                          sx={{
                            p: "12px 24px",
                            bgcolor: "#F5F5F5",
                            color: "#A442F1",
                            fontWeight: "bold",
                          }}
                          onClick={() => onEdit(item)}
                        >
                          Editar
                        </Button>
                      </Grid>
                    )}
                    {onDelete && (
                      <Grid item xs={1}>
                        <Button
                          sx={{
                            p: "10px 24px",
                            color: "#e73c35",
                            fontWeight: "bold",
                          }}
                          onClick={() => onDelete(item._id)}
                        >
                          <DeleteForeverOutlinedIcon />
                        </Button>
                      </Grid>
                    )}
                    {customActions && customActions(item)}
                  </>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            display: "flex",
          }}
        >
          <Box sx={{ m: "auto", pt: "300px" }}>
            <Typography>{emptyMessage}</Typography>
            <Stack
              sx={{ color: "purple.500", ml: "90px", mt: 3 }}
              spacing={2}
              direction="row"
            >
              <CircularProgress color="secondary" />
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DataList; 