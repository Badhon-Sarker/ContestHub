import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../../Provider/AuthProvider/AuthProvider";
// import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const EditMyCreated = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());

  const { data: Details = "" } = useQuery({
    queryKey: ["Details"],

    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/contestDetails/${id}`
      );
      return data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const contestName = form.contestName.value;
    const contestType = form.contestType.value;
    const contestPrice = form.contestPrice.value;
    const date = startDate.toLocaleDateString();
    const image = form.image.value;
    const prizeMoney = form.prizeMoney.value;
    const contestDescription = form.contestDescription.value;
    const taskInstruction = form.taskInstruction.value;
    const contestCreator = user?.email;

    const info = {
      contestName,
      contestType,
      contestPrice,
      date,
      image,
      prizeMoney,
      contestDescription,
      taskInstruction,
      contestCreator,
    };

    // console.log(info);

    fetch(`${import.meta.env.VITE_URL}/editContest/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Successfully Edited");
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Edit Contest</title>
      </Helmet>
      <h1
        data-aos="zoom-in"
        data-aos-duration="1000"
        className="flex  justify-center items-center text-3xl font-extrabold my-5"
      >
        Edit Contest
      </h1>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="md:flex justify-between gap-2">
            <div className="w-full">
              <h1>Contest Name *</h1>

              <input
                type="text"
                name="contestName"
                defaultValue={Details.contestName}
                placeholder="Contest Name"
                className="input input-bordered w-full p-2 rounded-md mb-2"
              />
            </div>

            <div className="w-full">
              <h1>Contest Type *</h1>

              <select
                name="contestType"
                className="select select-bordered w-full mb-2"
              >
                <option defaultValue={Details.contestType}>
                  {Details.contestType}
                </option>
                <option value={"Image Design"}>Image Design</option>
                <option value={"Article Writing"}>Article Writing</option>
                <option value={"Marketing Strategy"}>Marketing Strategy</option>
                <option value={"Digital Advertisement"}>
                  Digital Advertisement
                </option>
                <option value={"Gaming Review"}>Gaming Review</option>
                <option value={"Book Review"}>Book Review</option>
                <option value={"Business Idea"}>Business Idea</option>
                <option value={"Movie Review"}>Movie Review</option>
              </select>
            </div>
          </div>

          <div className="md:flex justify-between gap-2">
            <div className="w-full">
              <h1>Contest Price *</h1>

              <input
                type="number"
                name="contestPrice"
                defaultValue={Details.contestPrice}
                placeholder="Contest Price"
                className="input input-bordered w-full p-2 rounded-md mb-2"
              />
            </div>

            <div className="w-full">
              <h1>Date*</h1>
              <div className="p-2 border-2 rounded-lg">
                <DatePicker
                  selected={Details.date}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                />
              </div>
            </div>
          </div>

          <div className="md:flex justify-between gap-2">
            <div className="w-full">
              <h1>Image *</h1>

              <input
                type="text"
                name="image"
                defaultValue={Details.image}
                placeholder="Image"
                className="input input-bordered w-full p-2 rounded-md mb-2"
              />
            </div>

            <div className="w-full">
              <h1>Prize Money*</h1>

              <input
                type="number"
                name="prizeMoney"
                defaultValue={Details.prizeMoney}
                placeholder="Prize money"
                className="input input-bordered w-full p-2 rounded-md mb-2"
              />
            </div>
          </div>

          <div>
            <h1>Contest Description *</h1>
            <textarea
              className="textarea textarea-bordered w-full h-28"
              name="contestDescription"
              defaultValue={Details.contestDescription}
              placeholder="Contest Description"
            ></textarea>
          </div>

          <div>
            <h1>Task Submission Instruction *</h1>
            <textarea
              className="textarea textarea-bordered w-full h-20"
              name="taskInstruction"
              defaultValue={Details.taskInstruction}
              placeholder="Task Submission Instruction"
            ></textarea>
          </div>

          <div className="flex justify-center my-2">
            <input className="btn" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMyCreated;
