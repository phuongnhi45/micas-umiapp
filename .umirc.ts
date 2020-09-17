import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'Micas',
  lessLoader: {
    javascriptEnabled: true,
  },
  theme: {
    'primary-color': '#1890ff',
  },
  locale: {
    default: 'vi-VN',
    useLocalStorage: true,
  },
  routes: [
    { path: '/login', component: '@/pages/auth/login/index' },
    { path: '/register', component: '@/pages/auth/register/index' },
    {
      path: '/',
      component: 'private/index',
      routes: [
        { path: '/service-places', component: 'private/service-places/index' },
        {
          path: '/service-places/:id/edit',
          component: 'private/service-places/[id]/edit',
        },
        { path: '/booking', component: 'private/booking/index' },
        { path: '/staff', component: 'private/staff/index' },
        {
          path: '/new-company',
          component: 'private/service-places/components/update-form',
        },
      ],
    },
  ],
});
