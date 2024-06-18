import { loadStripe } from "@stripe/stripe-js";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext } from "react";
// import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
// import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const { id } = useParams();
  // const { user } = useContext(AuthContext);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

  // const { data: Details = "" } = useQuery({
  //   queryKey: ["Details"],

  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_URL}/contestDetails/${id}`
  //     );
  //     return data;
  //   },
  // });

  // const handleSubmit = () => {
  //   const contestName = Details.contestName;
  //   const contestType = Details.contestType;
  //   const contestPrice = Details.contestPrice;
  //   const date = Details.date;
  //   const image = Details.image;
  //   const prizeMoney = Details.prizeMoney;
  //   const contestDescription = Details.contestDescription;
  //   const taskInstruction = Details.taskInstruction;
  //   const contestCreator = Details.contestCreator;
  //   const participatorName = user?.displayName;
  //   const participatorEmail = user?.email;

  //   const Data = {
  //     contestName,
  //     contestType,
  //     contestPrice,
  //     date,
  //     image,
  //     prizeMoney,
  //     contestDescription,
  //     taskInstruction,
  //     contestCreator,
  //     participatorName,
  //     participatorEmail,
  //   };
  //   axios
  //     .post(`${import.meta.env.VITE_URL}/contestSubmit`, Data)
  //     .then((res) => {
  //       if (res.data.insertedId) {
  //         toast.success("Contest Submitted");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="flex justify-center">

    
      <div className="w-1/2 border-4 border-gray-500 px-2 py-4 rounded-md my-10">
        {" "}
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id}></CheckoutForm>
        </Elements>
      </div>

      {/* <div>
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </div> */}
    </div>
  );
};

export default Payment;
