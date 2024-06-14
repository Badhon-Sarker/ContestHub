import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState} from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCreatedContest = () => {
  const { user } = useContext(AuthContext);
  const [reload, setReload] = useState(false)

  const { data: getUser = []} = useQuery({
    queryKey: ["getUser", user?.email, reload],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/contest/${user?.email}`
      );
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
        fetch(`${import.meta.env.VITE_URL}/deleteCreate/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            
            setReload(!reload)
            Swal.fire({
              title: "Deleted!",
              text: "Contest succesfully deleted",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <div>
      <h1 className="flex justify-center items-center text-3xl font-extrabold mb-5">
        My Created Contest
      </h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Contest Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>See Submission</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {getUser.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item.contestName}</td>
                  <td>{item.date}</td>
                  <td className={item.contestStatus === 'accepted' ? 'text-green-900 font-bold' : 'text-black'}>{item.contestStatus}</td>
                  <td>
                    {
                      item.contestStatus === 'accepted' ? <button disabled className="btn"><FaEdit></FaEdit></button> : <Link to={`editContest/${item._id}`}><button className="btn">
                      <FaEdit></FaEdit>
                    </button></Link>
                    }
                    
                  </td>
                  <td>
                    {
                      item.contestStatus === 'accepted' ? <button disabled className="btn"><FaTrash></FaTrash></button> : <button
                      onClick={() => handleDelete(item._id)}
                      className="btn"
                    >
                      <FaTrash></FaTrash>
                    </button>
                    }
                    
                  </td>
                  <td>
                    <Link to={`submitted/${item.contestName}`}><button className="btn">See Submission</button></Link>
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

export default MyCreatedContest;
