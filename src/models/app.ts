import { Effect, Reducer, history } from 'umi';

export interface AppState {
  user: AppUser | null;
}

export interface AppUser {
  _id: string;
  name: string;
}

export interface AppModelType {
  namespace: string;
  state: AppState;
  effects: {
    init: Effect;
    logout: Effect;
  };
  reducers: {
    save: Reducer<AppState>;
  };
}

const AppModel: AppModelType = {
  namespace: 'app',
  state: {
    user: null,
  },
  effects: {
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

export default AppModel;
