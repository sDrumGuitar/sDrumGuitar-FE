import OutletLayout from "./OutletLayout";
import PrivateSidebar from "./PrivateSidebar";

function PrivateLayout() {
  return (
    <div className="w-full flex min-h-screen">
      <PrivateSidebar />
      <OutletLayout />
    </div>
  );
}

export default PrivateLayout;
