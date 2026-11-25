// src/utils/slardar/transports/electronFetch.ts
import electron from "electron";
import { electronFetch } from "../../request";

export interface SlardarRequestOptions {
  url: string;
  data?: string;
  withCredentials?: boolean;
  success?: (data: unknown) => void;
  fail?: (err: unknown) => void;
}

const request = async (method: "GET" | "POST", options: SlardarRequestOptions): Promise<void> => {
  const { url, data, success, fail, withCredentials } = options;
  try {
    let userAgent = "";
    try {
      userAgent = electron.session.defaultSession.getUserAgent();
    } catch {}
    const response = await electronFetch(url, {
      method,
      body: data,
      credentials: withCredentials ? "include" : "omit",
      headers: {
        "User-Agent": userAgent,
        "Content-Type": "application/json"
      }
    });
    if (response.status >= 400) {
      throw new Error(await response.text());
    }
    const text = await response.text();
    success?.(text ? JSON.parse(text) : {});
  } catch (e) {
    fail?.(e);
  }
};

export const electronFetchTransport = {
  get(options: SlardarRequestOptions) {
    void request("GET", options);
  },
  post(options: SlardarRequestOptions) {
    void request("POST", options);
  }
};
