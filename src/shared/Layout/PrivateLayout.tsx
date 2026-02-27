import ToastContainer from '../feedback/ToastContainer';
import OutletLayout from './OutletLayout';
import PrivateSidebar from './PrivateSidebar';

function PrivateLayout() {
  return (
    <div className="w-full flex min-h-screen">
      <PrivateSidebar />
      <OutletLayout />
      <ToastContainer />
    </div>
  );
}

export default PrivateLayout;
