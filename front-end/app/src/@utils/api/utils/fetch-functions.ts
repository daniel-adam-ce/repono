import { useEffect, useMemo } from "react";

export function generateAPIBaseURL(endpoint: string): string {
    // const url = process.env?.["REACT_APP_ENVIRONMENT"]?.toLowerCase() === "development" ? "http://localhost:5000" : "https://" + process.env["REACT_APP_API_URL"];
    // console.log(url);
    const url = "http://localhost:5000/api/v1/";
    return url + (endpoint[0] !== "/" ? "/" : "") + endpoint;
}

type FetchFunctionParams = {
    url: string,
    options?: {
        init?: RequestInit,
        controller?: AbortController
    }
}

export type FetchFunction = <D>({ url, options }: FetchFunctionParams) => Promise<D>



export function fetchFunction(method: string) {

    async function generatedFetchFunction<D>({ url, options }: FetchFunctionParams): Promise<D> {
        try {
            // return fetch(
            //     generateAPIBaseURL(url),
            //     {
            //         method: method,
            //         ...(options?.init ?? {}),
            //         signal: options?.init?.signal ?? options?.controller?.signal,
            //     }
            // ).then((response: any) => {
            //     if (!response.ok) {
            //         response.json().then((json: any) => {
            //             throw new Error(json.message)
            //         })
            //     }
            //     return response.json() as Promise<D>;
            // })
            const res = await fetch(
                generateAPIBaseURL(url),
                {
                    credentials: options?.init?.credentials ?? "include",
                    method: method,
                    ...(options?.init ?? {}),
                    signal: options?.init?.signal ?? options?.controller?.signal,
                }
            )
            const data = await res.json();
            if (!res.ok) {
                const errorMessage = data.message ?? "Error fetching data."
                console.log(`Error: ${errorMessage}`);
                throw new Error(errorMessage);
            }
            return data;
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
