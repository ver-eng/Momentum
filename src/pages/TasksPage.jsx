import Navigation from "../components/Navigation";
import styles from "./TasksPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import arrowDown from "../assets/icons/arrow-down.svg";
import filterIcon from "../assets/icons/filterIcon.svg";
import FilterList from "../components/FilterList";
import { useLocation } from "react-router-dom";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = "https://momentum.redberryinternship.ge/api";
const DEPARTMENT_URL = `${BASE_URL}/departments`;
const PRIORITY_URL = `${BASE_URL}/priorities`;
const EMPLOYEE_URL = `${BASE_URL}/employees`;

function TasksPage({ handleOpenModal, handleCloseModal, showModal }) {
  const location = useLocation();

  const [openFilter, setOpenFilter] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  // const [selectedFilters, setSelectedFilters] = useState({
  //   department: [],
  //   priority: [],
  //   employee: null,
  // });
  const [selectedFilters, setSelectedFilters] = useState(function () {
    const permanentFilters = sessionStorage.getItem("selectedFilters");
    return permanentFilters
      ? JSON.parse(permanentFilters)
      : {
          department: [],
          priority: [],
          employee: null,
        };
  });
  // const [tempSelectedFilters, setTempSelectedFilters] = useState({
  //   department: [],
  //   priority: [],
  //   employee: null,
  // });

  const [tempSelectedFilters, setTempSelectedFilters] = useState(function () {
    const temporaryFilters = sessionStorage.getItem("tempSelectedFilters");
    return temporaryFilters
      ? JSON.parse(temporaryFilters)
      : {
          department: [],
          priority: [],
          employee: null,
        };
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [deptartmentResponse, priorityResponse, employeeResponse] =
          await Promise.all([
            axios.get(DEPARTMENT_URL),
            axios.get(PRIORITY_URL),
            axios.get(EMPLOYEE_URL, {
              headers: { Authorization: `Bearer ${API_TOKEN}` },
            }),
          ]);

        setDepartments(deptartmentResponse.data);
        setPriorities(priorityResponse.data);
        setEmployees(employeeResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function toggleFilter(filterName) {
    setOpenFilter((prevFilter) => {
      if (prevFilter !== filterName) {
        setTempSelectedFilters(selectedFilters);
      }
      return prevFilter === filterName ? null : filterName;
    });
  }

  function handleMultiSelect(filterType, item) {
    setTempSelectedFilters((prev) => {
      const alreadySelected = prev[filterType].some((f) => f.id === item.id);
      const updatedFilters = {
        ...prev,
        [filterType]: alreadySelected
          ? prev[filterType].filter((f) => f.id !== item.id)
          : [...prev[filterType], item],
      };
      // sessionStorage.setItem(
      //   "tempSelectedFilters",
      //   JSON.stringify(updatedFilters)
      // );
      return updatedFilters;
    });
  }

  function handleSingleSelect(item) {
    setTempSelectedFilters((prev) => {
      const updatedFilters = {
        ...prev,
        employee: prev.employee?.id === item.id ? null : item,
      };
      // sessionStorage.setItem(
      //   "tempSelectedFilters",
      //   JSON.stringify(updatedFilters)
      // );
      return updatedFilters;
    });
  }
  function applyFilters() {
    setSelectedFilters(tempSelectedFilters);
    sessionStorage.setItem(
      "selectedFilters",
      JSON.stringify(tempSelectedFilters)
    );
    setOpenFilter(null);
  }
  // useEffect(() => {
  //   console.log("Saving to selectedFilters:", selectedFilters);

  //   sessionStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  // }, [selectedFilters]);

  // useEffect(() => {
  //   console.log("Saving to tempSelectedFilters:", tempSelectedFilters);

  //   sessionStorage.setItem(
  //     "tempSelectedFilters",
  //     JSON.stringify(tempSelectedFilters)
  //   );
  // }, [tempSelectedFilters]);

  console.log(JSON.parse(sessionStorage.getItem("selectedFilters")));
  useEffect(() => {
    return () => {
      if (location.pathname !== "/") {
        sessionStorage.removeItem("selectedFilters");
        sessionStorage.removeItem("tempSelectedFilters");
      }
    };
  }, [location]);

  return (
    <main>
      <Navigation
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
      />
      <section className={styles.parentSection}>
        <div className={styles.parentDiv}>
          <div className={styles.parentHeader}>
            <h1 className={styles.header}>დავალებების გვერდი</h1>
          </div>
          <div className={styles.filtersMainDiv}>
            <div className={styles.filter}>
              <button
                className={styles.filterButton}
                onClick={() => toggleFilter("department")}
              >
                <span className={styles.filterButtonSpan}>დეპარტამენტი</span>
                <img
                  src={arrowDown}
                  alt="Arrow"
                  className={`${styles.arrowIcon} ${
                    openFilter === "department" ? styles.rotate : ""
                  }`}
                />
              </button>

              {openFilter === "department" && (
                <ul className={`${styles.filterList} ${styles.FirstList}`}>
                  {departments.map((dept) => (
                    <li
                      key={dept.id}
                      className={`${styles.filterListItem} ${
                        tempSelectedFilters.department.some(
                          (d) => d.id === dept.id
                        )
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleMultiSelect("department", dept)}
                    >
                      <div className={styles.checkIconDiv}>
                        {tempSelectedFilters.department.some(
                          (d) => d.id === dept.id
                        ) && (
                          <img
                            src={filterIcon}
                            alt="Selected"
                            className={styles.checkIcon}
                          />
                        )}
                      </div>
                      {dept.name}
                    </li>
                  ))}
                  <button
                    className={styles.selectBtn}
                    onClick={() => applyFilters("department")}
                  >
                    არჩევა
                  </button>
                </ul>
              )}
            </div>

            <div className={styles.filter}>
              <button
                className={styles.filterButton}
                onClick={() => toggleFilter("priority")}
              >
                <span className={styles.filterButtonSpan}>პრიორიტეტი</span>

                <img
                  src={arrowDown}
                  alt="Arrow"
                  className={`${styles.arrowIcon} ${
                    openFilter === "priority" ? styles.rotate : ""
                  }`}
                />
              </button>

              {openFilter === "priority" && (
                <ul className={`${styles.filterList} ${styles.SecondList}`}>
                  {priorities.map((priority) => (
                    <li
                      key={priority.id}
                      className={`${styles.filterListItem} ${
                        tempSelectedFilters.priority.some(
                          (p) => p.id === priority.id
                        )
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleMultiSelect("priority", priority)}
                    >
                      <div className={styles.checkIconDiv}>
                        {tempSelectedFilters.priority.some(
                          (p) => p.id === priority.id
                        ) && (
                          <img
                            src={filterIcon}
                            alt="Selected"
                            className={styles.checkIcon}
                          />
                        )}
                      </div>
                      {priority.name}
                    </li>
                  ))}
                  <button
                    className={styles.selectBtn}
                    onClick={() => applyFilters("priority")}
                  >
                    არჩევა
                  </button>
                </ul>
              )}
            </div>

            <div className={styles.filter}>
              <button
                className={styles.filterButton}
                onClick={() => toggleFilter("employee")}
              >
                <span className={styles.filterButtonSpan}>თანამშრომელი</span>

                <img
                  src={arrowDown}
                  alt="Arrow"
                  className={`${styles.arrowIcon} ${
                    openFilter === "employee" ? styles.rotate : ""
                  }`}
                />
              </button>

              {openFilter === "employee" && (
                <ul className={`${styles.filterList} ${styles.ThirdList}`}>
                  {employees.map((emp) => (
                    <li
                      key={emp.id}
                      className={`${styles.filterListItem} ${
                        tempSelectedFilters.employee?.id === emp.id
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleSingleSelect(emp)}
                    >
                      <div className={styles.checkIconDiv}>
                        {tempSelectedFilters.employee?.id === emp.id && (
                          <img
                            src={filterIcon}
                            alt="Selected"
                            className={styles.checkIcon}
                          />
                        )}
                      </div>
                      <div className={styles.filterItemLast}>
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className={styles.avatar}
                        />
                        {emp.name} {emp.surname}
                      </div>
                    </li>
                  ))}
                  <button
                    className={styles.selectBtn}
                    onClick={() => applyFilters("employee")}
                  >
                    არჩევა
                  </button>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
      <FilterList selectedFilters={selectedFilters} />
    </main>
  );
}

export default TasksPage;
