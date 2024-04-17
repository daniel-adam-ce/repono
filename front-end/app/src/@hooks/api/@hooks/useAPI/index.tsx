import { useContext, useEffect } from "react";

export function generateAPIBaseURL(endpoint: string): string {
	// const url = process.env?.["REACT_APP_ENVIRONMENT"]?.toLowerCase() === "development" ? "http://localhost:5000" : "https://" + process.env["REACT_APP_API_URL"];
    // console.log(url);
    const url = "http://localhost:5000" + "/api/v1/";
	return url + (endpoint[0] !== "/" ? "/" : "") + endpoint;
}

export type APIFetchType = (url: string, init?: RequestInit) => Promise<any>;

export interface APIHookType {
    get: APIFetchType
    post: APIFetchType,
    put: APIFetchType,
    patch: APIFetchType,
    delete: APIFetchType,
    
}

const fetchFunction = (method: string, controller: AbortController) => {
    return async (url: string, init?: RequestInit): Promise<any> => {
        try {
            return fetch(
                generateAPIBaseURL(url),
                {
                    method: method,
                    ...init,
                    signal: init?.signal ?? controller.signal,
                }
            )
            // .catch(checkForFailAuth);
        } catch (error) {
            return error;
        }
    }
}

export const useAPI = (): APIHookType => {
    // const authContext = useContext(AuthContext);
    const controller = new AbortController();

    const checkForFailAuth = (_error: any) => {
        // console.log(error, error?.response?.data?.error);
        // if (error?.response?.status === 403 && error?.response?.data?.error === "Session expired.") {
        //     return authContext.failAuth().then(() => {
        //         return {
        //             data: {
        //                 error: "24 hour session expired. Please log back in."
        //             }
        //         }
        //     });
        // } else {
        //     throw error;
        // }
    }

    useEffect(() => {
        return () => {
            controller.abort();
        }
    }, [])

    return {
        get: fetchFunction("get", controller),
        post: fetchFunction("post", controller),
        put: fetchFunction("put", controller),
        patch: fetchFunction("patch", controller),
        delete: fetchFunction("delete", controller)
    }
}

export default useAPI;