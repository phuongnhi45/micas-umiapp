const methods = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
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
    list: () => ({
      url: '/employees/',
      method: methods.get,
    }),
  },
  //company
  getCompanies: {
    fetchCompanies: () => ({
      url: '/companies/',
      method: methods.get,
    }),
  },
  createCompany: {
    postCompany: () => ({
      url: '/companies/',
      method: methods.post,
    }),
  },
  changeStatusCompany: {
    statusCompany: (_id: string) => ({
      url: `/companies/${_id}/active`,
      method: methods.patch,
    }),
  },
  updateCompany: {
    editCompany: (_id: string) => ({
      url: `/companies/${_id}`,
      method: methods.patch,
    }),
  },
};
