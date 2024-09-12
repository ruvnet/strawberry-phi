import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, CssBaseline } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Add as AddIcon, List as ListIcon, Science as ScienceIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c', // Dark red
    },
    background: {
      default: '#f5f5f5', // Light gray
    },
  },
});

const navItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { title: 'New Job', icon: <AddIcon />, path: '/new-job' },
  { title: 'Job Status', icon: <ListIcon />, path: '/jobs' },
  { title: 'Model Testing', icon: <ScienceIcon />, path: '/test' },
  { title: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Index = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawer = (
    <div>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.title} onClick={() => handleNavigation(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex h-screen">
        <AppBar position="fixed" className="z-10">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="mr-2"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" className="flex items-center">
              <span className="text-2xl mr-2">🍓</span> Strawberry Phi
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className="w-64"
        >
          {drawer}
        </Drawer>
        <main className="flex-grow p-6 mt-16">
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;