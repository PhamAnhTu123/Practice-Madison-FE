import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Stack, CardActions, CardActionArea } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const theme = createTheme();

export default function Order() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (order) => {
    setOrder(order);
    setOpen(true);
  }

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

  const handleSort = async (type) => {
    await axios.get(`http://localhost:8080/api/v1/users/me/orders?order=${type}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setOrders(res.data.body));
  }


  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data.body.user));

    axios.get('http://localhost:8080/api/v1/users/me/orders', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setOrders(res.data.body));

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
                href='/'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Products
              </Button>
              <Button
                href='/cart'
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
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{order.createdAt}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography variant="body2" color="text.secondary" display="block" gutterBottom>
                    paymentDate: {order.paymentDate}
                  </Typography>
                </DialogContentText>
                <Typography variant="body2" color="text.secondary" display="block" gutterBottom>
                  Total: {order.paycheck} $
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Items
                </Typography>
                <Grid container spacing={2}>
                  {
                    order.items ? order.items.map((item) => (
                      <Grid key={item.id} item>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={item.product.thumbnail}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h6" component="div">
                                {item.product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: {item.quantity}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Unit price: {item.product.price}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )) : null
                  }
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
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
          <Container maxWidth="lg">
            <Typography textAlign='center' variant='h5' sx={{ color: 'red', fontWeight: 'bold', padding: 2 }} >
              Order history
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Box sx={{ width: 200, marginBottom: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sort"
                  >
                    <MenuItem onClick={() => handleSort('date')} value='date'>Sort by date</MenuItem>
                    <MenuItem onClick={() => handleSort('price')} value='price'>Sort by price</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Grid container spacing={2}>
              {
                orders.map((order) => (
                  <Grid key={order.id} item sx={12}>
                    <Card sx={{ display: 'flex' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151, height: 131 }}
                        image={order.items ? order.items[0].product.thumbnail : 'null'}
                        alt="Live from space album cover"
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Order date: {order.createdAt}
                          </Typography>
                          <Typography variant="button" display="block" gutterBottom>
                            Total items: {order.items ? order.items.length : 0}
                          </Typography>
                          <Typography variant="button" display="block" gutterBottom>
                            Total: {order.paycheck} $
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={() => handleOpen(order)}>Detail</Button>
                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}