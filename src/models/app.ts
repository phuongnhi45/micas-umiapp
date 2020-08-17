import jwtDecode from ‘jwt-decode’
import axios from ‘axios’

export interface IApp {
  user: any
  isLoggedIn: boolean
  appFilters: any
  locationPathname: string
  location: any
}

const initState: IApp = {
  user: null,
  isLoggedIn: true,
  locationPathname: '',
  appFilters: {},
  location: {},
}

export default {
  namespace: 'app',
  state: initState,
  reducers: {
    updateState(state: any, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  subscriptions: {
    checkLoggedIn() {
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
    }
  },
}