import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import { GiPodiumWinner } from "react-icons/gi";
import MyWinningCard from "./MyWinningCard/MyWinningCard";


const MyWinningContest = () => {

    const {user} = useContext(AuthContext)
    

    const { data: myWinnings = [] } = useQuery({
        queryKey: ["myWinnings", user?.email],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_URL}/myWinnings/${user?.email}`);
          return res.data;
        },
      });

   
    return (
        <div>

            <div className="text-center text-9xl flex justify-center"><GiPodiumWinner/></div>
            <div><h1 className="text-3xl font-bold text-center mb-5">My Winning Contest</h1></div>
            <hr />
            <div>
                {myWinnings.map(item => <MyWinningCard data={item} key={item._id}></MyWinningCard>)}
            </div>
            
        </div>
    );
};

export default MyWinningContest;