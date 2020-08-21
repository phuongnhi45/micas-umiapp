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
      const token = data.Data;
      localStorage.setItem('accessToken', token);
      console.log('data:', data);
      return data;
    })
    .catch(function(error) {
      return error;
    });
};

export default {
  postLogIn,
};
