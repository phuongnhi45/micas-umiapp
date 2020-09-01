import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

export interface NewCompany {
  company: CompanyState | null;
}

export interface CompanyState {
  address: string;
  name: string;
  active: boolean;
}

export interface CompanyType {
  namespace: string;
  state: NewCompany;
  effects: {
    getCompanies: Effect;
    createCompany: Effect;
  };
  reducers: {
    save: Reducer<NewCompany>;
  };
}

const Company: CompanyType = {
  namespace: 'company',
  state: {
    company: null,
  },
  effects: {
    *getCompanies({ payload }, { call, put }) {
      const response = yield call(service.fetchCompanies, payload);
      const { success, message, data } = response.data;
      if (!success) {
        return notification.error(message);
      }
      console.log(data);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *createCompany({ payload }, { call, put }) {
      yield call(service.postCompany, payload);
      console.log('model', payload);
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
