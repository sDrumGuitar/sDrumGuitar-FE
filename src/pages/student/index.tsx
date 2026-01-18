import NormalButton from "@/shared/button/NormalButton";
import TableSection from "./components/TableSection";

function StudentPage() {
  return (
    <div>
      {/* <p>Student Page</p> */}
      <div className="flex justify-end mb-4">
        <NormalButton text="신규학생 추가" />
      </div>
      <TableSection />
    </div>
  );
}
export default StudentPage;
