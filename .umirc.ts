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
        // car-owners
        { path: '/car-owners', component: 'private/car-owners/index' },
        {
          path: '/car-owners/:id/edit',
          component: 'private/car-owners/[id]/edit',
        },
        {
          path: '/create-customer',
          component: 'private/car-owners/components/form/owner',
        },
        // staffs
        { path: '/staff', component: 'private/staff/index' },
        // companys
        {
          path: '/update-company',
          component: 'private/service-places/components/update-form',
        },
      ],
    },
  ],
});
