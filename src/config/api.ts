const methods = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  remove: 'delete',
};

export default {
  methods,
  //submitlogin
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
    editCompany: (id: string) => ({
      url: `/admin/companies/${id}`,
      method: methods.patch,
    }),
  },
  getRemoveCompany: {
    removeCompany: (_id: string) => ({
      url: `/admin/companies/${_id}`,
      method: methods.remove,
    }),
  },

  // customer
  submitCustomer: {
    postCustomer: () => ({
      url: '/customer-register',
      method: methods.post,
    }),
  },
  getCustomers: {
    fetchCustomers: () => ({
      url: '/admin/customers',
      method: methods.get,
    }),
    fetchCustomerDetail: (id: string) => ({
      url: `/admin/customers/${id}`,
      method: methods.get,
    }),
  },
  updateStatusCustomer: {
    postChangeStatus: (payload: any) => ({
      url: `/admin/customers/${payload._id}?active=${payload.active}`,
      method: methods.patch,
    }),
  },
  editCustomer: {
    editCustomer: (id: any) => ({
      url: `/admin/customers/${id}`,
      method: methods.patch,
    }),
  },
  deleteCustomer: {
    deleteCustomer: (_id: any) => ({
      url: `/admin/customers/${_id}`,
      method: methods.remove,
    }),
  },
  //service
  getServices: {
    getServices: () => ({
      url: `/admin/services`,
      method: methods.get,
    }),
  },
  getServiceByCompany: {
    fetchService: (id: string) => ({
      url: `/admin/services?companyid=${id}`,
      method: methods.get,
    }),
    postService: () => ({
      url: '/admin/services',
      method: methods.post,
    }),
    removeService: (payload: any) => ({
      url: `/admin/services/${payload._id}`,
      method: methods.remove,
    }),
    statusService: (payload: any) => ({
      url: `/admin/services/${payload._id}?active=${payload.active}`,
      method: methods.patch,
    }),
    updateService: (id: string) => ({
      url: `/admin/services/${id}`,
      method: methods.patch,
    }),
    fetchServiceDetail: (id: string) => ({
      url: `/admin/services/${id}`,
      method: methods.get,
    }),
  },
  //booking
  getBookingByService: {
    fetchBookings: (id: string) => ({
      url: `/admin/bookings?serviceid=${id}`,
      method: methods.get,
    }),
    postBooking: () => ({
      url: '/admin/bookings',
      method: methods.post,
    }),
    removeBooking: (payload: any) => ({
      url: `/admin/bookings/${payload._id}`,
      method: methods.remove,
    }),
  },
  postAvatar: {
    postAvatar: () => ({
      url: `/resources/upload`,
      method: methods.post,
    }),
  },

  //booking
  getBookings: {
    fetchBookings: () => ({
      url: '/admin/bookings',
      method: methods.get,
    }),
  },
};
