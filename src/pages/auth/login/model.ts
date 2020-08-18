// import router from 'umi/router'
// import { AppConst } from '@/config'
// import router from 'umi/router'
import { call, cancelled } from 'redux-saga/effects';

export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    *login(phone: string, password: string) {
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
      return token;
    },
    *logout() {
      // remove our token
      localStorage.removeItem('token');

      // redirect to the /login screen
      router.push('/login');
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
