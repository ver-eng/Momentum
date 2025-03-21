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
import { setDate } from "date-fns";
import { API_TOKEN, BASE_URL } from "../constants";

const EMPLOYEE_URL = `${BASE_URL}/employees`;
function ResponsibleEmployee({
  openSelect,
  handleSelectOpen,
  onChange,
  taskData,
  handleOpenModal,
  employees,
  dataValidation,
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
  // const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [deptID, setSeptId] = useState(null);
  const [employeeError, setEmployeeError] = useState(null);

  useEffect(
    function () {
      const filteredEmp = employees.filter((employee) => {
        return employee.department.id == taskData.department.id;
      });
      setSelectedOption((prev) => ({
        ...prev,
        id: null,
        name: "",
        surname: "",
        avatar: "",
        department_id: null,
      }));

      setFilteredEmployees(filteredEmp);
    },
    [employees, taskData.department.id]
  );

  const handleOptionClick = (employee) => {
    console.log(employee);
    setSelectedOption((prev) => ({
      ...prev,
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      avatar: employee.avatar,
      department_id: employee.department.id,
    }));
    onChange("employee", {
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      avatar: employee.avatar,
      department_id: employee.department.id,
    });
    setSeptId(employee.id);
    setEmployeeError(true);
    // setIsOpen(false);
    handleSelectOpen(null);
  };

  return (
    <div className={`${styles.department} customSelect`}>
      <div className={styles.departmentInnerDiv}>
        {taskData.department.id !== null && (
          <>
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
                  dataValidation.employee === null
                    ? styles.nameInputOriginal
                    : dataValidation.employee === false
                    ? styles.nameInputRed
                    : styles.nameInputGreen
                } ${
                  isOpen && taskData.department.id !== null
                    ? styles.openSelect
                    : ""
                }`}
                onClick={() => handleSelectOpen("responsibleemployee")}
              >
                <div className={styles.selectTitle}>
                  {taskData.employee.name ? (
                    <>
                      <div className={styles.displayIconDiv}>
                        <img
                          src={taskData.employee.avatar}
                          alt="Icon"
                          className={styles.displayIcon}
                        />
                      </div>

                      <p className={styles.displayPara}>
                        {taskData.employee.name +
                          " " +
                          taskData.employee.surname}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <img
                  src={
                    taskData.department.id !== null
                      ? arrowDown
                      : inactivearrowDown
                  }
                  alt="Arrow"
                  className={`${styles.arrowIcon} ${
                    isOpen && taskData.department.id !== null
                      ? styles.rotate
                      : ""
                  }`}
                />
              </div>

              {isOpen && taskData.department.id !== null ? (
                <ul className={styles.optionsList}>
                  <li
                    className={`${styles.optionItem} ${styles.addEmployeeLi}`}
                    onClick={() => handleOpenModal()}
                  >
                    {/* <img
                  src={addEmployeeIcon}
                  alt="add employee icon"
                  className={styles.addEmployeeIcon}
                /> */}
                    <div className={styles.plusDiv}>
                      <span className={styles.plus}>+</span>
                    </div>
                    <span className={styles.addEmployeeBtn}>
                      დაამატე თანამშრომელი
                    </span>
                  </li>
                  {filteredEmployees.map((employee) => (
                    <li
                      key={employee.id}
                      className={styles.optionItem}
                      onClick={() => handleOptionClick(employee)}
                    >
                      <img
                        src={employee.avatar}
                        className={styles.avatarIcon}
                      />
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
            <div className={styles.errorDiv}>
              <div className={styles.firstError}>
                <p
                  className={
                    dataValidation.employee === null
                      ? styles.errorSpanOriginal
                      : dataValidation.employee === false
                      ? styles.errorSpanRed
                      : styles.errorSpanGreen
                  }
                >
                  აირჩიე თანამშრომელი
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ResponsibleEmployee;
