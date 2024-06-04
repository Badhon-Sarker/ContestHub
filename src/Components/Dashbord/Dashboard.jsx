import { Link, Outlet } from "react-router-dom";
import useGetUser from "../../hooks/GetUser/useGetUser";
// import { useContext } from "react";
// import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

const Dashboard = () => {
  const role = useGetUser();
  //   const { user } = useContext(AuthContext);
  //   const { data: users = [] } = useQuery({
  //     queryKey: ["users"],
  //     queryFn: async () => {
  //       const res = await axios.get(`${import.meta.env.VITE_URL}/users`);
  //       return res.data;
  //     },
  //   });

  return (
    <div className="lg:flex">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-center lg:justify-start">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-[#FF7F50] drawer-button lg:hidden"
          >
            Menu
          </label>

          {/* Page content here */}

          <div>
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-[#F5F5F5] text-base-content space-y-3">
            {/* Sidebar content here */}

            {role === "admin" && (
              <>
                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/dashboard/manageUsers"}>Manage User</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>Manage Contests</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>Home</Link>
                </li>
              </>
            )}

            {role === "creator" && (
              <>
                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>Add Contest</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>My Created Contest</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>Contest Submitted Page</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>Home</Link>
                </li>
              </>
            )}

            {role === "user" && (
              <>
                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>My Participated Contest</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>My Winning Contest</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>My Profile</Link>
                </li>

                <li className="bg-[#B0E0E6] rounded-lg">
                  <Link to={"/"}>Home</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
