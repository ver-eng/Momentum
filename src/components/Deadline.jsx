import styles from "./Deadline.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateIcon from "../assets/icons/dateIcon.svg";

function DateTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}
function Deadline() {
  const [dueDate, setDueDate] = useState(null);
  DateTomorrow();
  return (
    <div className={styles.dateDiv}>
      <label className={styles.dateLabel}>დედლაინი</label>
      <img src={dateIcon} alt="date icon" className={styles.dateIcon} />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        minDate={DateTomorrow()}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
      />
    </div>
  );
}

export default Deadline;
