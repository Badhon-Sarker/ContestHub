import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCommentAlt, FaTrashAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Swal from "sweetalert2";
import CommentModal from "./CommentModal";
import { Helmet } from "react-helmet-async";

const ManageContest = () => {
  const [allContest, setAllContest] = useState([]);
  const [reload, setReload] = useState(false);
  const { data: allData = "" } = useQuery({
    queryKey: ["allData", reload],

    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/contest`);
      setAllContest(data);
      return data;
    },
  });

  const handleAccept = (id) => {
    // const info = 'accepted'

    // const data = {
    //     contestStatus : info
    // }

    // fetch(`${import.meta.env.VITE_URL}/acceptContest/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.modifiedCount > 0) {
    //         toast.success("Contest has been accepted");
    //         setReload(!reload)
    //       }
    //     });

    axios
      .put(`${import.meta.env.VITE_URL}/acceptContest/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Contest has been accepted");
          setReload(!reload);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_URL}/deleteCreate/${id}`)
          .then((res) => {
            setReload(!reload);
            Swal.fire({
              title: "Deleted!",
              text: "Contest deleted successfully",
              icon: "success",
            });
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div>
        <Helmet>
        <title>Manage Content</title>
      </Helmet>
      <div>
      <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex  justify-center items-center text-3xl font-extrabold my-5"
        >
          Manage Content
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Contest Name</th>
                <th>Creator Email</th>
                <th>Deadline</th>
                <th>Accept</th>
                <th>Delete</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allContest?.map((item, idx) => (
                <tr key={item._id} className=" hover:bg-gray-200">
                  <td>{idx + 1}</td>
                  <td>{item.contestName}</td>
                  <td>{item.contestName}</td>
                  <td>{item.date}</td>
                  {/* <td><button className="btn" onClick={()=> setIsOpen(true)}>Update Role</button>
                  <UserRoleModal setIsOpen={setIsOpen} isOpen={isOpen} handleModal={handleModal} user={user}></UserRoleModal></td> */}
                  <td>
                    {item.contestStatus === "pending" ? (
                      <button
                        onClick={() => handleAccept(item._id)}
                        className="btn text-green-800"
                      >
                        <TiTick />
                      </button>
                    ) : (
                      <button disabled className="btn">
                        <TiTick></TiTick>
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn text-red-600"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>

                  <td>
                    {/* <button className="btn "><FaCommentAlt></FaCommentAlt></button> */}
                    <CommentModal
                      id={item._id}
                      reload={reload}
                      setReload={setReload}
                    ></CommentModal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageContest;
