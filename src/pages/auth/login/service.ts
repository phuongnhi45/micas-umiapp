import request from '@/utils/request';
import { APIConst } from '@/config';

const postLogIn = async (payload: any) => {
  const api = APIConst.submitlogin.postLogin();
  const data = await request
    .call(api.url, {
      method: api.method,
      data: payload,
    })
    .then(function(res) {
      const data = res.data;
      if (data.data) {
        const token = localStorage.setItem('accessToken', data.data);
        return token;
      } else {
        return data.data;
      }
    })
    .catch(function(error) {
      return error;
    });
  return data;
};

export default {
  postLogIn,
};
