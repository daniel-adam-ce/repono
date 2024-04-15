import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Layout } from '../components/Layout';
// import { RegisterForm } from '../components/RegisterForm';

export const Dashboard = () => {
  const navigate = useNavigate();

  const testCookie = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/users/10",
        {
          credentials: "include"
        }
      )
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  }

  const validateSession = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/session",
        {
          credentials: "include"
        }
      )
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div>
        dashboard
        <button
          onClick={() => {
            testCookie()
          }}
        >test</button>
        <button
          onClick={() => {
            validateSession()
          }}
        >test2</button>
    </div>
    // <Layout title="Register your account">
    //   <RegisterForm onSuccess={() => navigate('/app')} />
    // </Layout>
  );
};

export default Dashboard;