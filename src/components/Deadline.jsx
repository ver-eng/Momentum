import styles from "./Deadline.module.css";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parseISO, addDays } from "date-fns";
import Asterisk from "../assets/icons/Asterisk.svg";
import dateIcon from "../assets/icons/dateIcon.svg";

function Deadline({ selectDate, taskData, dataValidation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
  // function handleDatePick(newDate) {
  //   if (newDate) {
  //     const parsedDate = format(newDate, "yyyy-MM-dd'T'00:00:00'Z'");

  //     setSelectedDate(parsedDate);
  //     selectDate("due_date", parsedDate);
  //   }
  //   setOpen(false);
  // }
  function handleDatePick(e) {
    const newDate = e.target.value;
    if (newDate) {
      const parsedDate = format(new Date(newDate), "yyyy-MM-dd'T'00:00:00'Z'");
      selectDate("due_date", parsedDate);
    }
  }

  return (
    <div className={styles.dateDiv}>
      <div className={styles.departmentLabel}>
        <span className={styles.departmentSpan}>დედლაინი</span>
        <img src={Asterisk} className={styles.departmentImg} />
      </div>
      <input
        type="date"
        className={`${styles.dateInput} ${
          dataValidation.due_date === null
            ? styles.nameInputOriginal
            : dataValidation.due_date === false
            ? styles.nameInputRed
            : styles.nameInputGreen
        }`}
        min={format(new Date(), "yyyy-MM-dd")}
        value={
          taskData.due_date
            ? format(parseISO(taskData.due_date), "yyyy-MM-dd")
            : tomorrow
        }
        onChange={handleDatePick}
      />

      <div className={styles.errorDiv}>
        <div className={styles.firstError}>
          <p
            className={
              dataValidation.due_date === null
                ? styles.errorSpanOriginal
                : dataValidation.due_date === false
                ? styles.errorSpanRed
                : styles.errorSpanGreen
            }
          >
            აირჩიე დედლაინი
          </p>
        </div>
      </div>
    </div>
  );
}

export default Deadline;
