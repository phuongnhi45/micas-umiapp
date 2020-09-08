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

const getEmployees = async () => {
  const api = APIConst.getEmployees.list();
  const res = await request.call(api.url, { method: api.method });
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
