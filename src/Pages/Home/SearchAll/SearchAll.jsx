import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AllContestCard from "../../AllContest/AllContestCard/AllContestCard";

const SearchAll = () => {
  const { query } = useParams();
  const [result, setResult] = useState([]);

  const { data: AllWinners = [] } = useQuery({
    queryKey: ["AllWinners"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/ContestSearch?search=${query}`
      );
      setResult(res.data);
      return res.data;
    },
  });

  

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {result?.map((item) => (
          <AllContestCard key={item._id} item={item}></AllContestCard>
        ))}
      </div>
    </div>
  );
};

export default SearchAll;
