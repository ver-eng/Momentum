import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TaskInnerPage from "./pages/TaskInnerPage";
import AddNewTask from "./pages/AddNewTask";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import AddEmployeeModal from "./components/AddEmployeeModal";
import axios from "axios";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = `https://momentum.redberryinternship.ge/api`;
const EMPLOYEE_URL = "https://momentum.redberryinternship.ge/api/employees";

function SessionStorageManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      sessionStorage.clear();
      TasksPage;
      console.log("Session storage cleared!");
    }
  }, [location.pathname]);

  return null;
}
function App() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  async function fetchEmployee() {
    try {
      const response = await axios.get(EMPLOYEE_URL, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      setEmployees(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchEmployee();
  }, []);
  function handleOpenModal() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <BrowserRouter>
      <SessionStorageManager />
      <Routes>
        <Route
          path="/"
          element={
            <TasksPage
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
            />
          }
        />
        <Route
          path="newTask"
          element={
            <AddNewTask
              handleOpenModal={handleOpenModal}
              employees={employees}
            />
          }
        />
        <Route path="/:id" element={<TaskInnerPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <AddEmployeeModal
        show={showModal}
        onClose={handleCloseModal}
        fetchEmployee={fetchEmployee}
      />
    </BrowserRouter>
  );
}

export default App;
