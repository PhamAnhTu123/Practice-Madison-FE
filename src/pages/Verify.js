import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Verify = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios.put('http://localhost:8080/api/v1/users/verify',{
      email: localStorage.getItem('verifyEmail'),
      code: data.get('code'),
    }).then(res => {
      localStorage.setItem('token', res.data.body.token)
      navigate('/')
    });
  };

  const resendCode = async () => {
    await axios.post('http://localhost:8080/api/v1/users/resend-verify-code',{
      email: localStorage.getItem('verifyEmail'),
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h4">
            Verify email
          </Typography>
          <Typography component="h2" variant="h6">
            Please check your email to confirm verify code
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              disabled
              value={window.localStorage.getItem('verifyEmail')}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="code"
              label="Verify Code"
              type="text"
              id="code"
              autoComplete="code"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => resendCode()}>resend code</Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Verify
