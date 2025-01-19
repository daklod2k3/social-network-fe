import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface IApiResponse<T> {
  status: number;
  data: T;
  error: string;
}

const baseUrl = String(process.env.API_URL) || "/api";
export const enum ApiRoutes {
  Login = "/auth/login",
  Register = "/auth/register",
  Profile = "/profile",
  Session = "/auth/session",
}

export interface GetProps {
  id?: string;
  search?: string;
  includes?: string;
  filter?: string;
}
export class ApiAuth {
  public token;
  protected route;
  public baseUrl = baseUrl;

  constructor(cookies: ReadonlyRequestCookies, route?: ApiRoutes | string) {
    this.token = getAccessToken(cookies);
    this.route = baseUrl + route;
  }

  async get({ id, search, includes }: GetProps) {
    let path = this.route + (id ? `/${id}` : "");
    const params = new URLSearchParams(search);
    if (includes) params.append("includes", includes);
    if (search || params.size > 0) path += `?${params.toString()}`;
    console.log(path);
    const res = fetch(path, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${await this.token}`,
      },
    });
    // if ((await res).status === 403)
    return res;
  }

  async post(data: any) {
    const res = fetch(this.route, {
      headers: {
        Authorization: `Bearer ${await this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
    // if ((await res).status === 403) throw new Error("Permission denied");
    return res;
  }

  async put(data: any) {
    const res = fetch(this.route, {
      credentials: "include",

      headers: {
        Authorization: `Bearer ${await this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    // if ((await res).status === 403) throw new Error("Permission denied");
    return res;
  }

  async patch(id, data: any) {
    const res = fetch(this.route + `/${id}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${await this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json-patch+json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });
    // if ((await res).status === 403) throw new Error("Permission denied");
    return res;
  }

  async delete(id: any) {
    const res = fetch(this.route + `/${id}`, {
      credentials: "include",

      headers: {
        Authorization: `Bearer ${await this.token}`,
      },
      method: "DELETE",
    });
    // if ((await res).status === 403) throw new Error("Permission denied");
    return res;
  }
}

// export enum FilterOperators {
//   eq = "eq",
//   neq = "neq",
//   lt = "lt",
//   lte = "lte",
//   gt = "gt",
//   gte = "gte",
//   ctn = "ctn",
// }

// export enum FilterLogic {
//   And = "And",
//   Or = "Or",
// }
// export class Filter<T = any> {
//   public field: keyof T;
//   public operator: FilterOperators;
//   public value: T[keyof T];
//   public logic?: FilterLogic = FilterLogic.And;
//   public filters?: Filter[];

//   constructor({
//     Field,
//     Operator,
//     Value,
//     Logic = FilterLogic.And,
//     Filters = [],
//   }) {
//     this.field = Field;
//     this.operator = Operator;
//     this.value = Value;
//     this.logic = Logic;
//     this.filters = Filters;
//   }
// }

// export class RootFilter {
//   public filters: Filter[];
//   public logic?: FilterLogic;
//   constructor({ Filters, Logic = FilterLogic.And }) {
//     this.filters = Filters;
//     this.logic = Logic;
//   }
// }

async function getAccessToken(cookies: ReadonlyRequestCookies) {
  return cookies.get("access_token")?.value;
}
