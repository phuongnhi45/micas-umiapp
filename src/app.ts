import { RequestConfig } from 'umi';

export function render(oldRender: Function) {
  // TODO: depend on window.location.hostname set data theme for css varibale
  // document.documentElement.setAttribute('data-theme', 'mbbank');
  oldRender();
}

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData, ctx) => {
      return {
        ...resData,
        success: resData.code === 1,
        errorMessage: resData.message,
      };
    },
  },
};
