import { FetchFunctions, FetchResponse } from "./fetch-functions";

interface ParamObj {
    [key: string]: any
}

export interface InitWithParams<P extends ParamObj> extends RequestInit {
    pathParams?: P
}

export type BodylessEndpoint<D, P extends ParamObj = {}> = (init?: InitWithParams<P>) => Promise<FetchResponse<D>>
// : Promise<FetchResponse<D>> 
export type BodyEndpoint<D, B, P extends ParamObj = {}> = (body: B, init?: InitWithParams<P>) => Promise<FetchResponse<D>>

const generateParamUrl = (url: string, pathParams: ParamObj | undefined): string => {
    let parsedUrl = "";
    if (pathParams) {
        if (Object.keys(pathParams).length > 0) {
            const endpoints = url.replace("/", "").split("/");
            // console.log(endpoints);
            parsedUrl = endpoints.reduce(($url, endpoint) => {
                const pathParam = pathParams?.[endpoint];
                // console.log("pathParam", $url, endpoint, pathParam)
                return $url + `/${endpoint}` + (pathParam ? `/${pathParam}` : "")
            }, "") 
        }
    } else {
        parsedUrl = url
    }
    return parsedUrl;
}

export function bodylessEndpoint<D, P extends ParamObj = {}>(url: string) {
    return async (init?: InitWithParams<P>): Promise<FetchResponse<D>> => {
        
        return (
            FetchFunctions.get<D>(
                {
                    // url: `${url}${init?.pathParams ? `/${init?.pathParams}` : ""}`,
                    url: generateParamUrl(url, init?.pathParams),
                    options: {
                        init
                    }
                }
            )
        )
    }
        
}

export function bodyEndpoint<D, B, P extends ParamObj = {}>(url: string,): BodyEndpoint<D, B, P> {
    return async (body: B, init?: InitWithParams<P>): Promise<FetchResponse<D>> => {


        return FetchFunctions.post(
            {
                url: generateParamUrl(url, init?.pathParams),
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

// this is bad
export function bodyEndpointPatch<D, B, P extends ParamObj = {}>(url: string,): BodyEndpoint<D, B, P> {
    return async (body: B, init?: InitWithParams<P>): Promise<FetchResponse<D>> => {
        return FetchFunctions.patch(
            {
                url: generateParamUrl(url, init?.pathParams),
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