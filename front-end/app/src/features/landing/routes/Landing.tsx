import { useNavigate } from 'react-router-dom';
import { Endpoints } from '../../../@utils/api/endpoints';
export const Landing = () => {
  const navigate = useNavigate();


  return (
    <div>
      landing
      <button
        onClick={() => {
          navigate("/login")
        }}
      >login</button>
    </div>
    // <Layout title="Register your account">
    //   <RegisterForm onSuccess={() => navigate('/app')} />
    // </Layout>
  );
};

export default Landing;