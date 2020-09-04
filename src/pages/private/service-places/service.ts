import request from '@/utils/request';
import { APIConst } from '@/config';

const fetchCompanies = async (payload: any) => {
  const api = APIConst.getCompanies.fetchCompanies();
  const res = await request.call(api.url, {
    method: api.method,
    data: payload,
  });
  const data = res.data;
  const result = data.Data;
  return result;
};

const postCompany = async (payload: any) => {
  const api = APIConst.createCompany.postCompany();
  const data = await request.call(api.url, {
    method: api.method,
    data: payload,
  });
  return data;
};

export default {
  fetchCompanies,
  postCompany,
};
