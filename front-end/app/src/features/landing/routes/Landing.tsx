import { useNavigate } from 'react-router-dom';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      landing
      <button
        onClick={() => {
          navigate("/auth/login")
        }}
      >login</button>
    </div>
    // <Layout title="Register your account">
    //   <RegisterForm onSuccess={() => navigate('/app')} />
    // </Layout>
  );
};

export default Landing;