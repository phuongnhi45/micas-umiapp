import service from './services';
import { Effect, Reducer } from 'umi';
import notification from '@/utils/notification';

export interface EmployeeState {
  employees: IEmployee[];
  filter: IFilter;
  employee: any;
}

export interface IFilter {
  page: number;
  limit: number;
  total: number;
  name?: string;
}

export interface IEmployee {
  name: string;
  phone: string;
  password: string;
  active: boolean;
  _id: string;
}

export interface EmployeeModelType {
  namespace: string;
  state: EmployeeState;
  effects: {
    submitEmployee: Effect;
    getEmployees: Effect;
    updateStatus: Effect;
    editEmployee: Effect;
    deleteEmployee: Effect;
  };
  reducers: {
    save: Reducer<EmployeeState>;
  };
}

const initialState: EmployeeState = {
  employees: [],
  filter: {
    page: 0,
    total: 0,
    limit: 20,
    name: '',
  },
  employee: null,
};

const EmployeeModel: EmployeeModelType = {
  namespace: 'Employee',
  state: initialState,
  effects: {
    *submitEmployee({ payload }: any, { call, put, select }: any) {
      const response = yield call(service.postEmployee, payload);
      if (!response || response.err) {
        return notification.error('Create employee failed');
      }
      notification.success('Create employee success');
      yield put({
        type: 'getEmployees',
      });
    },

    *getEmployees({ payload }, { call, put }) {
      const response = yield call(service.getEmployees, payload);
      if (response.err === 'empty list') {
        notification.error('No result!');
        return yield put({
          type: 'getEmployees',
        });
      }
      if (response.err && response.err !== 'empty list') {
        return;
      }
      const { list, page, total, limit } = response.data.data;
      yield put({
        type: 'save',
        payload: {
          employees: list,
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
        type: 'getEmployees',
      });
    },

    *editEmployee({ payload }: any, { call, put }: any) {
      const data = yield call(service.editEmployee, payload);
      if (data.data) {
        notification.success('Edit employee success');
        yield put({
          type: 'getEmployees',
        });
      }
      if (!data.data) {
        notification.error('Edit employee failed!');
        yield put({
          type: 'getEmployees',
        });
      }
    },

    *deleteEmployee({ payload }: any, { call, put }: any) {
      const data = yield call(service.deleteEmployee, payload);
      notification.success('Deleted employee success');
      yield put({
        type: 'getEmployees',
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

export default EmployeeModel;
