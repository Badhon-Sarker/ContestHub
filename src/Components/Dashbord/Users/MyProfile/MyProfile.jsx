import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import Chart from "./Chart/Chart";
import toast from "react-hot-toast";


const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { data: myWinnings = [] } = useQuery({
    queryKey: ["myWinnings", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/myWinnings/${user?.email}`
      );
      return res.data;
    },
  });

  const { data: myParticipate = [] } = useQuery({
    queryKey: ["myParticipate", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/myParticipate/${user?.email}`
      );
      return res.data;
    },
  });


  const { data: myInfo = [] } = useQuery({
    queryKey: ["myInfo", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/users/${user?.email}`
      );
      return res.data;
    },
  });

 

  //   const { data: myLost = [] } = useQuery({
  //     queryKey: ["myLost", user?.email],
  //     queryFn: async () => {
  //       const res = await axios.get(`${import.meta.env.VITE_URL}/myLost/${user?.email}`);
  //       return res.data;
  //     },
  //   });

  const percent = (myWinnings.length / myParticipate.length) * 100;

  //   console.log(percent);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.userName.value;
    const image = form.userImage.value;
    const location = form.userLocation.value;

    const info = {
        name,
        location
    }

    updateUser(name, image)
    .then(res => {
        fetch(`${import.meta.env.VITE_URL}/editUser/${user.email}`, {
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

    })
    .then(err => console.error(err))
  };

 
  return (
    <div>
      my profile
      <div>
        <h1> My Paricipate: {myParticipate.length}</h1>
      </div>
      <div>
        <h1> My Winning: {myWinnings.length}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className=" gap-2">
            <div className="w-full">
              <h1>User Name </h1>

              <input
                type="text"
                name="userName"
                defaultValue={user.displayName}
                placeholder="User Name"
                className="input input-bordered w-full p-2 rounded-md mb-2"
              />
            </div>

            <div className="w-full">
              <h1>Profile Picture </h1>

              <input
                type="text"
                name="userImage"
                defaultValue={user.photoURL}
                placeholder="Profile Image"
                className="input input-bordered w-full p-2 rounded-md mb-2"
              />
            </div>


            <div className="w-full">
              <h1>Location </h1>

              <input
                type="text"
                name="userLocation"
                defaultValue={myInfo?.location}
                placeholder="User Location"
                className="input input-bordered w-full p-2 rounded-md mb-2"
              />
            </div>

            <div className="flex justify-center my-2">
              <input className="btn" type="submit" />
            </div>
          </div>
        </form>
      </div>
      <div>
        <Chart myParticipate={myParticipate} myWinnings={myWinnings}></Chart>
      </div>
    </div>
  );
};

export default MyProfile;
