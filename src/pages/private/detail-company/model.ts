import service from './service';
import { Effect, Reducer, history } from 'umi';
import notification from '@/utils/notification';

export interface CompanyState {
  companies: ICompany[];
  company: any;
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
    getServicePlaceDetail: Effect;
  };
  reducers: {
    updateState: Reducer<CompanyState>;
  };
}

const initialState: CompanyState = {
  companies: [],
  company: null,
};

const CompanyModel: CompanyModelType = {
  namespace: 'Service',
  state: initialState,
  effects: {
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
