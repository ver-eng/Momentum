import styles from "./AddNewTask.module.css";
import { useEffect, useState } from "react";

import Depatments from "../components/Departments";
import Description from "../components/Description";
import Navigation from "../components/Navigation";
import Priority from "../components/Priority";
import Status from "../components/Status";
import ResponsibleEmployee from "../components/ResponsibleEmployee";
import Title from "../components/Title";
import Deadline from "../components/Deadline";
import axios from "axios";

function AddNewTask({ handleOpenModal, employees }) {
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
          // id: null,
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
  const [errors, setErrors] = useState({});
  const [openSelect, setOpenSelect] = useState(null);

  // useEffect(
  //   function () {
  //     localStorage.setItem("taskData", JSON.stringify(taskData));
  //   },
  //   [taskData]
  // );
  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem("taskData")) || {};
    if (JSON.stringify(prevData) !== JSON.stringify(taskData)) {
      localStorage.setItem("taskData", JSON.stringify(taskData));
    }
  }, [taskData]);
  // useEffect(
  //   function () {
  //     localStorage.setItem("dataValidation", JSON.stringify(dataValidation));
  //   },
  //   [dataValidation]
  // );
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
  }
  // function handleTaskData(field, value) {
  //   const newTaskData = {
  //     ...taskData,
  //     [field]: typeof value === "object" ? { ...value } : value,
  //   };

  //   const newValidation = { ...dataValidation };

  //   if (field === "name") {
  //     const nameLength = value.length;
  //     newValidation.name = {
  //       min: nameLength >= 3,
  //       max: nameLength <= 255,
  //     };
  //   }

  //   setTaskData(newTaskData);
  //   setDataValidation(newValidation);
  // }

  // useEffect(() => {

  // }, [taskData]);
  // function validateForm(updatedTaskData = taskData) {
  //   let newErrors = {};

  //   if (updatedTaskData.name.length < 2) {
  //     newErrors.name = "მინიმუმ 3 სიმბოლო";
  //   }
  //   if (updatedTaskData.name.length > 255) {
  //     newErrors.name = "მაქსიმუმ 255 სიმბოლო";
  //   }
  //   if (updatedTaskData.description.length > 0) {
  //     const wordCount = updatedTaskData.description.trim().split(/\s+/).length;
  //     if (wordCount < 4) {
  //       newErrors.description = "აღწერა უნდა შეიცავდეს მინიმუმ 4 სიტყვას";
  //     }
  //     if (updatedTaskData.description.length > 255) {
  //       newErrors.description = "მაქსიმუმ 255 სიმბოლო";
  //     }
  //   }
  //   if (!updatedTaskData.priority.id) {
  //     newErrors.priority = "პრიორიტეტი აუცილებელია";
  //   }
  //   if (!updatedTaskData.status.id) {
  //     newErrors.status = "სტატუსი აუცილებელია";
  //   }
  //   if (!updatedTaskData.department.id) {
  //     newErrors.department = "დეპარტამენტი აუცილებელია";
  //   }

  //   if (!updatedTaskData.employee.id) {
  //     newErrors.employee = "თანამშრომელი აუცილებელია";
  //   }
  //   if (!updatedTaskData.due_date) {
  //     newErrors.due_date = "დედლაინი აუცილებელია";
  //   } else {
  //     const selectedDate = new Date(updatedTaskData.due_date);
  //     if (selectedDate < new Date()) {
  //       newErrors.due_date = "დედლაინი ვერ იქნება წარსულში";
  //     }
  //   }

  //   setErrors(newErrors);
  //   localStorage.setItem("formErrors", JSON.stringify(newErrors));

  //   return Object.keys(newErrors).length === 0;
  // }
  useEffect(() => {
    const storedErrors = localStorage.getItem("formErrors");
    if (storedErrors) {
      setErrors(JSON.parse(storedErrors));
    }
  }, []);

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

  function onSubmit(e) {
    e.preventDefault();
    console.log(taskData);
    // if (validateForm()) {
    //   console.log("Valid Data Submitted:", taskData);
    //   localStorage.removeItem("taskData");
    // }
  }
  return (
    <main>
      <Navigation handleOpenModal={handleOpenModal} />
      <section className={styles.section}>
        <button onClick={() => localStorage.clear()}>Clear LocalStorage</button>
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
                    errors={errors}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <Description
                    onChange={handleTaskData}
                    taskData={taskData}
                    errors={errors}
                  />
                  <ResponsibleEmployee
                    openSelect={openSelect}
                    handleSelectOpen={handleSelectOpen}
                    onChange={handleTaskData}
                    taskData={taskData}
                    errors={errors}
                    handleOpenModal={handleOpenModal}
                    employees={employees}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <div className={styles.priorityStatusDiv}>
                    <Priority
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
                      onChange={handleTaskData}
                      taskData={taskData}
                      errors={errors}
                    />
                    <Status
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
                      onChange={handleTaskData}
                      taskData={taskData}
                      errors={errors}
                    />
                  </div>
                  <div>
                    <Deadline
                      selectDate={handleTaskData}
                      taskData={taskData}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className={styles.submitBtnDiv}>
                  <button type="submit" className={styles.submitBtn}>
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
