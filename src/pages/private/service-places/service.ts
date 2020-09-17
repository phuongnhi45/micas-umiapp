import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');

/* 
page: 0,
name: "",
*/

const fetchCompanies = async (query: any) => {
  const api = APIConst.getCompanies.fetchCompanies();
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: query,
  });
  const result = response.data.data;
  return result.data;
};

const postCompany = async (payload: any) => {
  const api = APIConst.createCompany.postCompany(payload);
  const response = await request
    .call(api.url, {
      method: api.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  const active = { active: true };
  const returnedTarget = Object.assign(payload.values, active);
  const api = APIConst.updateCompany.editCompany(payload.id);
  const response = await request.call(api.url, {
    method: api.method,
    data: returnedTarget,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
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
