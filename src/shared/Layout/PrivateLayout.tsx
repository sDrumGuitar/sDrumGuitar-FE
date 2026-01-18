import { Outlet } from "react-router-dom";
import PrivateSidebar from "./PrivateSidebar";

function PrivateLayout() {
  return (
    <div className="w-full flex min-h-screen">
      <PrivateSidebar />
      <Outlet />
    </div>
  );
}

export default PrivateLayout;
