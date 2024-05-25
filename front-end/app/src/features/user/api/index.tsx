import { Endpoints } from "@/@utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useUsers = () => {
    // const auth = useContext(AuthContext);
    // const user = auth.user
    const { houseId } = useParams();
    const { data, isPending, error, ...queryResponse } = useQuery({
        queryKey: ['getUsers', houseId],
        queryFn: async () => {
            const res = await Endpoints.houses.users.fetchAll({pathParams: {houses: houseId}});
             if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }
            return res.json();
        },
        retry: false,
        
    })

    if (error && queryResponse) {
        console.log(error, queryResponse);
    }

    return { users: data ?? [], isPending, error } 
}