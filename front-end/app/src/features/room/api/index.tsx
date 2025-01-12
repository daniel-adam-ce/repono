import { Endpoints, ErrorResponseJSON } from "@/@utils";
import { AuthContext } from "@/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useRoomCreateMutation = () => {
    const queryClient = useQueryClient();
    const { houseId } = useParams();
    const query = useMutation({
        mutationFn: async (newRoom: any) => {
            const res = await Endpoints.houses.rooms.create({ room: newRoom }, { pathParams: { houses: houseId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getRooms"], refetchType: "all" })
        }
    })

    return query;
}

export const useRoomUpdateMutation = () => {
    const queryClient = useQueryClient();
    const { houseId, roomId } = useParams();
    const query = useMutation({
        mutationFn: async (newRoom: any) => {
            const res = await Endpoints.houses.rooms.update({ room: newRoom }, { pathParams: { houses: houseId, rooms: roomId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getRooms"], refetchType: "all" })
        }
    })

    return query;
}

export const useRoomDeleteMutation = () => {
    const queryClient = useQueryClient();
    const { houseId, roomId } = useParams();
    const navigate = useNavigate()
    const query = useMutation({
        mutationFn: async () => {
            const res = await Endpoints.houses.rooms.delete({}, { pathParams: { houses: houseId, rooms: roomId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getRooms"], refetchType: "all" })
            navigate(`/house/${houseId}/rooms`)
        }
    })

    return query;
}

export const useRoom = () => {
    const auth = useContext(AuthContext);
    const { houseId, roomId } = useParams();
    const { data, error, ...queryResponse } = useQuery({
        queryKey: ['getRoom', roomId],
        queryFn: async () => {
            const res = await Endpoints.houses.rooms.fetch({ pathParams: { houses: houseId, rooms: roomId } });
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

    return { room: data, isPending: queryResponse.isPending, error }
}

// export const useRooms = () => {
//     // const auth = useContext(AuthContext);
//     // const user = auth.user
//     const { houseId } = useParams();
//     const { data, isPending, error, ...queryResponse } = useQuery({
//         queryKey: ['getRooms', houseId],
//         queryFn: async () => {
//             const res = await Endpoints.houses.rooms.fetchAll({ pathParams: { houses: houseId } });
//             if (!res.ok) {
//                 throw new Error((await res.json() as any).message);
//             }
//             return res.json();
//         },
//         retry: false,

//     })

//     if (error && queryResponse) {
//         console.log(error, queryResponse);
//     }

//     return { rooms: data ?? [], isPending, error }
// }

export * from "./useRooms";