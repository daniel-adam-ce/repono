import { useUsersEndpoints } from "./users";


export const useEndpoints = () => {
    const users = useUsersEndpoints();

    return {
        users,
    }
}

export default useEndpoints;
