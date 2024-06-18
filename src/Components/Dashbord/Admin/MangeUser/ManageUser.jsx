import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import UserRoleModal from "../../../UserRoleModal/UserRoleModal";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageUser = () => {
  
  const [reload, setReload] = useState(false);
 

  const { data: users = [] } = useQuery({
    queryKey: ["users", reload],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/users`);
      return res.data;
    },
  });

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
        fetch(`${import.meta.env.VITE_URL}/deleteUser/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setReload(!reload);
            Swal.fire({
              title: "Deleted!",
              text: "User succesfully deleted",
              icon: "success",
            });
          });
      }
    });
  };

  const [blocked, setBlocked] = useState([]);

  const { data: blockedUsers = [] } = useQuery({
    queryKey: ["blockedUsers", reload],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/getBlock`);
      setBlocked(res.data);
      return res.data;
    },
  });

  const isExist = (email) => {
    const check = blocked.find((item) => item.email === email);

    return check;
  };

  
  const handleBlock = (email, name) => {
    const info = {
      name: name,
      email: email,
    };

    axios
      .post(`${import.meta.env.VITE_URL}/block`, info)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("User Blocked");
          isExist(email)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  



  const handleUnBlock = (email) =>{

    const getId = blocked.find((item) => item.email === email);

    fetch(`${import.meta.env.VITE_URL}/Unblock/${getId._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setReload(!reload);
        toast.success("User Unblocked");
        isExist(email)
        
      });
  }
  //   const handleModal = (selected) =>{
  //     console.log('handle role updated', selected)
  //   }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold my-5">Manage user</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update Role</th>
                <th>Delete</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, idx) => (
                <tr key={user._id} className=" hover:bg-gray-200">
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {/* <td><button className="btn" onClick={()=> setIsOpen(true)}>Update Role</button>
                  <UserRoleModal setIsOpen={setIsOpen} isOpen={isOpen} handleModal={handleModal} user={user}></UserRoleModal></td> */}
                  <td>
                    <UserRoleModal
                      id={user._id}
                      reload={reload}
                      setReload={setReload}
                    ></UserRoleModal>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-200 text-red-500 btn"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td>
                    {isExist(user.email) ? (
                      <button onClick={() => handleUnBlock(user.email)} className="btn">Unblock</button>
                    ) : (
                      <button
                        onClick={() => handleBlock(user.email, user.name)}
                        className="btn"
                      >
                        Block
                      </button>
                    )}
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

export default ManageUser;
