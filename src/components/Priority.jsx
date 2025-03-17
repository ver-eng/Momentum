import styles from "./Priority.module.css";

import Asterisk from "../assets/icons/Asterisk.svg";
import { useEffect, useRef, useState } from "react";

// import check from "../assets/icons/check.svg";
// import checkRed from "../assets/icons/check-red.svg";
// import checkGreen from "../assets/icons/check-green.svg";
// import arrowDown from "../assets/icons/arrow-down.svg";
import Medium from "../assets/icons/Medium.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import axios from "axios";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = `https://momentum.redberryinternship.ge/api`;
const PRIORITY_URL = "https://momentum.redberryinternship.ge/api/priorities";

function Priority({ openSelect, handleSelectOpen, onChange, taskData }) {
  const isOpen = openSelect === "priority";
  const selectRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ name: "", icon: "" });
  const [priorities, setPriorities] = useState([]);
  const [priorityID, setPriorityID] = useState(null);
  const [priorityError, setPriorityError] = useState(null);
  useEffect(function () {
    async function fetchDepartments() {
      try {
        const response = await axios.get(PRIORITY_URL);

        setPriorities(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchDepartments();
  }, []);
  // const toggleDropdown = () => {
  //   setIsOpen((prev) => !prev);
  // };
  const handleOptionClick = (priority) => {
    setSelectedOption((prev) => ({
      ...prev,
      name: priority.name,
      icon: priority.icon,
    }));
    onChange("priority", {
      id: priority.id,
      name: priority.name,
      icon: priority.icon,
    });
    setPriorityID(priority.id);
    setPriorityError(true);
    // setIsOpen(false);
    handleSelectOpen(null);
  };

  return (
    <div className={`${styles.department} customSelect`}>
      <div className={styles.departmentInnerDiv}>
        <div className={styles.departmentLabel}>
          <span className={styles.departmentSpan}>პრიორიტეტი</span>
          <img src={Asterisk} className={styles.departmentImg} />
        </div>

        <div ref={selectRef} className={styles.selectDiv}>
          <div
            className={`${styles.select} ${isOpen ? styles.openSelect : ""}`}
            onClick={() => handleSelectOpen("priority")}
          >
            <div className={styles.selectTitle}>
              {taskData.priority.name ? (
                <>
                  <img
                    src={taskData.priority.icon}
                    alt="Icon"
                    className={styles.priorityIcon}
                  />
                  <span>{taskData.priority.name}</span>
                </>
              ) : priorities.length > 0 ? (
                <>
                  <img src={priorities[1].icon} alt="Icon" />
                  <span>{priorities[1].name}</span>
                </>
              ) : (
                <>
                  <img src={Medium} alt="Icon" />
                  <span>საშუალო</span>
                </>
              )}
            </div>
            <img
              src={arrowDown}
              alt="Arrow"
              className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`}
            />
          </div>

          {isOpen && (
            <ul className={styles.optionsList}>
              {priorities.map((priority) => (
                <li
                  key={priority.id}
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(priority)}
                >
                  <img src={priority.icon} className={styles.priorityIcon} />
                  <span>{priority.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Priority;
