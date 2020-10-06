import service from '../service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';
import { message } from 'antd';

export interface CustomerState {
  bookings: IBooking[];
  customers: ICustomer[];
  filter: IFilter;
  customer: any;
}

export interface IFilter {
  page: number;
  limit: number;
  total: number;
  name?: string;
}

export interface ICustomer {
  name: string;
  phone: string;
  address: string;
  password: string;
  active: boolean;
  _id: string;
}

export interface IBooking {
  _id: string;
  customerid: string;
  serviceid: string;
  status: string;
  time: string;
  createdAt: string;
  note: string;
  servicename: string;
}

export interface CustomerModelType {
  namespace: string;
  state: CustomerState;
  effects: {
    submitCustomer: Effect;
    getCustomers: Effect;
    updateStatus: Effect;
    editCustomer: Effect;
    deleteCustomer: Effect;
    getCustomerDetail: Effect;
    postAvatar: Effect;
    getBookings: Effect;
  };
  reducers: {
    save: Reducer<CustomerState>;
  };
}

const initialState: CustomerState = {
  customers: [],
  bookings: [],
  filter: {
    page: 0,
    total: 0,
    limit: 20,
    name: '',
  },
  customer: null,
};

const CustomerModel: CustomerModelType = {
  namespace: 'Customer',
  state: initialState,
  effects: {
    *submitCustomer({ payload }: any, { call, put, select }: any) {
      const response = yield call(service.postCustomer, payload);
      if (!response || response.err) {
        return notification.error('Create customer failed');
      }
      notification.success('Create customer success');
      history.push('/car-owners');
      yield put({
        type: 'getCustomers',
      });
    },

    *getCustomers({ payload }, { call, put }) {
      const response = yield call(service.getCustomers, payload);

      if (response.err === 'empty list') {
        notification.error('No result!');
        return;
      }
      if (response.err && response.err !== 'empty list') {
        notification.error('Error server');
        return;
      }
      const { list, page, total, limit } = response.data.data;
      yield put({
        type: 'save',
        payload: {
          customers: list,
          filter: {
            page: page,
            total: total,
            limit,
          },
        },
      });
    },

    *updateStatus({ payload }: any, { call, put }: any) {
      yield call(service.postUpdateStatus, payload);
      yield put({
        type: 'getCustomers',
      });
    },

    *editCustomer({ payload }: any, { call, put }: any) {
      const data = yield call(service.editCustomer, payload);

      if (data.data) {
        notification.success('Edit customer success');
        history.push('/car-owners');
        yield put({
          type: 'getCustomers',
        });
      }
      if (!data.data) {
        notification.error('Edit customer failed!');
        yield put({
          type: 'getCustomers',
        });
      }
    },

    *deleteCustomer({ payload }: any, { call, put }: any) {
      const data = yield call(service.deleteCustomer, payload);
      notification.success('Deleted customer success');
      yield put({
        type: 'getCustomers',
      });
    },
    *getCustomerDetail({ id }: any, { call, put }: any) {
      const response = yield call(service.fetchCustomerDetail, id);
      const { data } = response.data;
      yield put({
        type: 'save',
        payload: {
          customer: data,
        },
      });
    },

    *postAvatar({ payload }, { call, put }) {
      const response = yield call(service.postAvatar, payload.file);
      const idImg = response.data.data;
      const inforUpdate = {
        _id: payload.customer._id,
        name: payload.customer.name,
        address: payload.customer.address,
        password: payload.customer.password,
        resourceid: idImg,
      };

      const data = yield call(service.editCustomer, inforUpdate);
      if (!data.data) {
        notification.error('Edit avatar failed!');
        yield put({
          type: 'getCustomers',
        });
      }
      yield put({
        type: 'getCustomer',
      });
    },
    *getBookings({ payload }, { call, put }) {
      const response = yield call(service.getBookings, payload);
      const { list } = response.data.data;
      if (response.err) {
        notification.error('Error get bookings');
        return;
      }
      const resServices = yield call(service.getServices);
      if (resServices.err === 'empty list') {
        notification.error('No result!');
        return;
      }
      if (resServices.err && resServices.err !== 'empty list') {
        notification.error('Error get bookings');
        return;
      }
      const listServices = resServices.data.data.list;

      const users = [payload];
      const getData = () => {
        let result = list.map((booking: any) => {
          let servic = listServices.find(
            (service: any) => service._id === booking.serviceid,
          );
          let user = users.find(user => user.id === booking.customerid);
          if (!user) {
            return [];
          }
          return {
            _id: booking._id,
            servicename: servic.name,
            status: booking.status,
            time: booking.time,
            note: booking.note,
            createrAt: booking.createdAt,
          };
        });
        return result;
      };
      yield put({
        type: 'save',
        payload: {
          bookings: getData(),
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CustomerModel;
