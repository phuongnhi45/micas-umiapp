import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

export interface CompanyState {
  companies: ICompany[];
  filter: IFilter;
  company: any;
  services: IService[];
  service: any;
  bookings: IBooking[];
  booking: any;
}

export interface IBooking {
  phone: string;
  email: string;
  _id: string;
  time: string;
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
    createService: Effect;
    getRemoveService: Effect;
    changeStatusService: Effect;
    editService: Effect;
    getServiceDetail: Effect;
    getBookingByService: Effect;
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
  bookings: [],
  booking: null,
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
      if (!payload.active) {
        notification.success('Activate Success');
      } else {
        notification.success('Deactivate Success');
      }
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
        yield put({
          type: 'updateState',
          payload: {
            services: [],
          },
        });
      } else {
        const { list } = response.data.data;
        yield put({
          type: 'updateState',
          payload: {
            services: list,
          },
        });
      }
    },

    *getServiceDetail({ id }: any, { call, put }: any) {
      const response = yield call(service.fetchServiceDetail, id);
      const { data } = response.data;
      yield put({
        type: 'updateState',
        payload: {
          service: data,
        },
      });
    },

    *createService({ payload }, { call, put }) {
      const response = yield call(service.postService, payload);
      if (!response.data) {
        return notification.error('Create service failed');
      }
      notification.success('Created success');
      yield put({
        type: 'getServiceByCompany',
        id: payload.companyid,
      });
    },

    *changeStatusService({ payload }, { call, put }) {
      const response = yield call(service.statusService, payload);
      const { data, message } = response.data;
      if (!data) {
        return notification.error(message);
      }
      if (payload.active) {
        notification.success('Activate Success');
      } else {
        notification.success('Deactivate Success');
      }
      yield put({
        type: 'getServiceByCompany',
        id: payload.id,
      });
    },

    *editService({ payload }, { call, put }) {
      const response = yield call(service.updateService, payload);
      const { data, message } = response.data;
      if (!data) {
        return notification.error(message);
      }
      notification.success('Success');
      yield put({
        type: 'getServiceByCompany',
        id: payload._id,
      });
    },

    *getRemoveService({ payload }: any, { call, put }: any) {
      yield call(service.removeService, payload);
      notification.success('Deleted success');
      yield put({
        type: 'getServiceByCompany',
        id: payload.id,
      });
    },

    *getBookingByService({ id }: any, { call, put }: any) {
      const response = yield call(service.fetchBookings, id);
      if (!response.data) {
        yield put({
          type: 'updateState',
          payload: {
            bookings: [],
          },
        });
      } else {
        const { list } = response.data.data;
        console.log(list);
        yield put({
          type: 'updateState',
          payload: {
            bookings: list,
          },
        });
      }
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
