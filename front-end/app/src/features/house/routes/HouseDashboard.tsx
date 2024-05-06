import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Endpoints } from '../../../@utils';
import { HouseContext, HouseContextType } from '../../../providers/house';
import { useParams } from 'react-router-dom';

const useHouseMutation = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: async (newHouse: any) => {
            const res = await Endpoints.house.create({house: newHouse});

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            queryClient.invalidateQueries({queryKey: ["getHouses"]})
            return res.json();
        }
    })

    return query;
}

export const Dashboard = () => {
    const house = useContext<HouseContextType>(HouseContext);
    const createHouse = useHouseMutation();
    const [newHouse, setNewHouse] = useState<{house_name: string}>({house_name: ""});
    const params = useParams();
    console.log(params);

    return (
        <div>
            test
        </div>
    );
};

export default Dashboard;
