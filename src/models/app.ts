import { AppConst } from '@/config';
import { Effect, Reducer } from 'umi';
import { call, cancelled } from 'redux-saga/effects';

export interface LoginState {
  email: string;
  password: string;
}

export interface LoginModelType {
  namespace: string;
  state: LoginState;
  effects: {
    login: Effect;
  };
  reducers: {
    save: Reducer<LoginState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    email: '',
    password: '',
  },
  effects: {
    *submitlogin(phone: string, password: string, { call, put, select }) {
      let token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTk4MDQ2MTE1LCJuYW1lIjoiSm9uIFNub3cifQ.aBD2JKY15AeZG8UD4XSqvys-SWwk-lhow3LYvf7fXtU';
      try {
        token = yield call(loginApi, phone, password);
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('token', `Bearer ${token}`);
        router.push('/home');
      } catch (error) {
        alert('error');
      } finally {
        if (yield cancelled()) {
          router.push('/login');
        }
      }
      yield put({
        type: 'save',
        payload: phone,
        password,
      });
      return token;
    },
    *init({}, { put, select }) {
      // Get token saved in storage
      const token = localStorage.getItem(
        AppConst.getIn(['localStorage', 'authKey']),
      );

      // if have no token, redirect to login page
      if (!token) {
        return yield put(router.push('/login'));
      }
    },
    *logout() {
      // remove our token
      localStorage.removeItem('token');

      // redirect to the /login screen
      router.push('/login');
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
