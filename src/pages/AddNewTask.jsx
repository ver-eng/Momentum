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
  const [openSelect, setOpenSelect] = useState(null);

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
        <div className={styles.sectionDiv}>
          <div className={styles.addTaskParaDiv}>
            <h2 className={styles.addTaskPara}>შექმენი ახალი დავალება</h2>
          </div>
          <div className={styles.formDiv}>
            <form className={styles.form}>
              <div className={styles.formInnerDiv}>
                <div className={styles.eachSectionDiv}>
                  <Title />
                  <Depatments
                    openSelect={openSelect}
                    handleSelectOpen={handleSelectOpen}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <Description />
                  <ResponsibleEmployee
                    openSelect={openSelect}
                    handleSelectOpen={handleSelectOpen}
                  />
                </div>
                <div className={styles.eachSectionDiv}>
                  <div className={styles.priorityStatusDiv}>
                    <Priority
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
                    />
                    <Status
                      openSelect={openSelect}
                      handleSelectOpen={handleSelectOpen}
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
