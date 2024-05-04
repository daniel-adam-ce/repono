import { TextInput } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
            <div className='text-3xl font-bold underline'>test</div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >
                <Input type="email" placeholder="Email" />
            </div>
            <div>
                <Button>test</Button>
            </div>

        </div>
    );
};

export default Landing;