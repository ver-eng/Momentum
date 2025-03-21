import { useParams } from "react-router-dom";
import styles from "./TaskInnerPage.module.css";
import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import calendar from "../assets/icons/calendar.svg";
import manIcon from "../assets/icons/manIcon.svg";
import pieChart from "../assets/icons/pie-chart.svg";

import arrowDown from "../assets/icons/arrow-down.svg";
import { format, parseISO } from "date-fns";
import { ka } from "date-fns/locale";
import AddComments from "../components/addComments";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = "https://momentum.redberryinternship.ge/api";
const STATUS_URL = "https://momentum.redberryinternship.ge/api/statuses";
// /tasks/{id}
function TaskInnerPage({ handleOpenModal, handleCloseModal, showModal }) {
  const { id: taskId } = useParams();
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    name: singleData.status?.name,
    id: singleData.status?.id,
  });
  const fetchTask = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      setSingleData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);
  // useEffect(() => console.log(singleData), [singleData]);

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

  const toggleDropdown = () => {
    console.log("clicked");
    setIsOpen((prev) => !prev);
  };
  const handleOptionClick = async (status) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/tasks/${taskId}`,
        { status_id: status.id },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status updated:", response.data);

      setSelectedOption({
        name: response.data.status.name,
        id: response.data.status.id,
      });
      fetchTask();
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const departmentShortNames = {
    "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
    "გაყიდვები და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ტექნოლოგიების დეპარტამენტი": "ტექ. ინფ.",
    "მედიის დეპარტამენტი": "მედია",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "ლოჯოსტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ადამიანური რესურსების დეპარტამენტი": "ად. რესურსები",
  };
  return (
    <section>
      <Navigation
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
      />
      <div className={styles.innderPageMainDiv}>
        <div className={styles.taskDetailedinforDiv}>
          <div className={styles.taskdescriptionDiv}>
            <div className={styles.priorityNameDiv}>
              <div
                className={`${styles.priorityDiv} ${
                  singleData.priority?.id === 1
                    ? styles.border1
                    : singleData.priority?.id === 2
                    ? styles.border2
                    : styles.border3
                }`}
              >
                <img
                  src={singleData.priority?.icon}
                  alt="priority icon"
                  className={styles.priorityImg}
                />
                <span
                  className={`${styles.priorityName} ${
                    singleData.priority?.id === 1
                      ? styles.priority1
                      : singleData.priority?.id === 2
                      ? styles.priority2
                      : styles.priority3
                  }`}
                >
                  {singleData.priority?.name}
                </span>
              </div>
              <div
                className={`${styles.departmentNameDiv} ${
                  singleData.department?.id === 1 ? styles.colorDesign : ""
                } ${
                  singleData.department?.id === 2 ? styles.colorMarketing : ""
                } ${singleData.department?.id === 3 ? styles.colorTeq : ""}
                                         ${
                                           singleData.department?.id === 4
                                             ? styles.colorMarketing
                                             : ""
                                         } ${
                  singleData.department?.id === 5 ? styles.colorLogistics : ""
                } ${singleData.department?.id === 6 ? styles.colorTeq : ""} ${
                  singleData.department?.id === 7 ? styles.colorLogistics : ""
                }`}
              >
                <p className={styles.departmentName}>
                  {departmentShortNames[singleData.department?.name] ||
                    singleData.department?.name}
                </p>
              </div>
            </div>
            <div className={styles.cardSecondLine}>
              <h3 className={styles.taskName}>{singleData?.name}</h3>
              <p className={styles.taskDescription}>
                {singleData?.description}
              </p>
            </div>
          </div>

          <div>
            <h3 className={styles.taskHeading}>დავალების დეტალები</h3>
            <div className={styles.taskDetailsDivLower}>
              <div className={styles.taskDetailsNameDiv}>
                <div className={styles.taskDetailsEachDiv}>
                  <img
                    src={pieChart}
                    alt="pie chart icon"
                    className={styles.taskDetailsIcon}
                  />
                  <span className={styles.taskDetailsSpan}>სტატუსი</span>
                </div>
                <div className={styles.taskDetailsEachDiv}>
                  <img
                    src={manIcon}
                    alt="man icon"
                    className={styles.taskDetailsIcon}
                  />
                  <span className={styles.taskDetailsSpan}>თანამშრომელი</span>
                </div>
                <div className={styles.taskDetailsEachDiv}>
                  <img
                    src={calendar}
                    alt="calendar icon"
                    className={styles.taskDetailsIcon}
                  />
                  <span className={styles.taskDetailsSpan}>დავალების ვადა</span>
                </div>
              </div>
              <div className={styles.taskDetailsValueDiv}>
                <div ref={selectRef} className={styles.selectDiv}>
                  <div
                    className={`${styles.select} ${
                      isOpen ? styles.openSelect : ""
                    }`}
                    onClick={() => toggleDropdown()}
                  >
                    <div className={styles.selectTitle}>
                      <span>
                        {selectedOption?.name || singleData.status?.name}
                      </span>
                    </div>
                    <img
                      src={arrowDown}
                      alt="Arrow"
                      className={`${styles.arrowIcon} ${
                        isOpen ? styles.rotate : ""
                      }`}
                    />
                  </div>

                  {isOpen && (
                    <ul className={styles.optionsList}>
                      {statuses?.map((status) => {
                        console.log(status.id);
                        console.log(singleData.status?.id);
                        console.log(status.id !== singleData.status?.id);
                        return status.id !== singleData.status?.id ? (
                          <li
                            key={status.id}
                            className={styles.optionItem}
                            onClick={() => handleOptionClick(status)}
                          >
                            <span>{status?.name}</span>
                          </li>
                        ) : (
                          ""
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div className={styles.employeeDiv}>
                  <img
                    src={singleData.employee?.avatar}
                    className={styles.employeeAvatar}
                    alt="employee avatar"
                  />
                  <div className={styles.employeedescriptionDiv}>
                    <p className={styles.employeedepartment}>
                      {singleData.department?.name}
                    </p>
                    <p className={styles.employeeNameSurname}>
                      {singleData.employee?.name} {singleData.employee?.surname}
                    </p>
                  </div>
                </div>
                <div className={styles.deadLineDiv}>
                  <p className={styles.deadLinePara}>
                    {singleData.due_date
                      ? format(
                          parseISO(singleData.due_date),
                          "EEE - d/M/yyyy",
                          {
                            locale: ka,
                          }
                        )
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddComments taskId={taskId} />
      </div>
    </section>
  );
}

export default TaskInnerPage;
