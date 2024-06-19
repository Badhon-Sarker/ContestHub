import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const LeaderBoard = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [AllWinner, setAllWinner] = useState([]);
  const [leaders, setLeaders] = useState([]);

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

    setLeaders(leaders);
  }, [AllUsers, AllWinner]);

  return (
    <div>
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <div>
        <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex  justify-center items-center text-3xl font-extrabold my-5"
        >
          Leaderboard
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Win</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {leaders.map((leader, idx) => (
              <tr key={idx}>
                <th>
                  <div className="font-bold">{idx + 1}</div>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={leader.image} alt="image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{leader.name}</div>
                  </div>
                </td>

                <td>
                  <div>
                    <div className="font-bold">{leader.email}</div>
                  </div>
                </td>

                <td>
                  <div className="font-bold">{leader.Win}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
