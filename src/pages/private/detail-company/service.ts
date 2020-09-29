import request from '@/utils/request';
import { APIConst } from '@/config';

const token = localStorage.getItem('accessToken');

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

export default {
  fetchCompanyDetail,
};
