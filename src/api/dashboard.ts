import { request } from "./instance";

export default class Dashboard {
  static getMetrics(duration: string) {
    return request({
      url: `v1/dashboard/metrics?duration=${duration}`,
    });
  }
  static getActiveUserCount(){
    return request({
      url:"v1/users/get-active-users",
    })
  }
}

