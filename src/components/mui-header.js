import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase'
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { useGetAuthState } from '@jeffdude/frontend-helpers';
import { useGetUserInfo } from '@jeffdude/frontend-helpers';
import { Outlet, useNavigate } from 'react-router-dom';

import xslogo from '../assets/FreeskaterFinderHeaderLogo_xs.svg';
import mdlogo from '../assets/FreeskaterFinderHeaderLogo_md.svg';

const pages = ['Home', 'Friends'];
const settings = ['Profile', 'Settings', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const ButtonNameToPage = {
    Home: '/',
    Friends: '/friends',
    'Sign In': '/sign-in',
  }

  const navigate = useNavigate();

  const handleCloseNavMenu = (page) => () => {
    setAnchorElNav(null);
    navigate(ButtonNameToPage[page]);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignIn = () => {
    console.log('.')
  }

  const authState = useGetAuthState();
  const userInfo = useGetUserInfo();
  const headerHeight = {xs: '55px', md: '70px'}

  return (
    <div>
      <AppBar position="fixed">
        <Container maxWidth="xl" sx={
          {display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: headerHeight, maxHeight: headerHeight}
        }>
          <ButtonBase onClick={handleCloseNavMenu('Home')}
          sx={{display: {xs: 'flex', md: 'none'}}}>
            <img
              style={{marginRight: "15px"}}
              src={xslogo} height={40} alt="JMKRIDE logo"
            />
          </ButtonBase>
          <Box sx={{ flexGrow: 1, flexDirection: 'row-reverse', display: { xs: 'flex', md: 'none' } }}>
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
              onClose={handleCloseNavMenu()}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ButtonBase onClick={handleCloseNavMenu('Home')} sx={{display: {xs: 'none', md: 'flex'}}}>
            <img style={{marginRight: "15px"}} src={mdlogo} height={50} alt="JMKRIDE logo"/>
          </ButtonBase>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: authState ? 'none' : 'flex' }}>
            <Button onClick={handleSignIn} sx={{my: 2, color: 'white', display: 'block'}}>Sign In</Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: authState ? 'flex' : 'none' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Account">
                  R
                </Avatar>
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
                <MenuItem key={setting} onClick={handleCloseNavMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Container>
      </AppBar>
      <Box disableGutters sx={{mt: headerHeight}}><Outlet/></Box>
    </div>
  );
};
export default ResponsiveAppBar;