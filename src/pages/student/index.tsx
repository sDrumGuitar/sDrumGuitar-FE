import { useStudentModalStore } from '@/store/studentModalStore';
import ButtonSection from './components/ButtonSection';
import TableSection from './components/TableSection';
import StudentModal from './components/modal/StudentModal';

function StudentPage() {
  const isOpen = useStudentModalStore((state) => state.isOpen);

  return (
    <div>
      {isOpen && <StudentModal />}
      <ButtonSection />
      <TableSection />
    </div>
  );
}
export default StudentPage;
