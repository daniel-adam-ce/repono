import { useAPI } from "../@hooks";

export function useBodylessEndpoint<D>(url: string): ((init?: RequestInit) => Promise<D | unknown>) {
    const api = useAPI();
    return async (init?: RequestInit): Promise<Response | unknown> => {
        try {
            return api.get(
                url,
                init
            ).then((response) => {
                return response.json() as Promise<D>;
            });
        } catch (error) {
            return error;
        }
    };
}

export function useBodyEndpoint<T, D>(url: string): ((body: T, init?: RequestInit) => Promise<D | unknown> )  {
    const api = useAPI();
    return async (body: T, init?: RequestInit): Promise<D | unknown> => {
        try {
            return api.post(
                url,
                {
                    ...init,
                    body: JSON.stringify(body)
                }
            ).then((response) => {
                return response.json() as Promise<D>;
            });
        } catch (error) {
            return error
        }
    };
}
