import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const BestCreator = ({ creator }) => {
  const [creatorsInfo, setCreatorsInfo] = useState([]);

  const { data: CreatorInfo = [] } = useQuery({
    queryKey: ["CreatorInfo", creator],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/users/${creator}`
      );
      setCreatorsInfo(res.data);
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

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div>
          <img className="w-full h-64" src={creatorsInfo.image} alt="" />
        </div>
        

        <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            {creatorsInfo.name}
          </h3>

          <div className="flex flex-col items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <h1 className="font-bold text-gray-800 dark:text-gray-200">
              {creatorsInfo.email}
            </h1>

            <h1 className=" text-gray-800 dark:text-gray-200">
              <span className=" font-bold">Contests:</span> {CreatorContestInfo.map((item) => item.contestName)}
            </h1>

            
          </div>
        </div>
      </div>

    </div>
  );
};

export default BestCreator;
