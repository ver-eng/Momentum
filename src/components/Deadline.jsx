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
  DateTomorrow();
  return (
    <div className={styles.dateDiv}>
      <label className={styles.dateLabel}>დედლაინი</label>

      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        minDate={DateTomorrow()}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
        customInput={<CustomInput />}
      />
    </div>
  );
}

export default Deadline;
