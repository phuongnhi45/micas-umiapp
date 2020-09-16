import service from './services';
import { Effect, Reducer } from 'umi';
import notification from '@/utils/notification';

export interface EmployeeState {
  name: string;
  phone: string;
  password: string;
  active: boolean;
}

export interface EmployeeModelType {
  namespace: string;
  state: any;
  effects: {
    submitEmployee: Effect;
    getEmployees: Effect;
    updateStatus: Effect;
    editEmployee: Effect;
    searchNameEmployee: Effect;
    deleteEmployee: Effect;
  };
  reducers: {
    save: Reducer<EmployeeState>;
  };
}

const EmployeeModel: EmployeeModelType = {
  namespace: 'Employee',
  state: [],
  effects: {
    *submitEmployee({ payload }: any, { call, put, select }: any) {
      const response = yield call(service.postEmployee, payload);
      if (!response || response.err) {
        return notification.error('Create employee failed!');
      }
      notification.success('Create employee success!');
      yield put({
        type: 'getEmployees',
      });
    },
    *getEmployees({ payload }: any, { call, put }: any) {
      const data = yield call(service.getEmployees);
      if (data) {
        yield put({
          type: 'save',
          payload: data,
        });
      } else {
        notification.error('No data log!');
      }
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
        notification.success('Edit employee success!');
        yield put({
          type: 'getEmployees',
        });
      } else {
        console.log(data);
        notification.error('Edit employee error!');
      }
    },
    *searchNameEmployee({ payload }: any, { call, put }: any) {
      const data = yield call(service.getSearchNameEmployee, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: data,
        });
      } else {
        notification.error('No result!');
        yield put({
          type: 'getEmployees',
        });
      }
    },
    *deleteEmployee({ payload }: any, { call, put }: any) {
      const data = yield call(service.deleteEmployee, payload);
      notification.success('Delete employee success');
      yield put({
        type: 'getEmployees',
      });
    },
  },

  reducers: {
    save(state, action) {
      return [...action.payload];
    },
  },
};

export default EmployeeModel;
