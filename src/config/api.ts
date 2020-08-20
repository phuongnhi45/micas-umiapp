const methods = {
  get: 'get',
  post: 'post',
};

export default {
  apiHost: 'http://micasvn.ddns.net:9999',
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
