import { useContext, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/providers';
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from '@/components';
import { useHouseCreateMutation } from '@/features/house/api';

// const useHouseMutation = () => {
//     const queryClient = useQueryClient();
//     const query = useMutation({
//         mutationFn: async (newHouse: any) => {
//             const res = await Endpoints.house.create({house: newHouse});

//             if (!res.ok) {
//                 throw new Error((await res.json() as any).message);
//             }

//             queryClient.invalidateQueries({queryKey: ["getHouses"]})
//             return res.json();
//         }
//     })

//     return query;
// }

export const Dashboard = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [newHouse, setNewHouse] = useState<any>({});
    const [open, setOpen] = useState<boolean>(false);
    const createHouse = useHouseCreateMutation();

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fill, 150px)",
                    alignItems: "center",
                }}
            >
                {
                    auth.houses.map((house) => {
                        return (
                            <div
                                onClick={() => {
                                    navigate(`/house/${house.house_id}/dashboard`)
                                }}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "4px",
                                    boxShadow: "0px 2px 1px -5px rgba(0,0,0,.2), 0px 1px 1px 0px rgba(0,0,0,.14), 0px 1px 3px 0px rgba(0,0,0,.12)",
                                    cursor: "pointer"
                                }}
                                key={house.house_id}
                            >
                                {
                                    `${house.house_id}-${house.house_name}`
                                }
                            </div>
                        )
                    })
                }

                <div
                    onClick={() => {
                        // navigate(``)
                    }}
                    style={{
                        width: "150px",
                        height: "150px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "4px",
                        boxShadow: "0px 2px 1px -5px rgba(0,0,0,.2), 0px 1px 1px 0px rgba(0,0,0,.14), 0px 1px 3px 0px rgba(0,0,0,.12)",
                        cursor: "pointer"
                    }}
                >
                    <Dialog
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant={"outline"}>Create House</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create House</DialogTitle>
                                <DialogDescription>
                                    Enter a name for the house.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="house-name"
                                        placeholder="House Name"
                                        className="col-span-3"
                                        value={newHouse?.house_name ?? ""}
                                        onChange={(e) => {
                                            setNewHouse({ ...newHouse, house_name: e.currentTarget.value })
                                        }}
                                    />
                                </div>
                            </div>
                            <DialogFooter

                            >
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        createHouse.mutate(
                                            newHouse, {
                                            onSuccess: () => {
                                                setOpen(false);
                                                setNewHouse({});
                                            }
                                        });

                                    }}
                                >
                                    Create
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
