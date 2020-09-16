import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');
const postEmployee = async (payload: any) => {
  const api = APIConst.submitEmployee.postEmployee();
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

const getEmployees = async () => {
  const api = APIConst.getEmployees.list();
  const res = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.data;
  const result = data.data.data;
  return result;
};

const getSearchNameEmployee = async (payload: any) => {
  const api = APIConst.getSeachNameEmployee.getSearchNameEmployee(payload);
  const res = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.data) {
    return;
  }
  const data = res.data;
  const result = data.data.data;
  return result;
};

const postUpdateStatus = (payload: any) => {
  const api = APIConst.updateStatus.postChangeStatus(payload);
  const res = request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const editEmployee = async (payload: any) => {
  const act = { active: true };
  const returnedTarget = Object.assign(payload.values, act);
  const api = APIConst.editEmployee.editEmployee(payload.id);
  const res = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: returnedTarget,
  });
  return res;
};

const deleteEmployee = (payload: any) => {
  const api = APIConst.deleteEmployee.deleteEmployee(payload._id);
  const res = request.call(api.url, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export default {
  postEmployee,
  getEmployees,
  postUpdateStatus,
  editEmployee,
  getSearchNameEmployee,
  deleteEmployee,
};
