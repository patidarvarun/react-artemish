import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Menu, Typography, MenuItem, Avatar, Stack, Divider } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//

import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDashboardClick = () => {
    navigate('/dashboard/app');
    handleClose();
  };
  const handleProduct = () => {
    navigate('/dashboard/products');
    handleClose();
  };
  const handleNewAdd = () => {
    navigate('/dashboard/addNew');
    handleClose();
  };
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        {/* <Logo /> */}
        <img
          src="data:image/jpeg;base64,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"
          alt="fdgd"
          style={{
            maxWidth: '69%',
          }}
        />
      </Box>

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Varun Patidar
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box> */}
      <Divider />
      <Divider />
      <Divider />
      <div className="sdsd" style={{ display: 'inline-grid' }}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleDashboardClick}
        >
          Dashboard
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Products
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleProduct}>Product List</MenuItem>
          <MenuItem onClick={handleNewAdd}>Add New Product</MenuItem>
        </Menu>
      </div>
      {/* <NavSection data={navConfig} /> */}
      {/* 
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
