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
        { path: '/companies', component: 'private/companies/index' },
        // companys
        {
          path: '/companies/:id/edit',
          component: 'private/companies/[id]/edit',
        },
        {
          path: '/update-company',
          component: 'private/companies/components/update-form',
        },
        //detail-company
        {
          path: '/companies/:id',
          component: 'private/companies/[id]/index',
        },
        //detai-service
        {
          path: '/services/:id',
          component: 'private/companies/[id]/places/[id]',
        },
        // car-owners
        { path: '/car-owners', component: 'private/car-owners/index' },
        {
          path: '/car-owners/:id/edit',
          component: 'private/car-owners/[id]/edit',
        },
        {
          path: '/car-owners/:id',
          component: 'private/car-owners/[id]/index',
        },
        {
          path: '/create-customer',
          component: 'private/car-owners/components/form/owner',
        },
        // staffs
        { path: '/staff', component: 'private/staff/index' },
      ],
    },
  ],
});
