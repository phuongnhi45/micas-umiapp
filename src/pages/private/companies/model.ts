import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

export interface CompanyState {
  companies: ICompany[];
  filter: IFilter;
  company: any;
  services: IService[];
  service: any;
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
  phone: string;
  email: string;
  active: boolean;
  location: string;
  _id: string;
}

export interface IService {
  address: string;
  name: string;
  active: boolean;
  location: string;
  email: string;
  phone: string;
  _id: string;
  description: string;
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
    getCompanyDetail: Effect;
    getServiceByCompany: Effect;
    getRemoveService: Effect;
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
    limit: 10,
    name: '',
  },
  company: null,
  services: [],
  service: null,
};

const CompanyModel: CompanyModelType = {
  namespace: 'Company',
  state: initialState,
  effects: {
    *getCompanies({ payload }, { call, put }) {
      const response = yield call(service.fetchCompanies, payload);
      if (!response.data) {
        notification.error('Error!');
        console.log(response);
        // return yield put({
        //   type: 'getCompanies',
        // });
      }
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
      const response = yield call(service.postCompany, payload);
      if (!response.data) {
        return notification.error('Create company failed');
      } else {
        notification.success('Created success');
        history.push('/companies');
      }
      yield put({
        type: 'getCompanies',
      });
    },

    *changeStatusCompany({ payload }, { call, put }) {
      const response = yield call(service.statusCompany, payload);
      const { data, message } = response.data;
      if (!data) {
        return notification.error(message);
      }
      notification.success('Success');
      yield put({
        type: 'getCompanies',
      });
    },

    *updateCompany({ payload }, { call, put }) {
      const response = yield call(service.editCompany, payload);
      if (!response.data.data) {
        return notification.error('Update error');
      } else {
        notification.success('Updated success');
        history.push('/companies');
      }
      yield put({
        type: 'getCompanies',
      });
    },

    *getCompanyDetail({ id }: any, { call, put }: any) {
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
      yield call(service.removeCompany, payload);
      notification.success('Deleted success');
      yield put({
        type: 'getCompanies',
      });
    },

    *getServiceByCompany({ id }: any, { call, put }: any) {
      const response = yield call(service.fetchService, id);
      if (!response.data) {
        notification.error('No service!');
        return;
      } else {
        const { list } = response.data.data;
        yield put({
          type: 'updateState',
          payload: {
            services: list,
          },
        });
      }
      return;
    },

    *getRemoveService({ payload }: any, { call, put }: any) {
      yield call(service.removeService, payload);
      notification.success('Deleted success');
      yield put({
        type: 'getServiceByCompany',
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
