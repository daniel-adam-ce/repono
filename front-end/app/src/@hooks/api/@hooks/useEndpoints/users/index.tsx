import { useBodylessEndpoint } from "../../../@utils";


const baseURL = "/users"

const useUsersEndpoints = () => {
    // const create = generateBodyEndpoint<{roleName: string}, any>(baseURL + "/create");
    const view = useBodylessEndpoint<Array<any>>(baseURL + "");

    return {
        // create,
        view,
    }
}

export {
    baseURL,
    useUsersEndpoints
};