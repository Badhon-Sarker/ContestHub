import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const CheckoutForm = ({ id }) => {
  const { user } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");

  const { data: Details = "" } = useQuery({
    queryKey: ["Details"],

    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/contestDetails/${id}`
      );
      return data;
    },
  });

  const handleSubmitData = () => {
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
    const paymentStatus = "Paid";

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
      paymentStatus,
    };
    axios
      .post(`${import.meta.env.VITE_URL}/contestSubmit`, Data)
      .then((res) => {
        if (res.data.insertedId) {
          axios
            .put(`${import.meta.env.VITE_URL}/updateCount/${id}`)
            .then((res) => {
              toast.success("Contest Submitted");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stripe = useStripe();
  const elements = useElements();
  const TotalPrice = Details.contestPrice;

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_URL}/create-payment-intent`, {
        price: TotalPrice,
      })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [TotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      // console.log('payment intent', paymentIntent)
      if (paymentIntent.status === "succeeded") {
        setSuccess("Payment succeed");
        handleSubmitData();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary my-5"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>

      <p className="text-red-600">{error}</p>
      <p className="text-green-600">{success}</p>
    </form>
  );
};

export default CheckoutForm;
