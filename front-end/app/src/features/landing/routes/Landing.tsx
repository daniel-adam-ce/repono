import { useNavigate } from 'react-router-dom';
import { TextInput, TextInputField } from '../../../components';

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
            <div
                style={{
                    padding: "5rem"
                }}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div
                style={{
                    padding: "10rem"
                }}
            >
                <TextInput
                    placeholder='Email'
                />
            </div>
            <div>
                <TextInputField
                    placeholder='Email'
                    label={"Email"}
                />
            </div>
        </div>
    );
};

export default Landing;