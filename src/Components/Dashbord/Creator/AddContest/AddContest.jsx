import axios from "axios";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";


const AddContest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {user} = useContext(AuthContext)


  
  

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const contestName = data.contestName;
    const contestType = data.contestType;
    const contestPrice = data.contestPrice;
    const date = startDate.toLocaleDateString();
    const image = data.image;
    const prizeMoney = data.prizeMoney;
    const contestDescription = data.contestDescription;
    const taskInstruction = data.taskInstruction;
    const contestCreator = user.email
    const contestStatus = 'pending'
    const submitCount = 0

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
      contestStatus,
      submitCount
    };

    axios.post(`${import.meta.env.VITE_URL}/contest`, info)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Contest Added");
          reset()
        
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  return (
    <div>
      <h1 className="flex justify-center items-center text-3xl font-extrabold mb-5">
        Add Contest
      </h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex justify-between gap-2">
            <div className="w-full">
              <h1>Contest Name *</h1>

              <input
                type="text"
                placeholder="Contest Name"
                className="input input-bordered w-full p-2 rounded-md mb-2"
                {...register("contestName", { required: true })}
              />
              {errors.contestName?.type === "required" && (
                <p className=" text-red-400">Contest Name is required</p>
              )}
            </div>

            <div className="w-full">
              <h1>Contest Type *</h1>

              <select
                className="select select-bordered w-full mb-2"
                {...register("contestType", { required: true })}
              >
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
                placeholder="Contest Price"
                className="input input-bordered w-full p-2 rounded-md mb-2"
                {...register("contestPrice", { required: true })}
              />
              {errors.contestPrice?.type === "required" && (
                <p className=" text-red-400">Contest Price is required</p>
              )}
            </div>

            <div className="w-full">
              <h1>Date*</h1>
              <div className="p-2 border-2 rounded-lg">
                <DatePicker
                  selected={startDate}
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
                placeholder="Image"
                className="input input-bordered w-full p-2 rounded-md mb-2"
                {...register("image", { required: true })}
              />
              {errors.image?.type === "required" && (
                <p className=" text-red-400">Image is required</p>
              )}
            </div>

            <div className="w-full">
              <h1>Prize Money*</h1>

              <input
                type="number"
                placeholder="Prize money"
                className="input input-bordered w-full p-2 rounded-md mb-2"
                {...register("prizeMoney", { required: true })}
              />
              {errors.prizeMoney?.type === "required" && (
                <p className=" text-red-400">Prize money is required</p>
              )}
            </div>
          </div>

          <div>
            <h1>Contest Description *</h1>
            <textarea
              className="textarea textarea-bordered w-full h-28"
              name="ContestDescription"
              placeholder="Contest Description"
              {...register("contestDescription", { required: true })}
            ></textarea>
            {errors.ContestDescription?.type === "required" && (
              <p className=" text-red-400">Prize money is required</p>
            )}
          </div>

          <div>
            <h1>Task Submission Instruction *</h1>
            <textarea
              className="textarea textarea-bordered w-full h-20"
              name="ContestDescription"
              placeholder="Task Submission Instruction"
              {...register("taskInstruction", { required: true })}
            ></textarea>
            {errors.taskInstruction?.type === "required" && (
              <p className=" text-red-400">Prize money is required</p>
            )}
          </div>

          <div className="flex justify-center my-2">
            <input className="btn" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
