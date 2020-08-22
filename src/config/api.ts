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
      url: '/login',
      method: methods.post,
    }),
    getLogin: () => ({
      url: '/login',
      method: methods.post,
    }),
  },
};
