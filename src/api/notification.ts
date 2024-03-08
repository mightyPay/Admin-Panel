import { request } from "./instance";

export default class Notification {
  static getMessageTemplate(
    limit: number,
    page: number,
    events: boolean = false
  ): any {
    let url = `v1/notification/templates?events=${events}&`;

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
  static getMessageTemplateType() {
    return request({
      url: "v1/notification/template-type",
    });
  }

  static createMessageTemplate(payload: {
    name: string;
    template: string;
    type: string;
    eventId: number;
  }) {
    return request({
      method: "post",
      url: "v1/notification/templates",
      data: payload,
    });
  }
}
