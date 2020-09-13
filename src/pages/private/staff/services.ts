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
      console.log('res', res);
      return res.data;
    })
    .catch(function(error) {
      console.log('lỗi', error);
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
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU3NGQ0YjdjNjg5ODQyZWFlYmU0MmIiLCJleHAiOjE2MDAwMzY3NzZ9.GBT5LaNTUTBqEzS0LEOgRyHssB5KeBTNv5Dmawoh160',
    },
  });
  console.log('res', res);
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
  const api = APIConst.editEmployee.editEmployee(payload.id);
  request.call(api.url, {
    method: api.method,
    headers: {
      Authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU3NGQ0YjdjNjg5ODQyZWFlYmU0MmIiLCJleHAiOjE2MDAwMzY3NzZ9.GBT5LaNTUTBqEzS0LEOgRyHssB5KeBTNv5Dmawoh160',
    },
    data: payload,
  });
};

export default {
  postEmployee,
  getEmployees,
  postUpdateStatus,
  editEmployee,
};
