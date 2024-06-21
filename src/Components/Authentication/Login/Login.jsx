import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { LoginGeneral, GoogleLogin } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const email = data.loginEmail;
    const password = data.loginPassword;

    LoginGeneral(email, password)
      .then((result) => {
        toast.success("Login Successfull");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogle = () => {
    GoogleLogin()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          image: result.user?.photoURL,
          role: 'user'
        };

        axios
          .post(`${import.meta.env.VITE_URL}/users`, userInfo)
          .then((res) => {
            // console.log(res.data)
            toast.success("Login Successfull");
            navigate("/");
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="hero min-h-screen backdrop:blur-3xl bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold   mt-10 font-playfair">
            Login now!
          </h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-gradient-to-r from-pink-500  to-purple-500 bg-transparent border-2 border-white my-10">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-playfair">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered "
                {...register("loginEmail", { required: true })}
              />
              {errors.loginEmail?.type === "required" && (
                <p>Email is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-playfair">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered "
                {...register("loginPassword", { required: true })}
              />
              {errors.loginPass?.type === "required" && (
                <p>Password is required</p>
              )}
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-white font-playfair"
                >
                  Forgot password?
                </a>
              </label>
              <div className="flex justify-center gap-1 text-sm text-white font-playfair my-3">
                <p>Dont have an account?</p>{" "}
                <p>
                  <NavLink to={"/register"}>Register</NavLink>
                </p>
              </div>
            </div>

            <div className="form-control mt-2">
              <button className="btn  bg-primary text-white ">Login</button>
            </div>
            <div>
              <div className="divider">OR</div>
            </div>

            <div>
              <div className="flex flex-col gap-2">
                <div
                  onClick={handleGoogle}
                  className=" bg-primary text-white flex justify-center items-center gap-2 py-2 rounded-lg border"
                >
                  <div>
                    <GrGoogle />
                  </div>
                  <div>Google</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
