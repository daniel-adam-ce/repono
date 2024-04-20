import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints } from '../../../@utils';
import { AuthContext, AuthContextType } from '../../../providers';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useContext<AuthContextType>(AuthContext);

  const { data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: Endpoints.users.view,
    enabled: false
  })

  return (
    <div>
      dashboard
      <button
        onClick={() => {
          refetch()
        }}
      >test</button>
      {
        JSON.stringify(data)
      }
      <button
        onClick={() => {
          // document.cookie
          auth.logout();
        }}
      >logout</button>
      {
        JSON.stringify(document.cookie)
      }
    </div>
  );
};

export default Dashboard;