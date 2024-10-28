import React, { useState } from 'react';
import { Button, TextField, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleOpen(); // Ouvre le backdrop

    const formData = new FormData();
    formData.append('file', selectedFile);
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        handleClose(); // Ferme le backdrop après le succès
      })
      .catch(error => {
        console.error('Error:', error);
        handleClose(); // Ferme le backdrop en cas d'erreur
      });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <TextField
          label="Nom du fichier"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Type du fichier"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="file"
          onChange={handleFileChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" color="success">
          Envoyer
        </Button>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}

export default UploadForm;
