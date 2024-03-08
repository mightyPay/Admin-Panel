import { AxiosResponse } from "axios";
import { request } from "./instance";

export default class department {
  static getDepartMents() {
    return request({ url: "department" });
  }

  static addDepartment(name: string) {
    return request({ url: "department", method: "post", data: { name } });
  }

  static updateDepartment(id: number | null, name: string) {
    return request({
      url: `department/${id}`,
      method: "patch",
      data: { name },
    });
  }

  static delete(id: string | null) {
    return request({
      url: `department/${id}`,
      method: "delete",
    });
  }
}
