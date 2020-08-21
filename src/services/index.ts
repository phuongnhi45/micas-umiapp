import request from '@/utils/request';
import { APIConst } from '@/config';

const getLogIn = async (payload: any) => {
  const api = APIConst.submitlogin.getLogin();
  const data = await request.call(api.url, {
    method: api.method,
    body: payload,
  });
  console.log('logged', data, api);
  return data;
};

const postLogIn = async (payload: any) => {
  const api = APIConst.submitlogin.postLogin();

  await request
    .call(api.url, {
      method: api.method,
      body: payload,
    })
    .then(function(res) {
      const data = res.data;
      const token = data.token;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('token:', data);
      return data;
    })
    .catch(function(error) {
      return error;
    });
};

export default {
  getLogIn,
  postLogIn,
};
