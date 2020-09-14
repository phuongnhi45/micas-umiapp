import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');

const fetchCompanies = async () => {
  const api = APIConst.getCompanies.fetchCompanies();
  const response = await request.call(api.url, {
    method: api.method,
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  const result = data.Data;
  console.log('service', result.data.data.Data);
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
  const response = await request.call(api.url, {
    method: api.method,
    data: payload,
  });
  return response;
};

const editCompany = async (payload: any) => {
  const api = APIConst.updateCompany.editCompany(payload.id);
  request.call(api.url, {
    method: api.method,
    data: payload,
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const searchCompanies = async (payload: any) => {
  const api = APIConst.searchCompanies.searchCompanies(payload);
  const response = await request.call(api.url, {
    method: api.method,
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  const result = data.Data;
  return result;
};

export default {
  fetchCompanies,
  postCompany,
  statusCompany,
  editCompany,
  searchCompanies,
};
