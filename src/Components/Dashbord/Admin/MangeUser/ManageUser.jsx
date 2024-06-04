import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import UserRoleModal from "../../../UserRoleModal/UserRoleModal";
import { useState } from "react";

const ManageUser = () => {
  const isBlocked = true;
  const [isOpen, setIsOpen] = useState(false)
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/users`);
      return res.data;
    },
  });


  
  


  const handleModal = (selected) =>{
    console.log('handle role updated', selected)
  }

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
                  <td><button className="btn" onClick={()=> setIsOpen(true)}>Update Role</button>
                  <UserRoleModal setIsOpen={setIsOpen} isOpen={isOpen} handleModal={handleModal} user={user}></UserRoleModal></td>
                  
                  <td>
                    <button className="bg-red-200 text-red-500 btn">
                      <FaTrash />
                    </button>
                  </td>
                  {isBlocked ? (
                    <td>
                      <button  className="btn bg-[#B0E0E6]">Unblock</button>
                    </td>
                  ) : (
                    <td>
                      <button>Block</button>
                    </td>
                  )}
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
