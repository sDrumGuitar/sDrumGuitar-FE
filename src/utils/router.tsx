import { BrowserRouter, Route, Routes } from "react-router-dom";

// page 별 index 컴포넌트
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import StudentPage from "@/pages/student";
import CoursePage from "@/pages/course";
import SchedulePage from "@/pages/schedule";
import MessagePage from "@/pages/message";

// layout 컴포넌트
import PrivateLayout from "@/shared/Layout/PrivateLayout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/message" element={<MessagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
