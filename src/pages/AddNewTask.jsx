import styles from "./AddNewTask.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Depatments from "../components/Departments";
import Description from "../components/Description";
import Navigation from "../components/Navigation";
import Priority from "../components/Priority";
import Status from "../components/Status";
import ResponsibleEmployee from "../components/ResponsibleEmployee";
import Title from "../components/Title";
import Deadline from "../components/Deadline";
import axios from "axios";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const TASK_URL = `https://momentum.redberryinternship.ge/api/tasks`;

function AddNewTask({ handleOpenModal, employees }) {
  const navigate = useNavigate();

  const [dataValidation, setDataValidation] = useState(function () {
    const storedValidation = localStorage.getItem("dataValidation");
    return storedValidation
      ? JSON.parse(storedValidation)
      : {
          name: { min: null, max: null },
          description: { isTyped: false, min: null, max: null },
          due_date: null,
          status: null,
          priority: null,
          department: null,
          employee: null,
        };
  });
  const [taskData, setTaskData] = useState(function () {
    const storedData = localStorage.getItem("taskData");

    return storedData
      ? JSON.parse(storedData)
      : {
          // id: 1,
          name: "",
          description: "",
          due_date: "",
          status: {
            id: null,
            name: "",
          },
          priority: {
            id: null,
            name: "",
            icon: "",
          },
          department: {
            id: null,
            name: "",
          },
          employee: {
            id: null,
            name: "",
            surname: "",
            avatar: "",
            department_id: null,
          },
        };
  });
  const [openSelect, setOpenSelect] = useState(null);

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem("taskData")) || {};
    if (JSON.stringify(prevData) !== JSON.stringify(taskData)) {
      localStorage.setItem("taskData", JSON.stringify(taskData));
    }
  }, [taskData]);

  useEffect(() => {
    const prevValidation =
      JSON.parse(localStorage.getItem("dataValidation")) || {};
    if (JSON.stringify(prevValidation) !== JSON.stringify(dataValidation)) {
      localStorage.setItem("dataValidation", JSON.stringify(dataValidation));
    }
  }, [dataValidation]);

  function handleTaskData(field, value) {
    setTaskData((prev) => ({
      ...prev,
      [field]: typeof value === "object" ? { ...value } : value,
    }));
    if (field === "name") {
      const nameLength = value.length;
      setDataValidation((prev) => ({
        ...prev,
        name: {
          min: nameLength >= 3,
          max: nameLength <= 255,
        },
      }));
    }
    if (field === "description") {
      const descriptionLength = value.length;
      setDataValidation((prev) => ({
        ...prev,
        description: {
          isTyped: descriptionLength > 0,
          min: value.trim().split(/\s+/).length >= 4,
          max: descriptionLength <= 255,
        },
      }));
    }
    if (field === "department") {
      setDataValidation((prev) => ({
        ...prev,
        department: !!value.id,
      }));
    }
    if (field === "priority") {
      setDataValidation((prev) => ({
        ...prev,
        priority: !!value.id,
      }));
    }
    if (field === "status") {
      setDataValidation((prev) => ({
        ...prev,
        status: !!value.id,
      }));
    }
    if (field === "employee") {
      setDataValidation((prev) => ({
        ...prev,
        employee: !!value.id,
      }));
    }
    if (field === "due_date") {
      setDataValidation((prev) => ({
        ...prev,
        due_date: value.length > 0,
      }));
    }
  }

  function handleSelectOpen(selectName) {
    setOpenSelect((prev) => (prev === selectName ? null : selectName));
  }
  function handleClickOutside(event) {
    if (!event.target.closest(".customSelect")) {
      setOpenSelect(null);
    }
  }
  useEffect(() => {
    if (openSelect !== null) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [openSelect]);
  function validateBeforeSubmit() {
    return (
      dataValidation.name.min &&
      dataValidation.name.max &&
      (!dataValidation.description.isTyped ||
        (dataValidation.description.isTyped &&
          dataValidation.description.min &&
          dataValidation.description.max)) &&
      dataValidation.due_date &&
      dataValidation.status &&
      dataValidation.priority &&
      dataValidation.department &&
      dataValidation.employee
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (validateBeforeSubmit()) {
      console.log(taskData);
      const formData = new FormData();
      formData.append("name", taskData.name);
      formData.append("description", taskData.description);
      formData.append("due_date", taskData.due_date);
      formData.append("status_id", taskData.status.id);
      formData.append("priority_id", taskData.priority.id);
      formData.append("department_id", taskData.department.id);
      formData.append("employee_id", taskData.employee.id);

      try {
        const response = await axios.post(TASK_URL, formData, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        localStorage.removeItem("taskData");
        localStorage.removeItem("dataValidation");
        setTaskData({
          name: "",
          description: "",
          due_date: "",
          status: { id: null, name: "" },
          priority: { id: null, name: "", icon: "" },
          department: { id: null, name: "" },
          employee: {
            id: null,
            name: "",
            surname: "",
            avatar: "",
            department_id: null,
          },
        });
        setDataValidation({
          name: { min: null, max: null },
          description: { isTyped: false, min: null, max: null },
          due_date: null,
          status: null,
          priority: null,
          department: null,
          employee: null,
        });
        navigate("/");
      } catch (error) {
        console.log(error.response?.data);
      }
    } else {
      const updatedValidation = { ...dataValidation };
      Object.keys(updatedValidation).forEach((key) => {
        if (updatedValidation[key] === null) {
          updatedValidation[key] = false;
        } else if (typeof updatedValidation[key] === "object") {
          Object.keys(updatedValidation[key]).forEach((subKey) => {
            if (updatedValidation[key][subKey] === null) {
              updatedValidation[key][subKey] = false;
            }
          });
        }
      });
      setDataValidation(updatedValidation);
      localStorage.setItem("dataValidation", JSON.stringify(updatedValidation));
      console.log(updatedValidation);
    }
  }
  return (
    <main>
      <Navigation handleOpenModal={handleOpenModal} />
      <section className={styles.section}>
        <div className={styles.sectionDiv}>
          <div className={styles.addTaskParaDiv}>
            <h2 className={styles.addTaskPara}>შექმენი ახალი დავალება</h2>
          </div>
          <div className={styles.formDiv}>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.formInnerDiv}>
                <div className={styles.eachSectionDiv}>
                  <Title
                    titleChange={handleTaskData}
                    taskData={taskData}
                    dataValidation={dataValidation}
                  />
                  <Depatments
                    openSelect={openSelect}
                    handleSelectOpen={handleSelectOpen}
                    onChange={handleTaskData}
                    taskData={taskData}
                    dataValidation={dataValidation}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <Description
                    onChange={handleTaskData}
                    taskData={taskData}
                    dataValidation={dataValidation}
                  />
                  <ResponsibleEmployee
                    openSelect={openSelect}
                    handleSelectOpen={handleSelectOpen}
                    onChange={handleTaskData}
                    taskData={taskData}
                    handleOpenModal={handleOpenModal}
                    employees={employees}
                    dataValidation={dataValidation}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <div className={styles.priorityStatusDiv}>
                    <Priority
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
                      onChange={handleTaskData}
                      taskData={taskData}
                      dataValidation={dataValidation}
                    />
                    <Status
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
                      onChange={handleTaskData}
                      taskData={taskData}
                      dataValidation={dataValidation}
                    />
                  </div>
                  <div>
                    <Deadline
                      selectDate={handleTaskData}
                      taskData={taskData}
                      dataValidation={dataValidation}
                    />
                  </div>
                </div>
                <div className={styles.submitBtnDiv}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    // disabled={!validateBeforeSubmit()}
                  >
                    დავალების შექმნა
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddNewTask;
