import axios, { AxiosInstance, AxiosResponse } from "axios";

const axisInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.35:8080/auth/",
});

export default class Auth {
  private static async handleRequest<T>(request: Promise<AxiosResponse<T>>) {
    try {
      const response = await request;

      return response;
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : {
                message: "An unexpected error occurred",
              },
      };
    }
  }

  static login(data: any) {
    return this.handleRequest(axisInstance.post("login", { data: data }));
  }
}
