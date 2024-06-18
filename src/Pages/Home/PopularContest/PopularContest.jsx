import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import PopularCard from "./PopularCard/PopularCard";

const PopularContest = () => {
  const [allContest, setAllContest] = useState([]);
  const CountData = [];

  const { data: allData = "" } = useQuery({
    queryKey: ["allData"],

    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/contest`);
      setAllContest(data);
      return data;
    },
  });

//   {allContest?.map((contest) => CountData.push(contest.submitCount))}

  //   const handleGetCount = (name) =>{
  //     const data = {
  //         contestName: name,
  //          count:  2
  //     }

  //   }
  const getSorts = allContest.sort((a, b) => b.submitCount - a.submitCount  )
  const getSort = getSorts.slice(0, 6);

//   console.log(getSort)
  



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {getSort.map(contest => <PopularCard key={contest._id} item={contest}></PopularCard>)}
    </div>
  );
};

export default PopularContest;
