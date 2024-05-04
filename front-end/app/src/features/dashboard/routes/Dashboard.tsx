import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Endpoints } from '../../../@utils';
import { HouseContext, HouseContextType } from '../../../providers/house';

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

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                houses:
                {
                    house.houses.map(($house) => {
                        return (
                            <div
                                onClick={() => {
                                    house.test({type: "set", id: $house.house_id})
                                }}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: 'skyblue',
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                key={$house.house_id}
                            >
                                <div
                                    style={{
                                        fontSize: "5rem"
                                    }}
                                >
                                    test
                                </div>
                                {JSON.stringify($house)}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                house: 
                {
                    JSON.stringify(house.house)
                }
            </div>
            <br/>
            <div>
                <input
                    placeholder='house name'
                    value={newHouse.house_name}
                    onChange={(e) => {
                        setNewHouse({...newHouse, house_name: e.currentTarget.value})
                    }}
                />
                <button
                    onClick={() => {
                        createHouse.mutate(newHouse);
                    }}
                >
                    create
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
