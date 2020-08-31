import service from './services';
import { Effect, Reducer, history } from 'umi';
export interface EmployeeState {
  name: string;
  phone: string;
  password: string;
  active: boolean;
}
export interface EmployeeModelType {
  namespace: string;
  // state: EmployeeState;
  state: any;
  effects: {
    submitEmployee: Effect;
    getEmployees: Effect;
  };
  reducers: {
    save: Reducer<EmployeeState>;
  };
}
const EmployeeModel: EmployeeModelType = {
  namespace: 'Employee', // có name space đây rồi
  // state: {
  //   name: '',
  //   phone: '',
  //   password: '',
  //   active: false
  // },
  state: [],
  effects: {
    *submitEmployee({ payload }: any, { call, put, select }: any) {
      yield call(service.postEmployee, payload);
      yield put({
        type: 'save',
        payload,
      });
    },
    *getEmployees({ payload }: any, { call, put, select }: any) {
      const data = yield call(service.getEmployees);
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },

  reducers: {
    save(state, action) {
      // console.log('state', state);
      console.log('action', action.payload);

      return [...action.payload];
    },
  },
};
export default EmployeeModel;
