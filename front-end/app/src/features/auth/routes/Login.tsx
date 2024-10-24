import { Button, Card, CardContent, CardHeader, CardTitle, ReponoLogoTitle } from "@/components";

export const Login = () => {

    const fetchData = async () => {
        try {

            window.location = 'http://localhost:5000/api/v1/session/oauth' as string & Location;
        } catch (error) {

        }
    }

    return (
        <div
            className="flex h-screen w-full items-center justify-center px-4"
        >
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl"><ReponoLogoTitle style={{marginLeft: "0"}}/></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={fetchData}
                        >
                            Login with Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login