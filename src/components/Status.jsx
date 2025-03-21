import styles from "./Status.module.css";

import Asterisk from "../assets/icons/Asterisk.svg";
import { useEffect, useRef, useState } from "react";

// import check from "../assets/icons/check.svg";
// import checkRed from "../assets/icons/check-red.svg";
// import checkGreen from "../assets/icons/check-green.svg";
// import arrowDown from "../assets/icons/arrow-down.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import axios from "axios";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = `https://momentum.redberryinternship.ge/api`;
const STATUS_URL = "https://momentum.redberryinternship.ge/api/statuses";

function Status({
  openSelect,
  handleSelectOpen,
  onChange,
  taskData,
  dataValidation,
}) {
  const isOpen = openSelect === "status";
  const selectRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ name: "", icon: "" });
  const [statuses, setStatuses] = useState([]);
  const [statusID, setStatusID] = useState(null);
  const [priorityError, setPriorityError] = useState(null);
  useEffect(function () {
    async function fetchStatus() {
      try {
        const response = await axios.get(STATUS_URL);

        setStatuses(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchStatus();
  }, []);
  // const toggleDropdown = () => {
  //   setIsOpen((prev) => !prev);
  // };
  const handleOptionClick = (status) => {
    setSelectedOption((prev) => ({
      ...prev,
      name: status.name,
      icon: status.icon,
    }));
    onChange("status", { id: status.id, name: status.name });
    console.log(selectedOption);
    setStatusID(status.id);
    setPriorityError(true);
    // setIsOpen(false);
    handleSelectOpen(null);
  };

  return (
    <div className={`${styles.department} customSelect`}>
      <div className={styles.departmentInnerDiv}>
        <div className={styles.departmentLabel}>
          <span className={styles.departmentSpan}>სტატუსი</span>
          <img src={Asterisk} className={styles.departmentImg} />
        </div>

        <div ref={selectRef} className={styles.selectDiv}>
          <div
            className={`${styles.select} ${
              dataValidation.status === null
                ? styles.nameInputOriginal
                : dataValidation.status === false
                ? styles.nameInputRed
                : styles.nameInputGreen
            } ${isOpen ? styles.openSelect : ""}`}
            onClick={() => handleSelectOpen("status")}
          >
            <div className={styles.selectTitle}>
              {taskData.status.name ? (
                <>
                  <span>{taskData.status.name}</span>
                </>
              ) : statuses.length > 0 ? (
                <>
                  <span>{statuses[0].name}</span>
                </>
              ) : (
                <>
                  <span>დასაწყები</span>
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
              {statuses.map((status) => (
                <li
                  key={status.id}
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(status)}
                >
                  <span>{status.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.errorDiv}>
          <div className={styles.firstError}>
            <p
              className={
                dataValidation.status === null
                  ? styles.errorSpanOriginal
                  : dataValidation.status === false
                  ? styles.errorSpanRed
                  : styles.errorSpanGreen
              }
            >
              აირჩიე სტატუსი
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
