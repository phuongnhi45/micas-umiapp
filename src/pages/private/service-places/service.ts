import request from '@/utils/request';
import { APIConst } from '@/config';

const fetchCompanies = async (payload: any) => {
  const api = APIConst.getCompanies.fetchCompanies();
  const data = await request
    .call(api.url, {
      method: api.method,
      data: payload,
    })
    .then(function(res) {
      const data = res.data;
      console.log('data:', data);

      return;
    })
    .catch(function(error) {
      return error;
    });
  return data;
};

export default {
  fetchCompanies,
};
