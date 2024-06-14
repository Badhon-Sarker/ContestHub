import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";


const SubmittedRoute = () => {

    const [declared, setDeclared] = useState(false)

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


      const { data: winnerDetails = []} = useQuery({
        queryKey: ["winnerDetails", name],
        queryFn: async () => {
          const res = await axios.get(
            `${import.meta.env.VITE_URL}/winnerDetails/${name}`
          );
          return res.data;
        },
      });


      useEffect(()=>{

        if(winnerDetails.length>0){
            setDeclared(true)
          }
    

      },[winnerDetails.length])

      
      const handleWinner = (id, winnerName ,email) =>{


        if(winnerDetails.length > 0){
            return toast.error('already decided winner')
        }



        const data = {
            
            winnerName: winnerName,
            winnerEmail: email,
            submittedId: id,
            contestName: name

        }

        axios.post(`${import.meta.env.VITE_URL}/winners`, data)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Successfully added winner");
            setDeclared(true)
                    
          }
        })
        .catch((error) => {
          console.log(error);
        });


        const losers = submittedDetails.filter(user =>  email !== user.participatorEmail)

        // console.log(losers)
        
        axios.post(`${import.meta.env.VITE_URL}/losers`, losers)
        .then((res) => {
          if (res.data.insertedId) {
            // toast.success("Successfully added winner");
            setDeclared(true)
                    
          }
        })
        .catch((error) => {
          console.log(error);
        });
        
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
                  <td className="text-primary">link</td>
                  <td>{declared? <button disabled className="btn">Declare Win</button> : <button onClick={()=> handleWinner(item._id, item.participatorName, item.participatorEmail )} className="btn">Declare Win</button>}</td>
                 
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