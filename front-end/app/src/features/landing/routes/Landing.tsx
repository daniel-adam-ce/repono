import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Endpoints } from '../../../@utils/api/endpoints';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Landing = () => {
  const navigate = useNavigate();
  const { data: data, refetch: refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await Endpoints.users.view();
      return res;
    },
    enabled: false,
    refetchOnMount: false
  })

  const { data: data2, refetch: refetch2 } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await Endpoints.session.getSession();
      return res;
    },
    enabled: false,
    refetchOnMount: false
  })

  

  return (
    <div>
      landing
      <button
        onClick={() => {
          navigate("/auth/login")
        }}
      >login</button>
      
      <button
        onClick={ () => {

          refetch();
        }
        }
      >test</button>

      {JSON.stringify(data)}

      <button
        onClick={ () => {

          refetch2();
        }
        }
      >test</button>

      {JSON.stringify(data2)}
    </div>
    // <Layout title="Register your account">
    //   <RegisterForm onSuccess={() => navigate('/app')} />
    // </Layout>
  );
};

export default Landing;