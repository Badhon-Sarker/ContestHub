import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider/AuthProvider";
import axios from "axios";


const PerticipatedContest = () => {
    const {user} = useContext(AuthContext)

    const { data: myParticipate = [] } = useQuery({
        queryKey: ["myParticipate", user?.email],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_URL}/myParticipate/${user?.email}`);
          return res.data;
        },
      });

      console.log(myParticipate)

    return (
        <div>
            participated contest

            <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Contest Name</th>
                <th>Deadline</th>
                <th>Payment Status</th>
            
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myParticipate.map((item, idx) => (
                
                <tr key={item._id} className=" hover:bg-gray-200">
                  <td>{idx + 1}</td>
                  <td>{item.contestName}</td>
                  <td>{item.date}</td>
                  <td className="text-green-800 font-bold">Paid</td>
                         
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </div>
            
        </div>
    );
};

export default PerticipatedContest;