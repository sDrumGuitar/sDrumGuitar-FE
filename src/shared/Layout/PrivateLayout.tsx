import { Outlet } from "react-router-dom";
import PrivateSidebar from "./PrivateHeader";

function PrivateLayout() {
  return (
    <div className="w-full flex">
      <PrivateSidebar />
      <Outlet />
    </div>
  );
}

export default PrivateLayout;
