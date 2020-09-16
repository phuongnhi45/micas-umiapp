import * as moment from 'moment';

/**
 * Format ISODate to date and time
 *
 * @param {Date} value date need to be format
 */
const date = (value: string) => {
  if (!value) {
    return '';
  }

  return moment(value).format('DD/MM/YYYY, HH:mm');
};

export default {
  date,
};
