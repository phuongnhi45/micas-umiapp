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
        return notification.error('Create employee failed');
      }
      notification.success('Create employee success');
      yield put({
        // type: 'save',
        // payload,
        type: 'getEmployees',
      });
    },
    *getEmployees({ payload }: any, { call, put }: any) {
      const data = yield call(service.getEmployees);
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *updateStatus({ payload }: any, { call, put }: any) {
      yield call(service.postUpdateStatus, payload);
      yield put({
        type: 'getEmployees',
      });
    },
    *editEmployee({ payload }: any, { call, put }: any) {
      yield call(service.editEmployee, payload);
      yield put({
        type: 'getEmployees',
      });
    },
    *searchNameEmployee({ payload }: any, { call, put }: any) {
      const data = yield call(service.getSearchNameEmployee, payload);
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
      return [...action.payload];
    },
  },
};

export default EmployeeModel;
