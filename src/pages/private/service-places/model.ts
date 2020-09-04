import service from './service';
import { Effect, Reducer } from 'umi';
import notification from '@/utils/notification';

export interface CompanyState {
  address: string;
  name: string;
  active: boolean;
  location: string;
  email: string;
  phone: string;
  date: string;
}

export interface CompanyModelType {
  namespace: string;
  state: any;
  effects: {
    getCompanies: Effect;
    createCompany: Effect;
  };
  reducers: {
    save: Reducer<CompanyState>;
  };
}

const Company: CompanyModelType = {
  namespace: 'company',
  state: [],
  effects: {
    *getCompanies({ payload }: any, { call, put }: any) {
      const response = yield call(service.fetchCompanies);
      const { data } = response.data;
      console.log('model', data);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *createCompany({ payload }: any, { call, put }: any) {
      yield call(service.postCompany, payload);
      console.log('model', payload);
      notification.success('Created successfully');
      yield put({
        type: 'save',
        payload,
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Company;
