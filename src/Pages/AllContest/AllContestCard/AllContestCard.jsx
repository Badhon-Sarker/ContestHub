import { NavLink } from "react-router-dom";


const AllContestCard = (item) => {
    console.log(item)
    return (
        <div>
            <div data-aos="fade-up" data-aos-duration="1000">
      <div className="card h-[500px] bg-base-100 shadow-xl">
        <figure>
          <img className="h-48 w-10/12 mt-2" src={item.item.image} alt="image" />
        </figure>

        <div className="card-body">
          <div className="flex justify-center">
            <h2
              data-aos="fade-right"
              data-aos-duration="1100"
              className="text-center card-title"
            >
              {item.item.contestName}
            </h2>
          </div>

          <div className="flex justify-evenly">
            <div data-aos="fade-down" data-aos-duration="1100">
              <h1>{item.item.contestDescription.slice(" ", 80)}..</h1>
            </div>
          </div>

          <div >
            <div>
              <h1
                data-aos="fade-down"
                data-aos-duration="1200"
                className="font-semibold"
              >
                Category: <span>{item.item.contestType}</span>
              </h1>
            </div>

            <div>
              <h1
                data-aos="fade-down"
                data-aos-duration="1200"
                className="font-semibold"
              >
                Attempted count: <span></span>
              </h1>
            </div>
          </div>

          

          <div className="card-actions justify-center">
            <NavLink to={`/details/${item._id}`}>
              <button className="btn bg-gray-100">View Details</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
            
        </div>
    );
};

export default AllContestCard;