import styles from "./ResponsibleEmployee.module.css";
import Asterisk from "../assets/icons/Asterisk.svg";
import addEmployeeIcon from "../assets/icons/addEmployeeIcon.svg";
import inactiveStar from "../assets/icons/inactiveStar.svg";
import inactivearrowDown from "../assets/icons/inactivearrow-down.svg";
import { useEffect, useRef, useState } from "react";

// import check from "../assets/icons/check.svg";
// import checkRed from "../assets/icons/check-red.svg";
// import checkGreen from "../assets/icons/check-green.svg";
// import arrowDown from "../assets/icons/arrow-down.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import axios from "axios";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = `https://momentum.redberryinternship.ge/api`;
const EMPLOYEE_URL = "https://momentum.redberryinternship.ge/api/employees";
function ResponsibleEmployee({
  openSelect,
  handleSelectOpen,
  onChange,
  taskData,
}) {
  const isOpen = openSelect === "responsibleemployee";
  const selectRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: "",
    surname: "",
    avatar: "",
    department_id: "",
  });
  const [employees, setEmployees] = useState([]);
  const [deptID, setSeptId] = useState(null);
  const [employeeError, setEmployeeError] = useState(null);

  useEffect(function () {
    async function fetchEmployee() {
      try {
        const response = await axios.get(EMPLOYEE_URL, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const data = response.data.filter((employee) => {
          console.log(employee);
          console.log(employee.department.id);
          console.log(taskData.department.id);
          console.log(
            Number(employee.department_id) == Number(taskData.department?.id)
          );
          if (employee.department_id == taskData.department.id) return employee;
        });
        setEmployees(data);
        // console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchEmployee();
  }, []);
  // const toggleDropdown = () => {
  //   setIsOpen((prev) => !prev);
  // };
  const handleOptionClick = (dept) => {
    // setSelectedOption(dept.name);
    setSelectedOption((prev) => ({
      ...prev,
      id: dept.id,
      name: dept.name,
      surname: dept.surname,
      avatar: dept.avatar,
      department_id: dept.department_id,
    }));
    setSeptId(dept.id);
    setEmployeeError(true);
    // setIsOpen(false);
    handleSelectOpen(null);
  };

  return (
    <div className={`${styles.department} customSelect`}>
      <div className={styles.departmentInnerDiv}>
        <div className={styles.departmentLabel}>
          <span
            className={
              taskData.department.id !== null
                ? styles.departmentSpan
                : styles.inactiveDepartmentSpan
            }
          >
            პასუხისმგებელი თანამშრომელი
          </span>
          <img
            src={taskData.department.id !== null ? Asterisk : inactiveStar}
            className={styles.departmentImg}
          />
        </div>

        <div ref={selectRef} className={styles.selectDiv}>
          <div
            className={`${
              taskData.department.id !== null
                ? styles.select
                : styles.inactiveSelect
            } ${
              isOpen && taskData.department.id !== null ? styles.openSelect : ""
            }`}
            onClick={() => handleSelectOpen("responsibleemployee")}
          >
            <div className={styles.selectTitle}>
              {selectedOption.name ? (
                <>
                  <div className={styles.displayIconDiv}>
                    <img
                      src={selectedOption.avatar}
                      alt="Icon"
                      className={styles.displayIcon}
                    />
                  </div>

                  <p className={styles.displayPara}>
                    {selectedOption.name + " " + selectedOption.surname}
                  </p>
                </>
              ) : (
                ""
              )}
              {/* {selectedOption ||
                (employees.length > 0
                  ? employees[0].name
                  : "ადმინისტრაციის დეპარტამენტი")} */}
              {/* {selectedOption
                ? selectedOption.name
                : employees.length > 0
                ? employees[0].name
                : "ადმინისტრაციის დეპარტამენტი"} */}
            </div>
            <img
              src={
                taskData.department.id !== null ? arrowDown : inactivearrowDown
              }
              alt="Arrow"
              className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`}
            />
          </div>

          {isOpen && taskData.department.id !== null ? (
            <ul className={styles.optionsList}>
              <li className={`${styles.optionItem} ${styles.addEmployeeLi}`}>
                {/* <img
                  src={addEmployeeIcon}
                  alt="add employee icon"
                  className={styles.addEmployeeIcon}
                /> */}
                <div className={styles.plusDiv}>
                  <span className={styles.plus}>+</span>
                </div>
                <button className={styles.addEmployeeBtn}>
                  დაამატე თანამშრომელი
                </button>
              </li>
              {employees.map((employee) => (
                <li
                  key={employee.id}
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(employee)}
                >
                  <img src={employee.avatar} className={styles.avatarIcon} />
                  <span className={styles.nameSurname}>
                    {employee.name} {employee.surname}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ResponsibleEmployee;
