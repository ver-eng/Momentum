import styles from "./Deadline.module.css";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parseISO } from "date-fns";
import Asterisk from "../assets/icons/Asterisk.svg";
import dateIcon from "../assets/icons/dateIcon.svg";

function Deadline({ selectDate, taskData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  function handleDatePick(newDate) {
    if (newDate) {
      const parsedDate = format(newDate, "yyyy-MM-dd");

      // setSelectedDate(newDate);
      setSelectedDate(parsedDate);
      selectDate("due_date", parsedDate);
    }
    setOpen(false);
  }
  return (
    <div className={styles.dateDiv}>
      <div className={styles.departmentLabel}>
        <span className={styles.departmentSpan}>დედლაინი</span>
        <img src={Asterisk} className={styles.departmentImg} />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={taskData.due_date ? parseISO(taskData.due_date) : null}
          onChange={(newDate) => handleDatePick(newDate)}
          minDate={new Date()}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              className: styles.dateInput,
              onClick: () => setOpen(true),
              placeholder:
                taskData.due_date && taskData.due_date.length > 0
                  ? format(parseISO(taskData.due_date), "dd.MM.yyyy")
                  : "DD/MM/YYYY",
              readOnly: true,
              inputProps: {
                "aria-label": "Select a date",
              },
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={dateIcon}
                      alt="Calendar Icon"
                      className={styles.dateIcon}
                      onClick={() => setOpen(true)}
                    />
                  </InputAdornment>
                ),
                endAdornment: null,
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default Deadline;
