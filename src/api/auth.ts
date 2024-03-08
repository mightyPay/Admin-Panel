import instance, { defaultCatch, request } from "./instance";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export default class Auth {
  static login(email: string, password: string) {
    return instance.post<AuthResponse>("v1/auth/signin", { email, password });
  }

  // static logout() {
  //   return instance.post<boolean>("v1/auth/logout", {});
  // }

  static logout() {
    return request({
      method: "post",
      url: "v1/auth/logout",
    });
  }

  static register(email: string, password: string) {
    return instance.post<AuthResponse>("v1/auth/signup", { email, password });
  }

  static emailVerification(token: string) {
    return instance.get(`v1/auth/email-verification/${token}`);
  }
}
