import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";

export function generateAPIBaseURL(endpoint: string): string {
    // const url = process.env?.["REACT_APP_ENVIRONMENT"]?.toLowerCase() === "development" ? "http://localhost:5000" : "https://" + process.env["REACT_APP_API_URL"];
    // console.log(url);
    const url = "http://localhost:5000/api/v1";
    return url + (endpoint[0] !== "/" ? "/" : "") + endpoint;
}

type FetchFunctionParams = {
    url: string,
    options?: {
        init?: RequestInit,
        controller?: AbortController
    }
}

export type FetchFunction = <D>({ url, options }: FetchFunctionParams) => Promise<FetchResponse<D>>

export type ErrorResponseJSON = {
    code: number,
    message: string,
    date: Date
}

export interface FetchResponse<D> extends Response {
    json: () => Promise<D>
}

export function fetchFunction(method: string) {

    async function generatedFetchFunction<D>({ url, options }: FetchFunctionParams): Promise<FetchResponse<D>> {
        try {
            console.log(url);
            const res = fetch(
                generateAPIBaseURL(url),
                {
                    credentials: options?.init?.credentials ?? "include",
                    method: method,
                    ...(options?.init ?? {}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: options?.init?.signal ?? options?.controller?.signal,
                }
            )
            return res.then(($res) => {
                if ($res.status === 401 && !$res.url.includes("/session")) {
                    Cookies.remove("token");
                    window.location.href = "/login";
                }
                return $res;
            });
        } catch (error) {
            throw error;
        }
    }
    return generatedFetchFunction;
}

class FetchFunctionsAPI {
    get: FetchFunction;
    post: FetchFunction;
    put: FetchFunction;
    patch: FetchFunction;
    delete: FetchFunction;

    constructor() {
        this.get = fetchFunction("get");
        this.post = fetchFunction("post");
        this.put = fetchFunction("put");
        this.patch = fetchFunction("patch");
        this.delete = fetchFunction("delete");
    }

}

export const FetchFunctions = new FetchFunctionsAPI()
