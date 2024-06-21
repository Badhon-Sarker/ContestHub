import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="px-2 flex flex-col items-center justify-center mt-20 ">
      <div>
        <h1 className="text-9xl font-bold lg:font-extrabold font-playfair text-center my-3">
          404
        </h1>
        <h3 className="text-3xl md:text-5xl lg:font-bold font-playfair text-center mb-5">
          Page Not Found!
        </h3>
      </div>

      <NavLink className="flex justify-center my-5" to={"/"}>
        <button className="btn">Home</button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
