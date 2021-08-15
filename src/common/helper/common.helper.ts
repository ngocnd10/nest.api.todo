import moment from 'moment';
import { ISO_8601_DATE_ONLY, REG_EMAIL } from '@common/constant';
import { v4 as uuidv4 } from 'uuid';

export class CommonHelper {
  static createUuid() {
    return uuidv4();
  }

  static async sleep(second = 1) {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(null);
      }, second * 1000);
    });
    return null;
  }

  static isPast(value: any): boolean {
    return moment().isAfter(moment(value), 'day');
  }

  static isWeekend(value: any): boolean {
    const day = new Date(value).getDay();
    return day === 6 || day === 0;
  }

  static isToday(value: any): boolean {
    const today = moment().format(ISO_8601_DATE_ONLY);
    return today === moment(value).format(ISO_8601_DATE_ONLY);
  }

  static dateStringDiffInDays(a: any, b: any): number {
    return moment.utc(a, moment.ISO_8601).diff(moment.utc(b, moment.ISO_8601), 'days');
  }

  static capitalizeFirstChar(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static deCapitalizeFirstChar(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  static isEmail(email: string): boolean {
    return !!REG_EMAIL.test(email);
  }

  static strAfter(str: string, substr: string): string {
    return str.split(substr)[1];
  }

  static strBefore(str: string, substr: string): string {
    return str.split(substr)[0];
  }
}
