import { FetchFunctions } from "./fetch-functions";

export type BodylessEndpoint<D> = (init?: RequestInit) => Promise<D>
export type BodyEndpoint<T, D> = (body: T, init?: RequestInit) => Promise<D | unknown> 

export function bodylessEndpoint<D>(url: string): BodylessEndpoint<D> {
    return async (init?: RequestInit): Promise<D> => 
        FetchFunctions.get<D>(
            {
                url,
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
