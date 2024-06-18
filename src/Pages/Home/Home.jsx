import { useNavigate } from "react-router-dom";
import BestContestCreator from "./BestContestCreator/BestContestCreator";
import PopularContest from "./PopularContest/PopularContest";
import SearchAll from "./SearchAll/SearchAll";
import Advertise from "./Adevertise/Advertise";

const Home = () => {

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    navigate(`/search/${search}`)



    
    
  };
  return (
    <div>
      {/* banner part */}
      <div className=" bg-Banner  w-full pb-52 bg-no-repeat  rounded-lg bg-cover px-10 ">
        {/* <div className="bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] h-3/5"> */}
        <div className="space-y-5">
          <h1 className="text-4xl text-white font-bold pt-20">
            Unleash Creativity with ContestHub
          </h1>
          <h3 className=" md:text-xl text-white pb-10">
            Discover ContestHub – the ultimate platform for creating and
            managing dynamic contests effortlessly. Engage communities, showcase
            talent, and celebrate innovation with our seamless contest creation
            and efficient winner selection. Get started today and turn your
            vision into reality!
          </h3>

          <div className="flex justify-start">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center gap-2">
                <div>
                  <label>
                    <input
                      type="text"
                      name="search"
                      placeholder="Search here"
                      className="input rounded-l-xl w-full"
                    />
                  </label>
                </div>
                <div>
                  <input className="btn" type="submit" value="Search" />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* banner part end here */}

      {/* popular contest starts */}
      <div className="my-5">

        <h1 className="text-2xl font-bold text-center">Popular Contest</h1>

        <PopularContest></PopularContest>


        {/* best contest creator */}
        <div>
        <h1 className="text-2xl font-bold text-center my-10">Best Contest Creator</h1>

        <BestContestCreator></BestContestCreator>

        </div>





      </div>


      {/* advertise here */}
      <div className="my-10" >

        <Advertise></Advertise>

      </div>



    </div>
  );
};

export default Home;
