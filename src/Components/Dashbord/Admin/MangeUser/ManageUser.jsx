import { useQuery } from "@tanstack/react-query";
import axios from "axios";





const ManageUser = () => {

    const {data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axios.get(`${import.meta.env.VITE_URL}/users`)
            return res.data

        }
    })
   

  
    return (
        <div>
            manage users {users.length}
            
        </div>
    );
};

export default ManageUser;