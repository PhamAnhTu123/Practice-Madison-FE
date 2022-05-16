import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Stack, TextField } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const theme = createTheme();

export default function Profile() {
  const [user, setUser] = useState({});
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value
    });
  };

  const handleSubmitAvatar = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    await axios.put('http://localhost:8080/api/v1/users/me',{
      file: data.get('file'),
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data'
      }
    })
    
    await axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data.body.user));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    await axios.put('http://localhost:8080/api/v1/users/me',{
      fullname: data.get('fullname'),
      phone: data.get('phone'),
      gender: data.get('gender'),
      address: data.get('address'),
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    })
    
    await  axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data.body.user));
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data.body.user));
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Vjp Pzo Stoze
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Products</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Cart({user.cart ? user.cart.length : 0})</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Orders</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 4, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Products
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Cart({user.cart ? user.cart.length : 0})
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Orders
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={`${user.avatar}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography textAlign='center' variant='h5' sx={{ fontWeight: 'bold', padding: 2 }} >
              Profile
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={4}
            >
              <Container>
                <Avatar
                  alt="Remy Sharp"
                  src={user.avatar}
                  sx={{ width: 80, height: 80 }}
                />
                <Box component="form" onSubmit={handleSubmitAvatar} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="file"
                    label="Avatar"
                    type="file"
                    id="avatar"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save Avatar
                  </Button>
                </Box>
              </Container>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user.email}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="fullname"
                  value={user.fullname}
                  label="Full Name"
                  onChange={handleChange}
                  type="text"
                  id="fullname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  value={user.username}
                  label="User Name"
                  type="text"
                  id="fullname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  label="Phone"
                  type="text"
                  id="fullname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  label="Gender"
                  type="text"
                  id="fullname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  label="Address"
                  type="text"
                  id="fullname"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Box>
              <Button variant='outlined' size='large'>
                Change Password
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}