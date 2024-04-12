import { GoogleLogin, googleLogout } from '@react-oauth/google';

export const Login = () => {
    return (
        <div>
            <div>test</div>
            

            <div
                onClick={() => {
                    console.log('logout')
                    googleLogout()
                }}
                style={{
                    cursor: "pointer"
                }}
            >logout</div>
            <GoogleLogin
                onSuccess={(res) => {
                    console.log(res)
                }}
                onError={() => {
                    console.log("error")
                }}
            />
        </div>
    );
};

export default Login;