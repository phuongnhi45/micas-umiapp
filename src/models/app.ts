// import jwtDecode from ‘jwt-decode’
// import axios from ‘axios’;
import { AppConst } from '@/config';

export interface IApp {
  user: any;
  isLoggedIn: boolean;
  appFilters: any;
  locationPathname: string;
  location: any;
}

const initState: IApp = {
  user: null,
  isLoggedIn: true,
  locationPathname: '',
  appFilters: {},
  location: {},
};

export default {
  namespace: 'app',
  state: initState,
  // reducers: {
  //   updateState(state: any, { payload }) {
  //     return {
  //       ...state,
  //       ...payload,
  //     }
  //   },
  // },
  subscriptions: {
    /*checkLoggedIn({dispatch, history}) {
      const authToken = localStorage.token;
      if (authToken) {
        const decodedToken:any = jwtDecode(authToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common[‘Authorization’] = authToken;
        store.dispatch(getUserData());
        }
      }
    }/ */
  },
  effect: {
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
  },
};
