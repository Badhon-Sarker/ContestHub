import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


const BestCreator = ({creator}) => {

    const [creatorsInfo, setCreatorsInfo] = useState([])

    const { data: CreatorInfo = [] } = useQuery({
        queryKey: ["CreatorInfo", creator],
        queryFn: async () => {
          const res = await axios.get(
            `${import.meta.env.VITE_URL}/users/${creator}`
          );
          setCreatorsInfo(res.data)
          return res.data;
        },
      });


      const { data: CreatorContestInfo = [] } = useQuery({
        queryKey: ["CreatorContestInfo", creator],
        queryFn: async () => {
          const res = await axios.get(
            `${import.meta.env.VITE_URL}/contest/${creator}`
          );
          return res.data;
        },
      });



    //   console.log(creatorsInfo) contest

    // console.log(CreatorContestInfo)


    return (
        <div className="flex justify-center">
            <div className="border-4 border-green-600 w-2/5 ">
                <img src={creatorsInfo.image} alt="photo" />
                <h1>Name: {creatorsInfo.name}</h1>
                <h1>Email: {creatorsInfo.email}</h1>
                Contests: {CreatorContestInfo.map(item => item.contestName )}

            </div>
            
        </div>
    );
};

export default BestCreator;