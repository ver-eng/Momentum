import styles from "./Departments.module.css";
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
const DEPARTMENT_URL = "https://momentum.redberryinternship.ge/api/departments";

function Depatments({
  openSelect,
  handleSelectOpen,
  onChange,
  taskData,
  errors,
}) {
  const isOpen = openSelect === "departments";

  const selectRef = useRef(null);
  const [departments, setDepartments] = useState([]);
  useEffect(function () {
    async function fetchDepartments() {
      try {
        const response = await axios.get(DEPARTMENT_URL);

        setDepartments(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchDepartments();
  }, []);
  // const toggleDropdown = () => {
  //   setIsOpen((prev) => !prev);
  // };
  const handleOptionClick = (dept) => {
    onChange("department", { id: dept.id, name: dept.name });
    onChange("employee", {
      id: null,
      name: "",
      surname: "",
      avatar: "",
      department_id: null,
    });
    handleSelectOpen(null);
  };

  return (
    <div className={`${styles.department} customSelect`}>
      <div className={styles.departmentInnerDiv}>
        <div className={styles.departmentLabel}>
          <span className={styles.departmentSpan}>დეპარტამენტი</span>
          <img src={Asterisk} className={styles.departmentImg} />
        </div>

        <div ref={selectRef} className={styles.selectDiv}>
          <div
            className={`${styles.select} ${isOpen ? styles.openSelect : ""}`}
            onClick={() => handleSelectOpen("departments")}
          >
            <p className={styles.selectTitle}>
              {/* {selectedOption || "ადმინისტრაციის დეპარტამენტი"} */}
              {taskData.department.name ||
                (departments.length > 0
                  ? departments[0].name
                  : "ადმინისტრაციის დეპარტამენტი")}
              {/* {taskData.department.name?taskData.department.name} */}
              {/* {selectedOption
                ? selectedOption.name
                : departments.length > 0
                ? departments[0].name
                : "ადმინისტრაციის დეპარტამენტი"} */}
            </p>
            <img
              src={arrowDown}
              alt="Arrow"
              className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`}
            />
          </div>

          {isOpen && (
            <ul className={styles.optionsList}>
              {departments.map((eachDept) => (
                <li
                  key={eachDept.id}
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(eachDept)}
                >
                  {eachDept.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.errorDiv}>
          <div className={styles.firstError}>
            <p
            // className={
            //   errors.department
            //     ? styles.errorSpanRed
            //     : styles.errorSpanOriginal
            // }
            >
              აირჩიე დეპარტამენტი
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Depatments;
