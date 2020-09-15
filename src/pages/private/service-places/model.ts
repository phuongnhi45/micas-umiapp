import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

export interface CompanyState {
  address: string;
  name: string;
  active: boolean;
  location: string;
  _id: string;
}

export interface CompanyModelType {
  namespace: string;
  state: any;
  effects: {
    getCompanies: Effect;
    createCompany: Effect;
    updateCompany: Effect;
    changeStatusCompany: Effect;
    searchCompanies: Effect;
  };
  reducers: {
    save: Reducer<CompanyState>;
  };
}

const CompanyModel: CompanyModelType = {
  namespace: 'Company',
  state: [],
  effects: {
    *getCompanies({ payload }, { call, put }) {
      const data = yield call(service.fetchCompanies);
      yield put({
        type: 'save',
        payload: {
          companies: data,
        },
      });
    },

    *createCompany({ payload }, { call, put }) {
      yield call(service.postCompany, payload);
      if (!payload) {
        return notification.error('Create company failed');
      } else {
        notification.success('Create success');
        yield put(history.push('/service-places'));
      }
      yield put({
        type: 'getCompanies',
        payload,
      });
    },

    *changeStatusCompany({ payload }, { call, put }) {
      const response = yield call(service.statusCompany, payload);
      const { Data, message } = response.data;
      if (!Data) {
        return notification.error(message);
      }
      notification.success(message);
      yield put({
        type: 'getCompanies',
      });
    },

    *updateCompany({ payload }, { call, put }) {
      const response = yield call(service.editCompany, payload);
      console.log(response);
      yield put({
        type: 'getCompanies',
      });
    },

    *searchCompanies({ payload }, { call, put }) {
      const data = yield call(service.searchCompanies, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: data,
        });
      } else {
        yield put({
          type: 'save',
          payload: [],
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      const data = action.payload.companies;
      return [...data];
    },
  },
};

export default CompanyModel;
