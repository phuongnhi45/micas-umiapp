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
      url: '/companies',
      method: methods.get,
    }),
  },
  createCompany: {
    postCompany: () => ({
      url: '/companies/',
      method: methods.post,
    }),
  },
};
