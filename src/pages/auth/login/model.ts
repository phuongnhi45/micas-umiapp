import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

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
  namespace: 'login',
  state: {
    user: null,
  },
  effects: {
    *submitlogin({ payload }, { call, put }) {
      yield call(service.postLogIn, payload);
      const token = localStorage.getItem('accessToken');
      if (token) {
        notification.success('Login success');
        return yield put(history.push('/service-places'));
      } else {
        notification.error('Login failed');
      }
      if (!token) {
        return;
      }
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
