import { APIConst } from '@/config';
import { Effect, Reducer, history } from 'umi';
import { call, cancelled } from 'redux-saga/effects';

export interface LoginState {
  email: string;
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
      const { phone, password } = payload;
      let token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTk4MDQ2MTE1LCJuYW1lIjoiSm9uIFNub3cifQ.aBD2JKY15AeZG8UD4XSqvys-SWwk-lhow3LYvf7fXtU';
      try {
        token = yield call(loginApi, phone, password);
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('token', `Bearer ${token}`);
        return yield put(history.push('/home'));
      } catch (error) {
        alert('error');
      } finally {
        if (yield cancelled()) {
          history.push('/login');
        }
      }
      yield put({
        type: 'save',
        payload,
      });
      return token;
    },
    *init({}, { put, call }) {
      // Get token saved in storage
      const token = localStorage.getItem(
        APIConst.getIn(['localStorage', 'authKey']),
      );
      console.log('init');
      // if have no token, redirect to login page
      if (!token) {
        return yield put(history.push('/login'));
      }
    },
    *logout() {
      // remove our token
      localStorage.removeItem('token');

      // redirect to the /login screen
      history.push('/login');
    },
  },
  reducers: {
    save(state: any, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default LoginModel;

function loginApi(phone: string, password: string) {
  return fetch('http://micasvn.ddns.net:9999/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, password }),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error;
    });
}
