import { request } from "./instance";

export default class Banner {
  static getBanners(limit?: number, page?: number, withAssets?: boolean) {
    return request({
      url: `v1/assets/banners?limit=${limit}&page=${page}&withAssets=${withAssets}`,
    });
  }

  static updateBannerOrder(payload: any) {
    const { bannerId, sourcePosition, destinationPosition } = payload;
    return request({
      method: "patch",
      url: `v1/assets/banner/images/order/${bannerId}`,
      data: {
        sourcePosition,
        destinationPosition,
      },
    });
  }

  static createBanner({ name, images }: { images: File[]; name: string }) {
    const formData = new FormData();
    formData.append("name", name);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    return request({
      method: "post",
      url: "v1/assets/banner/create", 
      data: formData,
    });
  }

  static updateBanner(
    bannerId: string,
    payload: {
      name?: string;
      isActive?: boolean;
      isSet?: boolean;
    }
  ) {
    return request({
      url: `v1/assets/banner/${bannerId}`,
      method: "patch",
      data: payload,
    });
  }
}
