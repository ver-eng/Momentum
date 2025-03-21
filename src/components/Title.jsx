import styles from "./Title.module.css";
import Asterisk from "../assets/icons/Asterisk.svg";
import check from "../assets/icons/check.svg";
import checkRed from "../assets/icons/check-red.svg";
import checkGreen from "../assets/icons/check-green.svg";
import { useState, useEffect } from "react";
function Title({ titleChange, taskData, dataValidation }) {
  function handleChange(e) {
    titleChange("name", e.target.value);
  }
  return (
    <div className={styles.nameDiv}>
      <label className={styles.nameLabel} htmlFor="name">
        <span className={styles.nameSpan}>სათაური</span>
        <img src={Asterisk} className={styles.nameImg} />
      </label>
      <input
        id="name"
        name="name"
        type="text"
        className={`${styles.nameInput}

        ${
          (dataValidation.name.min === null) &
          (dataValidation.name.max === null)
            ? styles.nameInputOriginal
            : dataValidation.name.min === false ||
              dataValidation.name.max === false
            ? styles.nameInputRed
            : styles.nameInputGreen
        } `}
        value={taskData.name}
        onChange={handleChange}
      />
      <div className={styles.errorDiv}>
        <div className={styles.firstError}>
          <p
            className={
              dataValidation.name.min === null
                ? styles.errorSpanOriginal
                : dataValidation.name.min === false
                ? styles.errorSpanRed
                : styles.errorSpanGreen
            }
          >
            მინიმუმ 3 სიმბოლო
          </p>
        </div>
        <div className={styles.secondError}>
          <p
            className={
              dataValidation.name.max === null
                ? styles.errorSpanOriginal
                : dataValidation.name.max === false
                ? styles.errorSpanRed
                : styles.errorSpanGreen
            }
          >
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>
      </div>
    </div>
  );
}

export default Title;
