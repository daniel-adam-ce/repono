import { useNavigate } from 'react-router-dom';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
        dashboard
    </div>
    // <Layout title="Register your account">
    //   <RegisterForm onSuccess={() => navigate('/app')} />
    // </Layout>
  );
};

export default Dashboard;