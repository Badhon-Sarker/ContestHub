import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CardProfile = ({isWinnerExist}) => {

    const { data: myInfo = [] } = useQuery({
        queryKey: ["myInfo", isWinnerExist.winnerEmail],
        queryFn: async () => {
          const res = await axios.get(
            `${import.meta.env.VITE_URL}/users/${isWinnerExist.winnerEmail}`
          );
          return res.data;
        },
      });

    return (
        <div className=" ml-10 my-2">
            <div className=" rounded-full">
                <img className="w-1/3 rounded-full" src={myInfo.image} alt="" />
            </div>

            <h1 className="font-bold"> Winner: {isWinnerExist.winnerName}</h1>

            
            
        </div>
    );
};

export default CardProfile;