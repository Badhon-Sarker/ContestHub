const MyWinningCard = ({ data }) => {
  return (
    <div className="bg-[#F5F5F5] shadow-md ">
      {/* <div className="p-2 md:w-1/2">
        <img className="w-full p-2" src={data.contestImage} alt="image" />
      </div>
      <div className="p-2 ">
        <h2 className="card-title">{data.contestName}</h2>
        <h1>Description: {data.contestDescription.slice(" ", 100)}</h1>
        <h1>Creator: {data.contestCreator}</h1>
      </div> */}
      <div className="card card-side h-72 my-5">
      <figure className="md:w-1/2">
        <img
        className="w-full p-2"
          src={data.contestImage}
          alt="image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.contestName}</h2>
        <h1 >Description: {data.contestDescription.slice(" ", 120)}...</h1>
        <h1 className="font-bold">Prize Money: ${data.prizeMoney}</h1>
        <h1 className="font-bold">Created By: {data.contestCreator}</h1>
      </div>
    </div>
    </div>
  );
};

export default MyWinningCard;
