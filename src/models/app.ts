import service from '@/services';
import { Effect, Reducer, history } from 'umi';

export interface LoginState {
  isLogIn: boolean;
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
    init: Effect;
    submitlogin: Effect;
    logout: Effect;
  };
  reducers: {
    save: Reducer<LoginState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    isLogIn: false,
    user: null,
  },
  effects: {
    *submitlogin({ payload }, { call, put }) {
      yield call(service.postLogIn, payload);
      const token = localStorage.getItem('accessToken');
      if (token) {
        return yield put(history.push('/home'));
      } else {
        alert('Please Sign in again');
      }
      yield put({
        type: 'save',
        payload,
      });
    },
    *init(_, { put }) {
      // Get token saved in storage
      const token = localStorage.getItem('accessToken');
      // if have no token, redirect to login page
      if (token == null) {
        return yield put(history.push('/login'));
      }
    },
    *logout() {
      localStorage.removeItem('accessToken');
      return history.push('/login');
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
