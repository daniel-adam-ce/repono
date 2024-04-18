import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Dashboard = () => {
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        const response = await fetch(
            "http://localhost:5000/api/v1/users", 
            {
                credentials: "include"
            }
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
    },
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
      {/* <button
        onClick={() => {
          validateSession()
        }}
      >test2</button> */}
    </div>
  );
};

export default Dashboard;