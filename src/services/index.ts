import request from '@/utils/request';
import { APIConst } from '@/config';

const getLogIn = async (payload: any) => {
  const api = APIConst.submitlogin.postLogin();
  const data = await request.call(api.url, {
    method: api.method,
    data: payload,
  });
  console.log('đã đăng nhập và có token:', data, api);
  return data;
};

const postLogIn = async (payload: any) => {
  const api = APIConst.submitlogin.postLogin();

  await request
    .call(api.url, {
      method: api.method,
      data: payload,
    })
    .then(function(res) {
      const data = res.data;
      const token = data.token;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Tạo tk à?', data);
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
