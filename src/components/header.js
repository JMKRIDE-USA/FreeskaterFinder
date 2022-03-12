import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase'
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import UserAvatar from '../components/user-avatar';
import { useGetUserInfo, useGetAuthState } from '@jeffdude/frontend-helpers';
import { useNavigate } from 'react-router-dom';
import Outlet, { useGetAccountStatus } from './outlet';

import { unauthLocations, headerHeight } from '../constants';
import AdminMenu from './admin-menu';

import xslogo from '../assets/FreeskaterFinderHeaderLogo_xs.svg';
import mdlogo from '../assets/FreeskaterFinderHeaderLogo_md.svg';

import NotificationsMenu from './notifications-menu';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const authState = useGetAuthState();
  const accountStatus = useGetAccountStatus()
  const userInfo = useGetUserInfo();


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  let ButtonNameToPage = {
    Home: '/',
    Friends: '/friends',
    FAQ: '/faq',
    Rules: '/rules',
    Safety: '/safety',
    Account: '/my-account',
    Shop: 'https://www.jmkride.com/',
  }
  if(authState > 1) ButtonNameToPage['Ambassador FAQ'] = '/ambassador-faq';
  const navigate = useNavigate();

  const handleCloseNavMenu = (page) => () => {
    setAnchorElNav(null);
    authNavigate(page)
  };

  const handleSignIn = () => {
    setAnchorElNav(null);
    return navigate('/');
  }

  const authNavigate = (page) => {
    if(page) switch(page) {
      case 'Shop':
        return window.open(ButtonNameToPage[page])
      default: 
        return navigate(ButtonNameToPage[
          accountStatus === 'logged in'
          ? page
          : unauthLocations.includes(ButtonNameToPage[page]) 
          ? page 
          : 'Home'
        ]);
    }
  }

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl" sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: headerHeight, maxHeight: headerHeight
        }}>
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
              {Object.keys(ButtonNameToPage).filter(i => i !== 'Account').map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <AdminMenu/>
          </Box>
          <ButtonBase onClick={handleCloseNavMenu('Home')} sx={{display: {xs: 'none', md: 'flex'}}}>
            <img style={{marginRight: "15px"}} src={mdlogo} height={50} alt="JMKRIDE logo"/>
          </ButtonBase>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(ButtonNameToPage).filter(i => i !== 'Account').map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <AdminMenu/>
          </Box>

          <Box sx={{ flexGrow: 0, display: authState ? 'none' : 'flex' }}>
            <Button onClick={handleSignIn} sx={{my: 2, color: 'white', display: 'block'}}>Sign In</Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: authState ? 'flex' : 'none' }}>
            <NotificationsMenu/>
            <Tooltip title="My Account">
              <IconButton onClick={() => authNavigate('Account')} sx={{ p: 0 }}>
                <UserAvatar user={userInfo}/>
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </AppBar>
      <Box disableGutters sx={{mt: headerHeight }}>
        <Outlet/>
      </Box>
    </>
  );
};
export default ResponsiveAppBar;