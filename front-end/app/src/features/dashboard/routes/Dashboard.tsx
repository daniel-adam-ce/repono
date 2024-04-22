import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints } from '../../../@utils';
import { AuthContext, AuthContextType } from '../../../providers';
import { HouseContext, HouseContextType } from '../../../providers/house';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

const useHouseMutation = () => {
    const queryClient = useQueryClient();
    const auth = useContext<AuthContextType>(AuthContext);
    const query = useMutation({
        mutationFn: async (newHouse: any) => {
            const res = await Endpoints.house.create({house: newHouse});

            if (!res.ok) {
                console.log(res);
                // if (res.status === 401) auth.logout();
                // console.log(`Error: ${errorMessage}`);
                throw new Error((await res.json() as any).message);
            }
            queryClient.invalidateQueries({queryKey: ["getHouses"]})
            return res.json();
        }
    })

    return query;
}

export const Dashboard = () => {
    const auth = useContext<AuthContextType>(AuthContext);
    const house = useContext<HouseContextType>(HouseContext);
    const createHouse = useHouseMutation();
    const [newHouse, setNewHouse] = useState<{house_name: string}>({house_name: ""});

    return (
        <div>
            <div>
                houses:
                {
                    house.houses.map(($house) => {
                        return (
                            <div
                                onClick={() => {
                                    house.test({type: "set", id: $house.house_id})
                                }}
                                style={{
                                    cursor: "pointer"
                                }}
                                key={$house.house_id}
                            >
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
