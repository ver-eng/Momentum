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

function AddNewTask() {
  const [taskData, setTaskData] = useState(function () {
    const storedData = localStorage.getItem("taskData");

    return storedData
      ? JSON.parse(storedData)
      : {
          id: null,
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
  useEffect(
    function () {
      localStorage.setItem("taskData", JSON.stringify(taskData));
    },
    [taskData]
  );
  function handleTaskData(field, value) {
    console.log(field);
    console.log(value);
    setTaskData((prev) => ({
      ...prev,
      [field]: typeof value === "object" ? { ...value } : value,
    }));
    console.log(taskData);
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

  return (
    <main>
      <Navigation />
      <section className={styles.section}>
        <button onClick={() => localStorage.removeItem("taskData")}>
          Clear LocalStorage
        </button>
        <div className={styles.sectionDiv}>
          <div className={styles.addTaskParaDiv}>
            <h2 className={styles.addTaskPara}>შექმენი ახალი დავალება</h2>
          </div>
          <div className={styles.formDiv}>
            <form className={styles.form}>
              <div className={styles.formInnerDiv}>
                <div className={styles.eachSectionDiv}>
                  <Title titleChange={handleTaskData} taskData={taskData} />
                  <Depatments
                    openSelect={openSelect}
                    handleSelectOpen={handleSelectOpen}
                    onChange={handleTaskData}
                    taskData={taskData}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <Description onChange={handleTaskData} taskData={taskData} />
                  <ResponsibleEmployee
                    openSelect={openSelect}
                    handleSelectOpen={handleSelectOpen}
                    onChange={handleTaskData}
                    taskData={taskData}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <div className={styles.priorityStatusDiv}>
                    <Priority
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
                      onChange={handleTaskData}
                      taskData={taskData}
                    />
                    <Status
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
                      onChange={handleTaskData}
                      taskData={taskData}
                    />
                  </div>
                  <div>
                    <Deadline onChange={handleTaskData} taskData={taskData} />
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
