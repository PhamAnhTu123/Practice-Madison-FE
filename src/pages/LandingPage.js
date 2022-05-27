import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardActionArea, Stack, Chip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function Album() {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const [product, setProduct] = useState({});
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(0);

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

  const handleClickOpen = (pickedProduct) => {
    setProduct(pickedProduct);
    setOpen(true);
  };

  const handleAddToCart = async (item) => {
    await axios.post('http://localhost:8080/api/v1/carts', {
      productID: item.id,
      quantity
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).catch(err => window.alert('Quantity much not biger than available storage'));

    await axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data.body.user));

    setOpen(false);
    setQuantity(0);
  }

  const handleClose = () => {
    setOpen(false);
    setQuantity(0);
  };

  const getProductByCategory = async (id) => {
    if (sort) {
      await axios.get(`http://localhost:8080/api/v1/products?category=${id}&order=${sort}`).then(res => setProducts(res.data.body));
    } else {
      await axios.get(`http://localhost:8080/api/v1/products?category=${id}`).then(res => setProducts(res.data.body));
    }
    setCategory(id);
  }

  const getProductBySort = async (type) => {
    if (category) {
      await axios.get(`http://localhost:8080/api/v1/products?category=${category}&order=${type}`).then(res => setProducts(res.data.body));
    } else {
      await axios.get(`http://localhost:8080/api/v1/products?&order=${type}`).then(res => setProducts(res.data.body));
    }
    setSort(type);
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data.body.user));

    axios.get('http://localhost:8080/api/v1/products').then(res => setProducts(res.data.body));

    axios.get('http://localhost:8080/api/v1/categories').then(res => setCategories(res.data.body));
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
                href='/cart'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Cart({user.cart ? user.cart.length : 0})
              </Button>
              <Button
                href='/order'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Orders
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Button href='/profile'>
                    <Avatar alt="Remy Sharp" src={`${user.avatar}`} />
                  </Button>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{product.name}</DialogTitle>
        <DialogContent>
          <img style={{ height: '200px', width: '400px' }} src={product.images ? product.images[0].url : 'adsadadwddaw'} alt={product.name} />
          <Typography variant="caption" display="block" gutterBottom>
            Description:
          </Typography>
          <DialogContentText>
            {product.description}
          </DialogContentText>
          <Typography variant="caption" display="block" gutterBottom>
            Category:
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {product.categories ? product.categories.map(item => (
              <Chip label={item.name} color="primary" variant="outlined" />
            )) : 'null'}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Price:
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {product.price} $
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
        </DialogActions>
      </Dialog>
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
              Our products
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Box sx={{ width: 200, marginBottom: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                  >
                    {
                      categories.map((category) => (
                        <MenuItem onClick={() => getProductByCategory(category.id)} value={category.id}>{category.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: 200, marginBottom: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sort"
                  >
                    <MenuItem onClick={() => getProductBySort('name')} value='name'>Sort by name</MenuItem>
                    <MenuItem onClick={() => getProductBySort('price')} value='price'>Sort by price</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Grid container spacing={2}>
              {
                products.map((product) => (
                  <Grid key={product.id} item sm={3}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.images[0].url}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description}
                          </Typography>
                          <Typography variant="caption" display="block">
                            Available: {product.storage}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button onClick={() => handleClickOpen(product)} size="small" color="primary">
                          Add to cart
                        </Button>
                      </CardActions>
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