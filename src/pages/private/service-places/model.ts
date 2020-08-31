import service from './service';
import { Effect, Reducer, history } from 'umi';

export interface LoginState {
  company: Company | null;
}

export interface Company {
  _id: string;
  name: string;
}

export interface CompanyType {
  namespace: string;
  state: LoginState;
  effects: {
    submitlogin: Effect;
  };
  reducers: {
    save: Reducer<LoginState>;
  };
}

const Company: CompanyType = {
  namespace: 'company',
  state: {
    company: null,
  },
  effects: {
    *getCompanies({ payload }, { call, put }) {
      yield call(service.fetchCompanies, payload);

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
