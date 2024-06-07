import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AllContestCard from "./AllContestCard/AllContestCard";
import { useState } from "react";

const AllContest = () => {
  const [allContest, setAllContest] = useState([]);

  const { data: allData = "" } = useQuery({
    queryKey: ["allData"],

    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/contest`);
      setAllContest(data);
      return data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allContest?.map((item) => (
          <AllContestCard key={item._id} item={item}></AllContestCard>
        ))}
      </div>
    </div>
  );
};

export default AllContest;
