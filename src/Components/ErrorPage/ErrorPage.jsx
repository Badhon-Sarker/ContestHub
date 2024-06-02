import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="px-2  ">
      {/* <div className="flex flex-col md:flex-row justify-center gap-2 items-center py-10">
        <div className="text-white">
          <h1 className="text-9xl font-bold lg:font-extrabold font-playfair text-center my-3">
            404
          </h1>
          <h3 className="text-3xl md:text-5xl lg:font-bold font-playfair text-center mb-5">
            Page Not Found!
          </h3>

          <NavLink className="flex justify-center my-5" to={"/"}>
            <button className="btn">Home</button>
          </NavLink>
        </div>

        <div className="px-2 pb-3">
          <img src="https://i.ibb.co/T1LmC73/Open-Peeps-Bust.png" alt="" />
        </div>
      </div> */}

      <div>
        <img
          className=" min-h-screen w-full"
          src="https://i.ibb.co/GRGFXww/404-error-checking-FI.jpg"
          alt=""
        />
      </div>
      <div className="-mt-16 text-center">
        <NavLink to={"/"}>
          <button className="btn">Home</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
