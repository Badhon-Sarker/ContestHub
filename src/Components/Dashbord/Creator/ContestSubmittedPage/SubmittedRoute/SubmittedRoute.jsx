import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const SubmittedRoute = () => {

    const {name} = useParams()

    const { data: submittedDetails = []} = useQuery({
        queryKey: ["submittedDetails", name],
        queryFn: async () => {
          const res = await axios.get(
            `${import.meta.env.VITE_URL}/submittedDetails/${name}`
          );
          return res.data;
        },
      });

      const handleWinner = (email) =>{
        console.log(email)
      }

    return (
        <div>
            <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Perticipator Name</th>
                <th>Email</th>
                <th>Submitted Task</th>

                
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {submittedDetails.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item.participatorName}</td>
                  <td>{item.participatorEmail}</td>
                  <td>link</td>
                  <td><button onClick={()=> handleWinner(item._id)} className="btn">Declare Win</button></td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
            
        </div>
    );
};

export default SubmittedRoute;