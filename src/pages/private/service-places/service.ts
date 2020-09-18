import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');

const fetchCompanies = async (payload: any) => {
  const api = APIConst.getCompanies.fetchCompanies();
  const response = await request.call(api.url, {
    method: api.method,
    query: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const postCompany = async (payload: any) => {
  const api = APIConst.createCompany.postCompany();
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
  return response;
};

const editCompany = async (payload: any) => {
  const api = APIConst.updateCompany.editCompany(payload._id);
  const response = await request.call(api.url, {
    method: api.method,
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const fetchCompanyDetail = async (id: string) => {
  const api = APIConst.getCompanies.fetchCompanyDetail(id);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
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
  removeCompany,
  fetchCompanyDetail,
};
