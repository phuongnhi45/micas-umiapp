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
  let data = {
    name: payload.name,
    address: payload.address,
    password: payload.password,
    resourceid: payload.resourceid,
  };
  const api = APIConst.editCustomer.editCustomer(payload._id);
  const res = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
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

const postAvatar = async (payload: any) => {
  const api = APIConst.postAvatar.postAvatar();
  const formData = new FormData();
  formData.append('file', payload);
  const response = await request.call(api.url, {
    method: api.method,
    body: formData,
    requestType: 'form',
  });
  return response;
};

const getBookings = async (payload: any) => {
  const id = payload.id;
  const api = APIConst.getBookings.fetchBookings();
  const response = await request.call(api.url, {
    method: api.method,
    query: { customerid: id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const fetchBookingDetail = async (id: string) => {
  const api = APIConst.getBookings.fetchBookingDetail(id);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const getServices = async () => {
  const api = APIConst.getServices.getServices();
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
  postAvatar,
  getBookings,
  fetchBookingDetail,
  getServices,
};
