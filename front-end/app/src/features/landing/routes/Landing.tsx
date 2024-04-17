import { useNavigate } from 'react-router-dom';
import { useEndpoints } from '../../../@hooks';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Landing = () => {
  const navigate = useNavigate();
  const endpoints = useEndpoints();

  const test = async () => {
      try {
        console.log('test')
        const res = await endpoints.users.view();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
  }

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

          test();
        }
        }
      >test</button>
    </div>
    // <Layout title="Register your account">
    //   <RegisterForm onSuccess={() => navigate('/app')} />
    // </Layout>
  );
};

export default Landing;