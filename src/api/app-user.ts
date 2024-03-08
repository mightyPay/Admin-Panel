//import { AxiosResponse } from "axios";
import { request } from "./instance";
import { IAddAppUser, IUpdateAppUser } from "./interfaces";

export default class AppUser {
  static getUsers() {
    return request({ url: "auth/app-users" });
  }

  static addUser(data: IAddAppUser) {
    return request({ url: "auth/app-users", method: "post", data });
  }

  static updateUser(data: IUpdateAppUser) {
    const id = data.id;
    const payload: { [key: string]: any } = {};

    if (data.email !== undefined) payload["email"] = data.email;
    if (data.phone !== undefined) payload["phone"] = data.phone;
    if (data.isActive !== undefined) payload["isActive"] = data.isActive;
    if (data.role !== undefined) payload["role"] = data.role;
    if (data.profileId !== undefined) payload["profileId"] = data.profileId;
    if (data.vendorId !== undefined) payload["vendorId"] = data.vendorId;
    if (data.name !== undefined) payload["name"] = data.name;

    return request({
      url: `auth/users/${id}`,
      method: "patch",
      data: payload,
    });
  }

  static deleteUser(id: string | null) {
    return request({ url: `auth/app-users/${id}`, method: "delete" });
  }
}
