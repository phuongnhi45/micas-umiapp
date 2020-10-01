import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');

const postCustomer = async (payload: any) => {
  const api = APIConst.submitCustomer.postCustomer();
  const dataResponse = await request
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
  return dataResponse;
};

const getCustomers = async (payload: any) => {
  const api = APIConst.getCustomers.fetchCustomers();
  const response = await request.call(api.url, {
    method: api.method,
    query: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const postUpdateStatus = (payload: any) => {
  const api = APIConst.updateStatusCustomer.postChangeStatus(payload);
  const res = request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const editCustomer = async (payload: any) => {
  const act = { active: true };
  const returnedTarget = Object.assign(payload.values, act);
  const api = APIConst.editCustomer.editCustomer(payload.id);
  const res = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: returnedTarget,
  });
  console.log(res, 'ewss');
  return res;
};

const deleteCustomer = (payload: any) => {
  const api = APIConst.deleteCustomer.deleteCustomer(payload._id);
  const res = request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const fetchCustomerDetail = async (id: string) => {
  const api = APIConst.getCustomers.fetchCustomerDetail(id);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export default {
  postCustomer,
  getCustomers,
  postUpdateStatus,
  editCustomer,
  deleteCustomer,
  fetchCustomerDetail,
};
