/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import api from "../lib/api";

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiMethods<T> {
  get: (url: string) => Promise<T>;
  post: (url: string, data?: any) => Promise<T>;
  put: (url: string, data?: any) => Promise<T>;
  delete: (url: string) => Promise<void>;
}

export const useApi = <T = any>(): [ApiResponse<T>, ApiMethods<T>] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(
    async (
      method: "get" | "post" | "put" | "delete",
      url: string,
      requestData?: any
    ) => {
      try {
        setLoading(true);
        setError(null);

        const methodMap = {
          get: api.get,
          post: api.post,
          put: api.put,
          delete: api.delete,
        };

        const response = await methodMap[method](url, requestData);

        setData(response.data);
        return response.data;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Erro na requisição";
        setError(errorMessage);
        console.error(
          `Erro na requisição ${method.toUpperCase()} ${url}:`,
          err
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const get = useCallback(
    (url: string) => handleRequest("get", url),
    [handleRequest]
  );
  const post = useCallback(
    (url: string, data?: any) => handleRequest("post", url, data),
    [handleRequest]
  );
  const put = useCallback(
    (url: string, data?: any) => handleRequest("put", url, data),
    [handleRequest]
  );
  const del = useCallback(
    (url: string) => handleRequest("delete", url),
    [handleRequest]
  );

  const response: ApiResponse<T> = { data, loading, error };
  const methods: ApiMethods<T> = { get, post, put, delete: del };

  return [response, methods];
};
