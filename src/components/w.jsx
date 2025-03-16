import styles from "./Deadline.module.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateIcon from "../assets/icons/dateIcon.svg";

function DateTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}
const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className={styles.imgInputDiv} onClick={onClick} ref={ref}>
    <img src={dateIcon} alt="date icon" className={styles.dateIcon} />
    <input
      value={value}
      placeholder={placeholder}
      className={styles.dateInput}
    />
  </div>
));
function Deadline() {
  const [dueDate, setDueDate] = useState(null);
  const handleCancel = () => {
    setDueDate(null);
  };

  const handleOk = () => {
    // Close calendar or do something on OK
  };
  const georgianMonths = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];

  function getGeorgianMonth(monthIndex) {
    return georgianMonths[monthIndex];
  }
  DateTomorrow();
  return (
    <div className={styles.dateDiv}>
      <label className={styles.dateLabel}>დედლაინი</label>

      {/* <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        minDate={DateTomorrow()}
        dateFormat="dd.MM.yyyy"
        placeholderText="DD/MM/YYYY"
        customInput={<CustomInput />}
      /> */}
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        minDate={DateTomorrow()}
        dateFormat="dd.MM.yyyy"
        placeholderText="DD/MM/YYYY"
        customInput={<CustomInput />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div className={styles.headerContainer}>
            {/* <div className={styles.headerLeft}>
              <span className={styles.year}>{date.getFullYear()}</span>
            </div>
            <div className={styles.headerMiddle}>
              <span className={styles.month}>
                {getGeorgianMonth(date.getMonth())}
              </span>
            </div>
            <div className={styles.headerRight}>
              <button onClick={decreaseMonth} className={styles.arrowBtn}>
                ↑
              </button>
              <button onClick={increaseMonth} className={styles.arrowBtn}>
                ↓
              </button>
            </div> */}
          </div>
        )}
        calendarContainer={({ children }) => (
          <div className={styles.customCalendar}>
            {/* <div className={styles.dayNamesRow}>
              {["M", "T", "W", "T", "F", "S", "S"].map((letter, index) => (
                <div key={index} className={styles.dayName}>
                  {letter}
                </div>
              ))}
            </div> */}
            <div>{children}</div>
            {/* <div className={styles.footer}>
              <button onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleOk} className={styles.okBtn}>
                OK
              </button>
            </div> */}
          </div>
        )}
      />
    </div>
  );
}

export default Deadline;
