import ToastContainer from '../toast/ToastContainer';
import OutletLayout from './OutletLayout';
import PrivateSidebar from './PrivateSidebar';
import MessageSendModal from '@/shared/message/MessageSendModal';

function PrivateLayout() {
  return (
    <div className="w-full flex min-h-screen flex-col md:flex-row">
      <PrivateSidebar />
      <OutletLayout />
      <MessageSendModal />
      <ToastContainer />
    </div>
  );
}

export default PrivateLayout;
