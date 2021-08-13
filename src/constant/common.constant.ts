import moment from 'moment';

export class CommonHelper {
  static isPast(value) {
    return moment().isAfter(moment(value), 'day');
  }

  static delayCallApi(func) {
    setTimeout(() => {
      func();
    }, DELAY_RETRIEVE_DATA_TIME)
  }

  static isWeekend(value) {
    const day = (new Date(value)).getDay();
    return day === 6 || day === 0;
  }

  static isToday(value) {
    const today = moment().format(SERVER_FORMAT_DATETIME.DATE);
    return today === moment(value).format(SERVER_FORMAT_DATETIME.DATE);
  }
}
