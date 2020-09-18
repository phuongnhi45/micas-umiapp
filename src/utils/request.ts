import { request } from 'umi';
import { APIConst } from '@/config';

const API_HOST = 'http://micasvn.ddns.net:9999';

const serializeObject = (obj: any) => {
  const str: string[] = [];
  for (const p in obj) {
    if (typeof obj[p] === 'object' && obj[p].length) {
      for (const i in obj[p]) {
        if (Object.prototype.hasOwnProperty.call(obj[p], i)) {
          str.push(
            `${encodeURIComponent(p)}[]=${encodeURIComponent(obj[p][i])}`,
          );
        }
      }
    } else if (typeof obj[p] === 'object') {
      for (const k in obj[p]) {
        if (Object.prototype.hasOwnProperty.call(obj[p], k)) {
          str.push(
            `${encodeURIComponent(p)}[${k}]=${encodeURIComponent(obj[p][k])}`,
          );
        }
      }
    } else {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
};

const call = async (
  url: string,
  options: any,
): Promise<{ data: any; err: any }> => {
  // Skip auto error handler
  options.skipErrorHandler = true;

  if (!options.method) {
    options.method = APIConst.methods.get;
  }

  if (options.query) {
    url += `?${serializeObject(options.query)}`;
  }

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
