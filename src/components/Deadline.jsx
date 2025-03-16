import styles from "./Deadline.module.css";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Asterisk from "../assets/icons/Asterisk.svg";
import dateIcon from "../assets/icons/dateIcon.svg";

function Deadline() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dateDiv}>
      <div className={styles.departmentLabel}>
        <span className={styles.departmentSpan}>დედლაინი</span>
        <img src={Asterisk} className={styles.departmentImg} />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={selectedDate}
          onChange={(newDate) => {
            setSelectedDate(newDate);
            setOpen(false);
          }}
          minDate={new Date()}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              className: styles.dateInput,
              onClick: () => setOpen(true),
              placeholder: "DD/MM/YYYY",
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
