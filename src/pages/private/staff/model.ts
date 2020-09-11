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
      yield call(service.postEmployee, payload);
      if (!payload) {
        notification.error('Create employee failed');
      }
      if (payload) {
        notification.success('Create employee success');
        yield put({
          type: 'save',
          payload,
        });
      }
    },
    *getEmployees({ payload }: any, { call, put, select }: any) {
      const data = yield call(service.getEmployees);
      console.log(data, 'fdata nè');
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *updateStatus({ payload }: any, { call, put, select }: any) {
      yield call(service.postUpdateStatus, payload);
    },
    *editEmployee({ payload }: any, { call, put, select }: any) {
      yield call(service.editEmployee, payload);
    },
  },

  reducers: {
    save(state, action) {
      return [...action.payload];
    },
  },
};

export default EmployeeModel;
