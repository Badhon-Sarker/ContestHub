import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import { GiPodiumWinner } from "react-icons/gi";
import MyWinningCard from "./MyWinningCard/MyWinningCard";
import { Helmet } from "react-helmet-async";

const MyWinningContest = () => {
  const { user } = useContext(AuthContext);

  const { data: myWinnings = [] } = useQuery({
    queryKey: ["myWinnings", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/myWinnings/${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>My Winnings</title>
      </Helmet>

      <div className="text-center text-9xl flex justify-center">
        <GiPodiumWinner />
      </div>
      <div>
        <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex  justify-center items-center text-3xl font-extrabold my-5"
        >
          My Winning Contest
        </h1>
      </div>
      <hr />
      <div>
        {myWinnings.map((item) => (
          <MyWinningCard data={item} key={item._id}></MyWinningCard>
        ))}
      </div>
    </div>
  );
};

export default MyWinningContest;
