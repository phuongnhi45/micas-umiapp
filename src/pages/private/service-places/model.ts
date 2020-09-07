import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

export interface CompanyState {
  address: string;
  name: string;
  active: boolean;
  location: string;
  date: string;
  _id: string;
}

export interface CompanyModelType {
  namespace: string;
  state: any;
  effects: {
    getCompanies: Effect;
    createCompany: Effect;
    changeStatusCompany: Effect;
  };
  reducers: {
    save: Reducer<CompanyState>;
  };
}

const initState: CompanyModelState = {
  companies: [],
};

export interface CompanyModelState {
  companies: CompanyState[];
}

const CompanyModel: CompanyModelType = {
  namespace: 'company',
  state: initState,
  effects: {
    *getCompanies({ payload }, { call, put }) {
      const data = yield call(service.fetchCompanies);
      console.log('model', data);
      yield put({
        type: 'save',
        payload: {
          companies: data,
        },
      });
    },

    *createCompany({ payload }, { call, put }) {
      yield call(service.postCompany, payload);
      console.log('model', payload);
      if (!payload) {
        notification.error('Create company failed');
      }
      if (payload) {
        notification.success('Create company success');
        return yield put(history.push('/service-places'));
      }
      yield put({
        type: 'save',
        payload,
      });
    },

    *changeStatusCompany({ payload }, { call, put, select }) {
      const response = yield call(service.statusCompany, payload);
      const { success, message, data } = response.data;
      if (!success) {
        return notification.error(message);
      }
      console.log('model', response);
      console.log(data);
      // Success
      // notification.success(message);

      // Change item

      // If found, change status then update

      // Else reload table data
      yield put({
        type: 'fetch',
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

export default CompanyModel;
