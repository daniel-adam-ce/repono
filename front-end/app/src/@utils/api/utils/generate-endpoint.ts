import { FetchFunctions, FetchResponse } from "./fetch-functions";

export interface InitWithParams<P> extends RequestInit {
    pathParams?: P
}

export type BodylessEndpoint<D, P = {}> = (init?: InitWithParams<P>) => Promise<FetchResponse<D>>
// : Promise<FetchResponse<D>> 
export type BodyEndpoint<T, D> = (body: T, init?: RequestInit) => Promise<D | unknown> 

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

// export function useBodyEndpoint<T, D>(url: string): BodyEndpoint<T, D>  {
//     return async (body: T, init?: RequestInit): Promise<D | unknown> => {
//         try {
//             return FetchFunctions.post(
//                 url,
//                 {
//                     init: {
//                         ...init,
//                         body: JSON.stringify(body)
//                     }
//                 }
                
//             ).then((response: any) => {
//                 return response.json() as Promise<D>;
//             });
//         } catch (error) {
//             return error
//         }
//     };
// }
