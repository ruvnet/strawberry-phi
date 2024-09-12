import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { VApp, VAppBar, VToolbar, VBtn, VIcon, VList, VListItem, VListItemIcon, VListItemTitle, VContainer, VMain } from 'vuetify/components';
import { mdiMenu, mdiViewDashboard, mdiPlus, mdiFormatListBulleted, mdiTestTube, mdiCog } from '@mdi/js';

const navItems = [
  { title: 'Dashboard', icon: mdiViewDashboard, path: '/' },
  { title: 'New Job', icon: mdiPlus, path: '/new-job' },
  { title: 'Job Status', icon: mdiFormatListBulleted, path: '/jobs' },
  { title: 'Model Testing', icon: mdiTestTube, path: '/test' },
  { title: 'Settings', icon: mdiCog, path: '/settings' },
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
    <VList>
      {navItems.map((item) => (
        <VListItem key={item.title} onClick={() => handleNavigation(item.path)}>
          <VListItemIcon><VIcon>{item.icon}</VIcon></VListItemIcon>
          <VListItemTitle>{item.title}</VListItemTitle>
        </VListItem>
      ))}
    </VList>
  );

  return (
    <VApp>
      <VAppBar app>
        <VToolbar>
          <VBtn
            icon
            onClick={handleDrawerToggle}
          >
            <VIcon>{mdiMenu}</VIcon>
          </VBtn>
          <VToolbar-Title class="text-h6 font-weight-bold">
            <span class="text-2xl mr-2">🍓</span> Strawberry Phi
          </VToolbar-Title>
        </VToolbar>
      </VAppBar>
      <VMain>
        <VContainer>
          <Outlet />
        </VContainer>
      </VMain>
    </VApp>
  );
};

export default Index;