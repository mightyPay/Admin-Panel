//import { AxiosResponse } from "axios";
import { request } from "./instance";

export default class Perk {
  static getPerks() {
    return request({ url: "perks" });
  }

  static addPerk(name: string) {
    return request({ url: "perks", method: "post", data: { name } });
  }

  static updatePerk(id: number, name: string) {
    return request({
      url: `perks/${id}`,
      method: "patch",
      data: { name },
    });
  }

  static delete(id: string) {
    return request({ url: `perks/${id}`, method: "delete" });
  }

  static assignPerk(perkId: number, dutyId: number) {
    return request({
      url: "driver/assign-perk",
      method: "post",
      data: { perkId, dutyId },
    });
  }
}
