import styles from "./Description.module.css";

import Asterisk from "../assets/icons/Asterisk.svg";
import check from "../assets/icons/check.svg";
import checkRed from "../assets/icons/check-red.svg";
import checkGreen from "../assets/icons/check-green.svg";
function Description({ onChange, taskData }) {
  function handleChange(e) {
    onChange("description", e.target.value);
  }
  return (
    <div className={styles.nameDiv}>
      <label className={styles.nameLabel} htmlFor="description">
        <span className={styles.nameSpan}>აღწერა</span>
      </label>
      <textarea
        id="description"
        name="description"
        type="text"
        className={styles.descriptionInput}
        maxLength="255"
        value={taskData.description}
        onChange={handleChange}
      />
      <div className={styles.errorDiv}>
        <div className={styles.firstError}>
          {/* <img
            src={check}
            // src={
            //   nameErrors.length === null
            //     ? check
            //     : nameErrors.length
            //     ? checkGreen
            //     : checkRed
            // }
            className={styles.errorTick}
          /> */}
          <p
            className={styles.errorSpanOriginal}
            // className={
            //   nameErrors.length === null
            //     ? styles.errorSpanOriginal
            //     : nameErrors.length
            //     ? styles.errorSpanGreen
            //     : styles.errorSpanRed
            // }
          >
            მინიმუმ 4 სიტყვა
          </p>
        </div>
        <div className={styles.secondError}>
          {/* <img
            src={check}
            // src={
            //   nameErrors.letters === null
            //     ? check
            //     : nameErrors.letters
            //     ? checkGreen
            //     : checkRed
            // }
          /> */}
          <p
            className={styles.errorSpanOriginal}
            // className={
            //   nameErrors.letters === null
            //     ? styles.errorSpanOriginal
            //     : nameErrors.letters
            //     ? styles.errorSpanGreen
            //     : styles.errorSpanRed
            // }
          >
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;
