import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Advertise = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [AllWinner, setAllWinner] = useState([]);
  const [first, setFirst] = useState([]);

  const { data: AllUser = [] } = useQuery({
    queryKey: ["AllUser"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/users`);
      setAllUsers(res.data);
      return res.data;
    },
  });

  const { data: AllWinners = [] } = useQuery({
    queryKey: ["AllWinners"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/allWinners`);
      setAllWinner(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    const winCount = AllUsers.map((user) => {
      const Win = AllWinner.filter(
        (winner) => winner.winnerEmail === user.email
      ).length;

      return {
        ...user,
        Win: Win,
      };
    });

    const leaders = winCount.sort((a, b) => b.Wins - a.Wins);
    const first = leaders.slice(0, 1);

    setFirst(first);
  }, [AllUsers, AllWinner]);

  return (
    <div>
      <div className="bg-gray-100 p-10 rounded-lg shadow-md text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Celebrate Creativity with ContestHub
        </h2>

        <div>
          <h1>
            {" "}
            Are you looking for a platform to discover and celebrate
            extraordinary talent? ContestHub is here for you! Our platform
            brings together the most talented individuals across various fields,
            allowing you to host and participate in top-notch contests.
            Experience the thrill of competition and the joy of victory. Be a
            part of ContestHub today and celebrate talent like never before!
          </h1>
        </div>

        <div className="mt-5">
          <h1 className="text-3xl font-bold text-center">The Leader Now!</h1>

          {first.map((one) => (
            <Profile key={one._id} one={one}></Profile>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-lg text-gray-800 mb-6">
            Join the ContestHub community today and create your own contests to
            showcase talent and creativity!
          </p>

          <div>
            <Link to={"/allContest"}>
              {" "}
              <button className="btn rounded-lg bg-orange-500 text-white ">
                {" "}
                Start Your Contest Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
