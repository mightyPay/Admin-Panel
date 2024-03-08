//import { AxiosResponse } from "axios";
import { request } from "./instance";
import {
  IAddDriverData,
  IStartDuty,
  IStopCurrDuty,
  IStopDuty,
} from "./interfaces";

export interface IDriver {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isActive: boolean;
  profile?: string | null;
}

export interface IDuty {
  id: number;
  start: Date;
  end: Date | null;
  active: boolean;
  driverId: string;
  perks?: any;
}

export interface IUpdateDuty {
  id: number;
  updateData: Partial<Omit<IDuty, "id">>;
}

export default class Driver {
  static addDriver(data: IAddDriverData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("empId", data.empId);
    formData.append("phone", data.phone);

    if (data.departMentId) {
      formData.append("departMentId", data.departMentId);
    }

    if (data.profile) {
      formData.append("file", data.profile);
    }

    return request({ url: `driver`, method: "post", data: formData });
  }

  static updateDriver(data: any) {
    const formData = new FormData();

    for (const key in data) {
      if (key === "id") continue;
      if (data[key]) formData.append(key, data[key]);
    }

    return request({
      url: `driver/update/${data.id}`,
      method: "patch",
      data: formData,
    });
  }

  static addPerk(name: string) {
    return request({ url: "driver/add-perk", method: "post", data: { name } });
  }

  static startDuty(data: IStartDuty) {
    return request({ url: "driver/start-duty", method: "post", data });
  }

  static endCurrDuty(data: IStopCurrDuty) {
    return request({
      url: "driver/end-curr-duty",
      method: "patch",
      data,
    });
  }

  static checkDuty(driverId: string) {
    return request({ url: `driver/check-duty?driverId=${driverId}` });
  }

  static assignPerk(name: string, dutyId: number, driverId: string) {
    return request({
      url: `driver/assign-perk`,
      method: "post",
      data: { name, dutyId, driverId },
    });
  }

  static allDriver() {
    return request({ url: "driver" });
  }

  static getDayDuties(date: string) {
    return request({ url: `driver/track-day-wise-drivers?day=${date}` });
  }

  static updateDuty(data: IUpdateDuty) {
    return request({
      url: `driver/update-duty/${data.id}`,
      method: "patch",
      data: data.updateData,
    });
  }

  static delete(id: string) {
    return request({
      url: `driver/${id}`,
      method: "delete",
    });
  }
}
