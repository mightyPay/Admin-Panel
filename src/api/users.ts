import { request } from "./instance";

export default class Users {
  static getUsersV1(
    limit?: number,
    page?: number,
    searchObj?: { key: string; value: string },
    role?: string
  ) {
    let url = `/v1/users?limit=${limit}&page=${page}`;

    if (searchObj && searchObj?.value) {
      url += `&${searchObj?.key}=${searchObj?.value}`;
    }

    if (role) {
      url += `&role=${role}`;
    }

    return request({
      method: "get",
      url,
    });
  }

  static getPaymentTokenDetails(token: string) {
    return request({
      method: "get",
      url: `/v1/users/get-payment-page-details/${token}`,
    });
  }

  static getUserTransactionV1({
    limit,
    page,
    accountId,
    transactionId,
    type,
  }: any) {
    let url = `/v1/users/transactions?limit=${limit}&page=${page}&accountId=${accountId}&type=${type}`;

    if (transactionId) {
      url += `&transactionId=${transactionId}`;
    }

    return request({
      method: "get",
      url,
    });
  }

  static getUserRolesV1() {
    return request({
      url: `v1/users/roles`,
    });
  }

  static createUser(payload: any) {
    return request({
      url: `v1/users`,
      method: "post",
      data: payload,
    });
  }
}
