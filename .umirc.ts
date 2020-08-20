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
      component: 'private',
      routes: [{ path: '/home', component: 'private/home/index' }],
    },
  ],
});
