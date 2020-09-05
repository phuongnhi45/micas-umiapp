import request from '@/utils/request';
import { APIConst } from '@/config';
const postEmployee = async (payload: any) => {
  console.log('payload', payload);
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
  console.log(result);
  return result;
};
export default {
  postEmployee,
  getEmployees,
};