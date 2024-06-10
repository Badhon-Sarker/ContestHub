import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ContestDetailspage = () => {
  const { id } = useParams();

  const { data: Details = "" } = useQuery({
    queryKey: ["Details"],

    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/contestDetails/${id}`
      );
      return data;
    },
  });

  console.log(Details);
  return (
    <div>
      <h1 className="flex justify-center items-center text-3xl font-extrabold mb-5">
        {Details.contestName}
      </h1>
      <div className="md:grid md:grid-cols-10 gap-2 my-5">
        <div className="md:col-span-6">
          <img className=" rounded-lg" src={Details.image} alt="" />
        </div>
        <div className="md:col-span-4 flex items-center">
          <div className=" space-y-2 md:space-y-3">
          <h1 className="text-xl md:text-2xl font-semibold">Attempted Count: 10</h1>
          <h1 className="text-xl md:text-2xl font-semibold">Contest Prize: {Details.prizeMoney}</h1>
          <h1 className="text-xl md:text-2xl font-semibold">Deadline: {Details.date}</h1>
          <h1 className="text-xl md:text-2xl font-semibold">Contest Winner : Fuhgjkde </h1>
          </div>
        </div>
      </div>

      <p><span className="text-xl md:text-2xl font-semibold my-5">Description:</span> {Details.contestDescription}</p>

      <div className="flex justify-center my-5"><Link to={`/payment/${Details._id}`}><button className="btn">Register</button></Link></div>
    </div>
  );
};

export default ContestDetailspage;
