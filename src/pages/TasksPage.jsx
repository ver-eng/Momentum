import Navigation from "../components/Navigation";
import styles from "./TasksPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import arrowDown from "../assets/icons/arrow-down.svg";
import filterIcon from "../assets/icons/filterIcon.svg";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = "https://momentum.redberryinternship.ge/api";
const DEPARTMENT_URL = `${BASE_URL}/departments`;
const PRIORITY_URL = `${BASE_URL}/priorities`;
const EMPLOYEE_URL = `${BASE_URL}/employees`;

function TasksPage({ handleOpenModal, handleCloseModal, showModal }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    department: [],
    priority: [],
    employee: null,
  });

  useEffect(() => {
    const storedFilters = sessionStorage.getItem("selectedFilters");
    if (storedFilters) {
      setSelectedFilters(JSON.parse(storedFilters));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [deptRes, priorityRes, empRes] = await Promise.all([
          axios.get(DEPARTMENT_URL),
          axios.get(PRIORITY_URL),
          axios.get(EMPLOYEE_URL, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
          }),
        ]);

        setDepartments(deptRes.data);
        setPriorities(priorityRes.data);
        setEmployees(empRes.data);
      } catch (error) {
        console.log("Error fetching filters:", error);
      }
    }
    fetchData();
  }, []);

  function toggleFilter(filterName) {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  }

  function handleMultiSelect(filterType, item) {
    setSelectedFilters((prev) => {
      const alreadySelected = prev[filterType].some((f) => f.id === item.id);

      const updatedFilters = {
        ...prev,
        [filterType]: alreadySelected
          ? prev[filterType].filter((f) => f.id !== item.id)
          : [...prev[filterType], item],
      };

      sessionStorage.setItem("selectedFilters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  }

  function handleSingleSelect(item) {
    const updatedFilters =
      item.id !== selectedFilters.employee?.id
        ? { ...selectedFilters, employee: item }
        : { ...selectedFilters, employee: null };

    setSelectedFilters(updatedFilters);
    sessionStorage.setItem("selectedFilters", JSON.stringify(updatedFilters));
  }

  useEffect(() => {
    return () => sessionStorage.removeItem("selectedFilters");
  }, []);

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
                        selectedFilters.department.some((d) => d.id === dept.id)
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleMultiSelect("department", dept)}
                    >
                      <div className={styles.checkIconDiv}>
                        {selectedFilters.department.some(
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
                  <button className={styles.selectBtn}>არჩევა</button>
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
                        selectedFilters.priority.some(
                          (p) => p.id === priority.id
                        )
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleMultiSelect("priority", priority)}
                    >
                      <div className={styles.checkIconDiv}>
                        {selectedFilters.priority.some(
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
                  <button className={styles.selectBtn}>არჩევა</button>
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
                        selectedFilters.employee?.id === emp.id
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleSingleSelect(emp)}
                    >
                      <div className={styles.checkIconDiv}>
                        {selectedFilters.employee?.id === emp.id && (
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
                  <button className={styles.selectBtn}>არჩევა</button>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TasksPage;
