import request from '@/utils/request';
import { APIConst } from '@/config';

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

type ILocalStorageKey = 'acess_token' | 'username';

const getEmployees = async () => {
  const api = APIConst.getEmployees.list();
  const res = await request.call(api.url, {
    method: api.method,
    headers: {
      Authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU3NGQ0YjdjNjg5ODQyZWFlYmU0MmIiLCJleHAiOjE1OTk4OTg4MjR9.zEE6HTGcgbRZV3GxaOzpjIpmhfDOPFrVjEEBeE0Ua3w',
    },
  });
  const data = res.data;
  const result = data.Data;
  return result;
};

const postUpdateStatus = (payload: any) => {
  const api = APIConst.updateStatus.postChangeStatus(payload);
  request.call(api.url, {
    method: api.method,
    data: payload,
  });
};

const editEmployee = async (payload: any) => {
  const returnedTarget = Object.assign(payload.values, { active: true });
  const api = APIConst.editEmployee.editEmployee(payload.id);
  request.call(api.url, {
    method: api.method,
    data: returnedTarget,
  });
};

export default {
  postEmployee,
  getEmployees,
  postUpdateStatus,
  editEmployee,
};
