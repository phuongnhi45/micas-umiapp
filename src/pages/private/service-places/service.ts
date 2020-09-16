import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');

const fetchCompanies = async () => {
  const api = APIConst.getCompanies.fetchCompanies();
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
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

const statusCompany = async (payload: any) => {
  console.log(payload);
  const api = APIConst.changeStatusCompany.statusCompany(payload);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const editCompany = async (payload: any) => {
  const api = APIConst.updateCompany.editCompany(payload.id);
  request.call(api.url, {
    method: api.method,
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const searchCompanies = async (payload: any) => {
  const api = APIConst.searchCompanies.searchCompanies(payload);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  const result = data.Data;
  return result;
};

const removeCompany = (payload: any) => {
  const api = APIConst.getRemoveCompany.removeCompany(payload._id);
  request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  fetchCompanies,
  postCompany,
  statusCompany,
  editCompany,
  searchCompanies,
  removeCompany,
};
