export const Login = () => {

    const fetchData = async () => {
        try {
            
            window.location = 'http://localhost:5000/api/v1/session/oauth' as string & Location;
        } catch (error) {
            
        }
    }

    return (
        <div
            style={{
                display: "flex",
                gap: "1rem"
            }}
        >
            <div>test</div>
            
            <button
                onClick={() => {
                    fetchData();
                }}
                style={{
                    cursor: "pointer"
                }}
            >login</button>

            <button
                onClick={() => {
                }}
                style={{
                    cursor: "pointer"
                }}
            >logout</button>
        </div>
    );
};

export default Login