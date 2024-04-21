import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints } from '../../../@utils';
import { AuthContext, AuthContextType } from '../../../providers';
import { HouseContext, HouseContextType } from '../../../providers/house';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Dashboard = () => {
    const auth = useContext<AuthContextType>(AuthContext);
    const house = useContext<HouseContextType>(HouseContext);

    return (
        <div>
            <div>
                houses:
                {
                    house.houses.map(($house) => {
                        return (
                            <div
                                onClick={() => {
                                    house.test({type: "set", id: $house.user_id})
                                }}
                                style={{
                                    cursor: "pointer"
                                }}
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
        </div>
    );
};

export default Dashboard;
