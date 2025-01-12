import { Endpoints, ErrorResponseJSON } from "@/@utils";
import { AuthContext } from "@/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useItemCreateMutation = () => {
    const queryClient = useQueryClient();
    const { houseId } = useParams();
    const query = useMutation({
        mutationFn: async (newItem: any) => {
            const res = await Endpoints.houses.items.create({ item: newItem }, { pathParams: { houses: houseId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getItems"], refetchType: "all" })
        }
    })

    return {
        mutate: query.mutate,
        isPending: query.isPending,
    };
}

export const useItemUpdateMutation = () => {
    const queryClient = useQueryClient();
    const { houseId, roomId, itemId } = useParams();
    const query = useMutation({
        mutationFn: async (newItem: any) => {
            const res = await Endpoints.houses.items.update({ item: newItem }, { pathParams: { houses: houseId, rooms: roomId, items: itemId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getItems"], refetchType: "all" })
        }
    })

    return query;
}

export const useItemDeleteMutation = () => {
    const queryClient = useQueryClient();
    const { houseId, roomId, itemId } = useParams();
    const navigate = useNavigate();
    const query = useMutation({
        mutationFn: async () => {
            const res = await Endpoints.houses.items.delete({ }, { pathParams: { houses: houseId, rooms: roomId, items: itemId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getItems"], refetchType: "all" })
            navigate(`/house/${houseId}/items`)
        }
    })

    return query;
}

export const useItem = () => {
    const auth = useContext(AuthContext);
    const { houseId, roomId, itemId } = useParams();
    const { data, error, ...queryResponse } = useQuery({
        queryKey: ['getItem', itemId],
        queryFn: async () => {
            const res = await Endpoints.houses.items.fetch({ pathParams: { houses: houseId, rooms: roomId, items: itemId } });
            if (!res.ok) {
                throw new Error((await res.json() as ErrorResponseJSON).message);
            }
            return res.json();
        },
        enabled: !!itemId && !!auth.user,
        retry: false,

    })

    if (error && queryResponse) {
        console.log(error, queryResponse);
    }

    return { item: data, isPending: queryResponse.isPending, error }
}

export const useItems = () => {
    // const auth = useContext(AuthContext);
    // const user = auth.user
    const { houseId } = useParams();
    const { data, isPending, error, ...queryResponse } = useQuery({
        queryKey: ['getItems', houseId],
        queryFn: async () => {
            const res = houseId
                ? await Endpoints.houses.items.fetchAll({ pathParams: { houses: houseId } })
                : await Endpoints.items.fetchAll();
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

    return { items: data ?? [], isPending, error }
}
