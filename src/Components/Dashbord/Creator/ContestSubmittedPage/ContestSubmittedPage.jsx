import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ContestSubmittedPage = () => {
  const { user } = useContext(AuthContext);

  const { data: getSubmitted = [] } = useQuery({
    queryKey: ["getSubmitted", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/submittedContest/${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div>
        <Helmet>
        <title>Contest Submitted</title>
      </Helmet>
      <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex  justify-center items-center text-3xl font-extrabold my-5"
        >
         Contest Submitted
        </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Contest Name</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {getSubmitted.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    <Link to={`submitted/${item.contestName}`}>
                      {item.contestName}
                    </Link>
                  </td>
                  <td>{item.prizeMoney}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContestSubmittedPage;
