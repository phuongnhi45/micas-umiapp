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
  const response = await request
    .call(api.url, {
      method: api.method,
      data: payload,
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(error) {
      return error;
    });
  return response;
};

const statusCompany = async ({ _id }: { _id: string }, payload: any) => {
  const api = APIConst.changeStatusCompany.statusCompany(_id);
  const response = await request
    .call(api.url, {
      method: api.method,
      data: payload,
    })
    .then(function(res) {
      console.log('service', res.data);
      return res.data;
    });
  return response;
};

export default {
  fetchCompanies,
  postCompany,
  statusCompany,
};
