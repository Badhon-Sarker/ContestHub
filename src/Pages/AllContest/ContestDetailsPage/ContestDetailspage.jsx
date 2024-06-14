import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { BsListNested } from "react-icons/bs";

const ContestDetailspage = () => {
  const { id } = useParams();
  const {user} = useContext(AuthContext)
  const navigation = useNavigate()
  

  const { data: Details = "" } = useQuery({
    queryKey: ["Details"],

    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/contestDetails/${id}`
      );
      return data;
    },
  });


  const { data: myParticipate = [] } = useQuery({
    queryKey: ["myParticipate", user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/myParticipate/${user?.email}`);
      return res.data;
    },
  });

  // console.log(Details, myParticipate)



  const isExist = (id) =>{

    if(myParticipate.length === 0){
      return navigation(`/payment/${id}`)
      
    }
   const exist = myParticipate.find(item => item.contestName === Details.contestName)
  //  const existEmail = myParticipate.map(item => item.contestName === Details.contestName)
   

    if(exist){
      return toast.error('You have already participated')
    }else{
      navigation(`/payment/${id}`)
    }
  //  if(exist){
  //   return toast.error('You have already participated')
  //  }else{
  //   navigation(`/payment/${id}`)
  //  }
  }

  const disabled = user.email === myParticipate.contestCreator || user.email === Details.contestCreator






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

      

      <div className="flex justify-center my-5">{disabled? <button disabled className="btn">Register</button> : <button onClick={()=>{isExist(Details._id)}} className='btn'>Register</button>}</div>
    </div>
  );
};

export default ContestDetailspage;
