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
};
