import { Outlet } from "react-router-dom";

import Bottombar from "../components/shared/Bottombar";
import RightSideBar from "../components/shared/RightSideBar";
import Topbar from "../components/shared/Topbar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <RightSideBar />
      <Bottombar />
    </div>
  );
};

export default RootLayout;