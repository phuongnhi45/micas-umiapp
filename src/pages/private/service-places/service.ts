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
  const result = response.data.data;
  return result.data;
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
  return response.data;
};

const statusCompany = async (payload: any) => {
  const api = APIConst.changeStatusCompany.statusCompany(payload);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
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
  const result = response.data.data;
  return result.data;
};

const removeCompany = async (payload: any) => {
  const api = APIConst.getRemoveCompany.removeCompany(payload);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export default {
  fetchCompanies,
  postCompany,
  statusCompany,
  editCompany,
  searchCompanies,
  removeCompany,
};
