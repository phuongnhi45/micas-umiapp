import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

export interface CompanyState {
  companies: ICompany[];
  filter: IFilter;
  company: any;
}

export interface IFilter {
  page: number;
  limit: number;
  total: number;
  name?: string;
}

export interface ICompany {
  address: string;
  name: string;
  active: boolean;
  location: string;
  _id: string;
}

interface CompanyModelType {
  namespace: string;
  state: CompanyState;
  effects: {
    getCompanies: Effect;
    createCompany: Effect;
    updateCompany: Effect;
    changeStatusCompany: Effect;
    getRemoveCompany: Effect;
    getServicePlaceDetail: Effect;
  };
  reducers: {
    updateState: Reducer<CompanyState>;
  };
}

const initialState: CompanyState = {
  companies: [],
  filter: {
    page: 0,
    total: 0,
    limit: 20,
    name: '',
  },
  company: null,
};

const CompanyModel: CompanyModelType = {
  namespace: 'Company',
  state: initialState,
  effects: {
    *getCompanies({ payload }, { call, put }) {
      const response = yield call(service.fetchCompanies, payload);
      const { list, page, limit, total } = response.data.data;
      yield put({
        type: 'updateState',
        payload: {
          companies: list,
          filter: {
            page: page,
            total: total,
            limit,
          },
        },
      });
    },

    *createCompany({ payload }, { call, put }) {
      yield call(service.postCompany, payload);
      console.log(payload);
      if (!payload) {
        return notification.error('Create company failed');
      } else {
        notification.success('Created success');
        yield put(history.push('/service-places'));
      }
      yield put({
        type: 'getCompanies',
        payload,
      });
    },

    *changeStatusCompany({ payload }, { call, put }) {
      const response = yield call(service.statusCompany, payload);
      console.log('status', payload);
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
      console.log('update', response);
      if (!response.data) {
        return notification.error('Update error');
      }
      notification.success(response.message);
      yield put({
        type: 'getCompanies',
      });
    },

    *getServicePlaceDetail({ id }: any, { call, put }: any) {
      const response = yield call(service.fetchCompanyDetail, id);
      const { data } = response.data;
      yield put({
        type: 'updateState',
        payload: {
          company: data,
        },
      });
    },

    *getRemoveCompany({ payload }: any, { call, put }: any) {
      const response = yield call(service.removeCompany, payload);
      console.log('delete', response);
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
    updateState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default CompanyModel;
