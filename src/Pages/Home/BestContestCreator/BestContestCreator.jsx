import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import BestCreator from "./BestCreator";

const BestContestCreator = () => {
  const [allContest, setAllContest] = useState([]);
//   const [creators, setCreators] = useState([]);
  let doc = [];

  const { data: allContests = "" } = useQuery({
    queryKey: ["allContests"],

    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/contest`);
      setAllContest(data);
      return data;
    },
  });

  const getSorts = allContest.sort((a, b) => b.submitCount - a.submitCount);

  const getSort = getSorts.slice(0, 3);

  

  //   getSort.map((contest) => {
  //     doc.push(contest.contestCreator)
  //   });

  getSort.map((contest) => {
    const exist = doc.includes(contest.contestCreator);
    if (!exist) {
      doc.push(contest.contestCreator);
      
    }
  });

 
  //   console.log(doc)

//   doc.map((creator) => {

//     // setCreators(creator)
//     axios.get(`${import.meta.env.VITE_URL}/users/${creator}`)
//     .then(res => {setCreators(res.data)})
//     .catch(err => console.error(err))
   
//   });
 

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {
        doc.map((creator, idx) => <BestCreator creator={creator} key={idx}></BestCreator>)
    }
   
  </div>;
};

export default BestContestCreator;
