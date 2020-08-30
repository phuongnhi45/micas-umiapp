import service from './service';
import { Effect, Reducer, history } from 'umi';

export interface LoginState {
  user: AppUser | null;
}

export interface AppUser {
  _id: string;
  name: string;
}

export interface LoginModelType {
  namespace: string;
  state: LoginState;
  effects: {
    submitlogin: Effect;
  };
  reducers: {
    save: Reducer<LoginState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'company',
  state: {
    user: null,
  },
  effects: {
    *getCompanies({ payload }, { call, put }) {
      yield call(service.fetchCompanies, payload);
      const token = localStorage.getItem('accessToken');

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

export default LoginModel;
