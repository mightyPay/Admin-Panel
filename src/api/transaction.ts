import { request } from "./instance";
import { GetAllTransaction } from "./interfaces";

export default class Transaction {
  static getTransaction(payload: GetAllTransaction) {
    return request({
      method: "get",
      url: `v1/wallet/all-tr?startDate=${payload.startDate}&endDate=${payload.endDate}&limit=${payload.limit}&page=${payload.page}`,
    });
  }
}
