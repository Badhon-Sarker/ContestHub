import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";

const Payment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);


  const { data: Details = "" } = useQuery({
    queryKey: ["Details"],

    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/contestDetails/${id}`
      );
      return data;
    },
  });

  const handleSubmit = () => {
    const contestName = Details.contestName;
    const contestType = Details.contestType;
    const contestPrice = Details.contestPrice;
    const date = Details.date;
    const image = Details.image;
    const prizeMoney = Details.prizeMoney;
    const contestDescription = Details.contestDescription;
    const taskInstruction = Details.taskInstruction;
    const contestCreator = Details.contestCreator;
    const participatorName = user?.displayName;
    const participatorEmail = user?.email;

    const Data = {
      contestName,
      contestType,
      contestPrice,
      date,
      image,
      prizeMoney,
      contestDescription,
      taskInstruction,
      contestCreator,
      participatorName,
      participatorEmail,
    };
    axios
      .post(`${import.meta.env.VITE_URL}/contestSubmit`, Data)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Contest Submitted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleSubmit} className="btn">
        Submit
      </button>
    </div>
  );
};

export default Payment;
