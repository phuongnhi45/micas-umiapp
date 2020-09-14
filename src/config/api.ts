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
      url: '/admin/employees/?active&name/',
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
      url: `/admin/employees/${_id}`,
      method: methods.patch,
    }),
  },
  getSeachNameEmployee: {
    getSearchNameEmployee: (name: any) => ({
      url: `/admin/employees/?active&name=${name}`,
      method: methods.get,
    }),
  },
  //company
  getCompanies: {
    fetchCompanies: () => ({
      url: '/admin/companies/?name',
      method: methods.get,
    }),
  },
  createCompany: {
    postCompany: () => ({
      url: '/admin/companies/',
      method: methods.post,
    }),
  },
  changeStatusCompany: {
    statusCompany: (_id: string) => ({
      url: `/admin/companies/${_id}`,
      method: methods.patch,
    }),
  },
  updateCompany: {
    editCompany: (_id: string) => ({
      url: `/admin/companies/${_id}`,
      method: methods.patch,
    }),
  },
  searchCompanies: {
    searchCompanies: (name: any) => ({
      url: `/admin/companies/?name=${name}`,
      method: methods.get,
    }),
  },
};
