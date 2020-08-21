import service from '@/services';
import { Effect, Reducer, history } from 'umi';

export interface LoginState {
  phone: string;
  password: string;
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
    phone: '',
    password: '',
  },
  effects: {
    *submitlogin({ payload }, { call, put }) {
      const { data, err } = yield call(service.postLogIn, payload);
      console.log('token?', data);
      if (err) {
        alert('error');
        return;
      }
      if (data) {
        localStorage.setItem('token', data);
      } else {
        console.log('Loggin error');
      }
      yield put({
        type: 'save',
        payload,
      });
      return history.push('/home');
    },
    *init({ payload }, { call }) {
      // Get token saved in storage
      const { data } = yield call(service.getLogIn, payload);

      // if have no token, redirect to login page
      if (!data) {
        return history.push('/login');
      }
      //if logged
      console.log('về home');
      return history.push('/home');
    },
    *logout() {
      localStorage.removeItem('token');
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
