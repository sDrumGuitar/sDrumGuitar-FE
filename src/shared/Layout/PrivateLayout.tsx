import ToastContainer from '../toast/ToastContainer';
import OutletLayout from './OutletLayout';
import PrivateSidebar from './PrivateSidebar';

function PrivateLayout() {
  return (
    <div className="w-full flex min-h-screen flex-col md:flex-row">
      <PrivateSidebar />
      <OutletLayout />
      <ToastContainer />
    </div>
  );
}

export default PrivateLayout;
