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
      console.log('data:', data);
      const token = data.Data;
      if (token) {
        localStorage.setItem('accessToken', token);
        return data;
      }
      return;
    })
    .catch(function(error) {
      return error;
    });
  return data;
};

export default {
  postLogIn,
};
