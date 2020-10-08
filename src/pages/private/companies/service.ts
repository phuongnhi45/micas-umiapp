import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');

//company
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
  const active = { active: true };
  const returnedTarget = Object.assign(payload.value, active);
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

//service-places
const fetchService = async (id: string) => {
  const api = APIConst.getServiceByCompany.fetchService(id);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const postService = async (payload: any) => {
  const api = APIConst.getServiceByCompany.postService();
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

const removeService = async (payload: any) => {
  const api = APIConst.getServiceByCompany.removeService(payload);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const statusService = async (payload: any) => {
  const api = APIConst.getServiceByCompany.statusService(payload);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateService = async (payload: any) => {
  const active = { active: true };
  const returnedTarget = Object.assign(payload.data, active);
  const api = APIConst.getServiceByCompany.updateService(payload.id);
  const response = await request.call(api.url, {
    method: api.method,
    data: returnedTarget,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const fetchServiceDetail = async (id: string) => {
  const api = APIConst.getServiceByCompany.fetchServiceDetail(id);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//bookings
const fetchBookings = async (id: string) => {
  const api = APIConst.getBookingByService.fetchBookings(id);
  const response = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const removeBooking = async (payload: any) => {
  const api = APIConst.getBookingByService.removeBooking(payload);
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
  fetchService,
  removeService,
  statusService,
  postService,
  updateService,
  fetchServiceDetail,
  fetchBookings,
  removeBooking,
};
