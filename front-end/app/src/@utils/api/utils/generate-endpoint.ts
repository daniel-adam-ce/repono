import { FetchFunctions, FetchResponse } from "./fetch-functions";

export interface InitWithParams<P> extends RequestInit {
    pathParams?: P
}

export type BodylessEndpoint<D, P = {}> = (init?: InitWithParams<P>) => Promise<FetchResponse<D>>
// : Promise<FetchResponse<D>> 
export type BodyEndpoint<D, B> = (body: B, init?: RequestInit) => Promise<FetchResponse<D>>

export function bodylessEndpoint<D, P = {}>(url: string) {
    return async (init?: InitWithParams<P>): Promise<FetchResponse<D>> =>
        FetchFunctions.get<D>(
            {
                url: `${url}${init?.pathParams ? `/${init?.pathParams}` : ""}`,
                options: {
                    init
                }
            }
        )
}

export function bodyEndpoint<D, B>(url: string,): BodyEndpoint<D, B> {
    return async (body: B, init?: RequestInit): Promise<FetchResponse<D>> => {
        return FetchFunctions.post(
            {
                url,
                options: {
                    init: {
                        ...init,
                        body: JSON.stringify(body)
                    }
                }
            }
        )
    };
}
