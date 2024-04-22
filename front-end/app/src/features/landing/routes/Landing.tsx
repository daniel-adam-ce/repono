import { useNavigate } from 'react-router-dom';

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
  );
};

export default Landing;