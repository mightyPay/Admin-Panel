export const RELEASE_VERSION = "1.0.0";

export const _Environments: { [key: string]: any } = {
  production: {
    env: "production",
    baseUrl: "https://dev.perfumecart.ae/api/",
    release: RELEASE_VERSION,
  },
  development: {
    env: "development",
    baseUrl: "https://dev.perfumecart.ae/api/",
    release: RELEASE_VERSION,
    logs: true,
  },
};

const env = process.env.ENV || "development";
export default () => {
  return _Environments[env];
};

export const driverImageUrl = `${_Environments[env].baseUrl}driver/profile-image?name=`;
