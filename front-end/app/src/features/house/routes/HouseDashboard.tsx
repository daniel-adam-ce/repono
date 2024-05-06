
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

    return (
        <div>
            test
        </div>
    );
};

export default Dashboard;
