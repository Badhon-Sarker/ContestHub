import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = true;
  return (
    <div className="lg:flex">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-center lg:justify-start">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-[#B0E0E6] drawer-button lg:hidden"
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

            {isAdmin ? (
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
            ) : (
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
