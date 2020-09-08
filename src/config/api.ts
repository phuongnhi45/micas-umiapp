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
  updateStatus: {
    postChangeStatus: (_id: any) => ({
      url: `/employees/${_id}/active`,
      method: methods.patch,
    }),
  },
  editEmployee: {
    editEmployee: (_id: any) => ({
      url: `/employees/${_id}`,
      method: methods.patch,
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
      url: `/companies/active/${_id}`,
      method: methods.patch,
    }),
  },
};
