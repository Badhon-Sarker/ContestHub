import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import axios from "axios";


const MyProfile = () => {

    const {user} = useContext(AuthContext)
    const { data: myWinnings = [] } = useQuery({
        queryKey: ["myWinnings", user?.email],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_URL}/myWinnings/${user?.email}`);
          return res.data;
        },
      });


      const { data: myParticipate = [] } = useQuery({
        queryKey: ["myParticipate", user?.email],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_URL}/myParticipate/${user?.email}`);
          return res.data;
        },
      });

      

    //   const { data: myLost = [] } = useQuery({
    //     queryKey: ["myLost", user?.email],
    //     queryFn: async () => {
    //       const res = await axios.get(`${import.meta.env.VITE_URL}/myLost/${user?.email}`);
    //       return res.data;
    //     },
    //   });

    const percent = ((myWinnings.length)/myParticipate.length)*100

      console.log(percent)


    
    return (
        <div>
            my profile
            percent {percent}
            
        </div>
    );
};

export default MyProfile;