import { useNavigate } from "react-router-dom"
import { UserTable } from "../components/UserTable";
import { useUsers } from "../api";

export const Users = () => {
    const navigate = useNavigate();
    const { users, isPending } = useUsers();

    return (
        <div>
            <button
                onClick={() => {
                    navigate("create")
                }}
            >
                create
            </button>
            {
                !isPending
                    ? <UserTable
                        users={users}
                    />
                    : <div>
                        loading...
                    </div>

            }
        </div>
    )
}

export default Users;