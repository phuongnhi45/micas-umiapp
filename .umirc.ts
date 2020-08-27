import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/auth/login/index' },
    { path: '/register', component: '@/pages/auth/register/index' },
    {
      path: '/',
      component: 'private/index',
      routes: [
        { path: '/service-places', component: 'private/service-places/index' },
        { path: '/booking', component: 'private/booking/index' },
        { path: '/staff', component: 'private/staff/index' },
      ],
    },
  ],
});
