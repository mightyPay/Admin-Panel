import { request } from "./instance";

export default class RewardRule {
  static getRewardRuleType() {
    return request({
      url: `v1/reward/type`,
    });
  }
  static getRewardRuleAmountType() {
    return request({
      url: `v1/reward/amount-type`,
    });
  }

  static getAppEvents(limit?: number, page?: number) {
    let url = "v1/reward/app-events?";

    if (limit) {
      url += `limit=${limit}&`;
    }

    if (page) {
      url += `page=${page}`;
    }

    return request({
      url,
    });
  }

  static createRewardRule(payload: any) {
    return request({
      url: `v1/reward`,
      method: "post",
      data: payload,
    });
  }

  static getRewardRules(limit?: number, page?: number, event: boolean = false) {
    let url = "v1/reward?";

    if (limit) {
      url += `limit=${limit}&`;
    }

    if (page) {
      url += `page=${page}&`;
    }

    if (event) {
      url += `events=${event}`;
    }

    return request({
      url,
    });
  }

  static toggleRewardRuleStatus(id: number, status: string) {
    return request({
      url: `v1/reward/${id}`,
      method: "patch",
      data: {
        status,
      },
    });
  }
}
