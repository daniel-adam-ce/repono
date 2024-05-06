import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Endpoints } from '../../../@utils';
import { HouseContext, HouseContextType } from '../../../providers/house';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '@/providers';

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
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fill, 150px)",
                    alignItems: "center",
                }}
            >
                {
                    auth.houses.map((house) => {
                        return (
                            <div
                                onClick={() => {
                                    navigate(`/house/${house.house_id}`)
                                }}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "4px",
                                    boxShadow: "0px 2px 1px -5px rgba(0,0,0,.2), 0px 1px 1px 0px rgba(0,0,0,.14), 0px 1px 3px 0px rgba(0,0,0,.12)",
                                    cursor: "pointer"
                                }}
                                key={house.house_id}
                            >
                                {
                                    `${house.house_id}-${house.house_name}`
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Dashboard;
