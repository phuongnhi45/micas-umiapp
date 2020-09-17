import { request } from 'umi';
import { APIConst } from '@/config';

const API_HOST = 'http://micasvn.ddns.net:9999';

// serialize = function(obj) {
//   var str = [];
//   for (var p in obj)
//     if (obj.hasOwnProperty(p)) {
//       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//     }
//   return str.join("&");
// }

const call = async (
  url: string,
  options: any,
): Promise<{ data: any; err: any }> => {
  // Skip auto error handler
  options.skipErrorHandler = true;

  if (!options.method) {
    options.method = APIConst.methods.get;
  }

  // if (options.query && options.method==='get') {
  //   const queryString=serialize(option.query)
  //   url +=`${queryString}`
  // }

  try {
    const data = await request(API_HOST + url, options);
    return { data, err: null };
  } catch (err) {
    return { err: err.data?.message || err.message, data: null };
  }
};

export default {
  call,
};
