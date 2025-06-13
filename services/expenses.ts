import axios, { AxiosResponse } from "axios";

const baseUrl = "https://expenses-981a9-default-rtdb.firebaseio.com";

export default class Expense {
  private static async handleRequest<T>(
    request: Promise<AxiosResponse<T>>
  ): Promise<T | { error: string }> {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  }

  static addExpense(data: any) {
    return this.handleRequest(axios.post(`${baseUrl}/expense.json`, data));
  }

  static getExpense() {
    return this.handleRequest(axios.get(`${baseUrl}/expense.json`));
  }

  static updateExpense(data: any, id: string) {
    return this.handleRequest(axios.put(`${baseUrl}/expense/${id}.json`, data));
  }

  static deleteExpense(id: string) {
    return this.handleRequest(axios.delete(`${baseUrl}/expense/${id}.json`));
  }
}
