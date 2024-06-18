const Profile = ({ one }) => {

  return (
    <div className="flex justify-center items-center ">

        
      <div className=" flex justify-between items-center ">
        <div>
          <img className="w-52 rounded-xl border-4  my-2" src={one.image} alt="" />
        </div>

        <div className=" text-left ml-5">
            <h1>Name: {one.name}</h1>
            <h1>Email: {one.email}</h1>
            <h1>Winner of Contest: {one.Win}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
