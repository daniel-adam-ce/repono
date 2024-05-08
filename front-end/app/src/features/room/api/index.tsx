import { Endpoints, ErrorResponseJSON } from "@/@utils";
import { AuthContext } from "@/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const useRoomMutation = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: async (newRoom: any) => {
            const res = await Endpoints.room.create({room: newRoom});

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            queryClient.invalidateQueries({queryKey: ["getHouses"]})
            return res.json();
        }
    })

    return query;
}

export const useRoom = () => {
    const auth = useContext(AuthContext);
    const params = useParams();
    const roomId = params?.roomId
    const { data, error, ...queryResponse } = useQuery({
        queryKey: ['getRoom', roomId],
        queryFn: async () => {
            const res = await Endpoints.room.fetch({ pathParams: roomId });
             if (!res.ok) {
                throw new Error((await res.json() as ErrorResponseJSON).message);
            }
            return res.json();
        },
        enabled: !!roomId && !!auth.user,
        retry: false,
        
    })

    if (error && queryResponse) {
        console.log(error, queryResponse);
    }

    return { room: data, error } 
}

export const useRooms = () => {
    const auth = useContext(AuthContext);
    const user = auth.user
    const { data, isPending, error, ...queryResponse } = useQuery({
        queryKey: ['getRooms'],
        queryFn: async () => {
            const res = await Endpoints.room.fetchAll();
             if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }
            return res.json();
        },
        enabled: !!user,
        retry: false,
        
    })

    if (error && queryResponse) {
        console.log(error, queryResponse);
    }

    return { rooms: data ?? [], isPending, error } 
}
