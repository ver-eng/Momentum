import styles from "./AddNewTask.module.css";

import Depatments from "../components/Departments";
import Description from "../components/Description";
import Navigation from "../components/Navigation";
import Priority from "../components/Priority";
import Status from "../components/Status";
import ResponsibleEmployee from "../components/ResponsibleEmployee";
import Title from "../components/Title";

import Deadline from "../components/Deadline";
import { useState } from "react";

function AddNewTask() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }
  return (
    <main>
      <Navigation />
      <section className={styles.section}>
        <div className={styles.sectionDiv}>
          <div className={styles.addTaskParaDiv}>
            <h2 className={styles.addTaskPara}>შექმენი ახალი დავალება</h2>
          </div>
          <div className={styles.formDiv}>
            <form action="" onSubmit="" className={styles.form}>
              <div className={styles.formInnerDiv}>
                <div className={styles.eachSectionDiv}>
                  <Title />
                  <Depatments />
                </div>
                <div className={styles.eachSectionDiv}>
                  <Description />
                  <ResponsibleEmployee />
                </div>
                <div className={styles.eachSectionDiv}>
                  <div className={styles.priorityStatusDiv}>
                    <Priority
                      toggleDropdown={toggleDropdown}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                    <Status
                      toggleDropdown={toggleDropdown}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  </div>
                  <div>
                    <Deadline />
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
