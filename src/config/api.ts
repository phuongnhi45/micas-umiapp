const methods = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  remove: 'delete',
};

export default {
  methods,
  // submitlogin
  submitlogin: {
    postLogin: () => ({
      url: '/employee-login',
      method: methods.post,
    }),
  },
  //employee
  submitEmployee: {
    postEmployee: () => ({
      url: '/employee-register',
      method: methods.post,
    }),
  },
  getEmployees: {
    fetchEmployees: () => ({
      url: '/admin/employees',
      method: methods.get,
    }),
  },
  updateStatus: {
    postChangeStatus: (payload: any) => ({
      url: `/admin/employees/${payload._id}?active=${payload.active}`,
      method: methods.patch,
    }),
  },
  editEmployee: {
    editEmployee: (_id: any) => ({
      url: `/admin/employees/${_id}`,
      method: methods.patch,
    }),
  },
  deleteEmployee: {
    deleteEmployee: (_id: any) => ({
      url: `/admin/employees/${_id}`,
      method: methods.remove,
    }),
  },

  //company
  getCompanies: {
    fetchCompanyDetail: (id: string) => ({
      url: `/admin/companies/${id}`,
      method: methods.get,
    }),
    fetchCompanies: () => ({
      url: '/admin/companies',
      method: methods.get,
    }),
  },
  createCompany: {
    postCompany: () => ({
      url: '/admin/companies',
      method: methods.post,
    }),
  },
  changeStatusCompany: {
    statusCompany: (payload: any) => ({
      url: `/admin/companies/${payload._id}?active=${!payload.active}`,
      method: methods.patch,
    }),
  },
  updateCompany: {
    editCompany: (_id: string) => ({
      url: `/admin/companies/${_id}`,
      method: methods.patch,
    }),
  },
  getRemoveCompany: {
    removeCompany: (_id: string) => ({
      url: `/admin/companies/${_id}`,
      method: methods.remove,
    }),
  },
};
