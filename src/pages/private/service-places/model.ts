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
    getRemoveCompany: Effect;
  };
  reducers: {
    save: Reducer<CompanyState>;
  };
}

const initState: CompanyModelState = {
  companies: [],
  filter: {
    page: 0,
    total: 20,
    limit: 0,
    keyword: '',
    status: 'all',
  },
};

export interface ICommonFilter {
  page: number;
  limit: number;
  total: number;
  status?: string;
  keyword?: string;
  active?: string | boolean;
}

export interface CompanyModelState {
  companies: CompanyState[];
  filter: ICommonFilter;
}

const CompanyModel: CompanyModelType = {
  namespace: 'Company',
  state: initState,
  effects: {
    *getCompanies({ payload }, { call, put }) {
      const data = yield call(service.fetchCompanies, payload);
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
      if (!response.data) {
        return notification.error('Change failed');
      }
      notification.success(response.message);
      yield put({
        type: 'getCompanies',
      });
    },

    *updateCompany({ payload }, { call, put }) {
      const response = yield call(service.editCompany, payload);
      console.log(response);
      if (!response.data) {
        return notification.error('Update error');
      }
      notification.success(response.message);
      yield put({
        type: 'getCompanies',
      });
    },

    *searchCompanies({ payload }: any, { call, put }: any) {
      const data = yield call(service.searchCompanies, payload);
      console.log(data);
      if (data) {
        yield put({
          type: 'save',
          companies: data,
        });
      } else {
        notification.error('No result!');
        yield put({
          type: 'getCompanies',
        });
      }
    },

    *getRemoveCompany({ payload }: any, { call, put }: any) {
      const response = yield call(service.removeCompany, payload);
      if (!response.data) {
        return notification.error('Delete failed');
      }
      notification.success('Deleted success');
      yield put({
        type: 'getCompanies',
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
