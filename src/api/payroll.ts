import { request } from "./instance";

export default class Payroll {
  static getAttendance(empId: string, start: string, end: string) {
    return request({
      url: `payroll/report/${empId}?start=${start}&end=${end}`,
    });
  }
}
