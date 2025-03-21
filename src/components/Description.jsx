import styles from "./Description.module.css";

import Asterisk from "../assets/icons/Asterisk.svg";
import check from "../assets/icons/check.svg";
import checkRed from "../assets/icons/check-red.svg";
import checkGreen from "../assets/icons/check-green.svg";
function Description({ onChange, taskData, dataValidation }) {
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
        className={`${styles.descriptionInput} ${
          !dataValidation.description.isTyped
            ? styles.nameInputOriginal
            : dataValidation.description.min && dataValidation.description.max
            ? styles.nameInputGreen
            : styles.nameInputRed
        }`}
        // maxLength="255"
        value={taskData.description}
        onChange={handleChange}
      />
      <div className={styles.errorDiv}>
        <div className={styles.firstError}>
          <p
            className={
              !dataValidation.description.isTyped
                ? styles.errorSpanOriginal
                : dataValidation.description.min
                ? styles.errorSpanGreen
                : styles.errorSpanRed
            }
          >
            მინიმუმ 4 სიტყვა
          </p>
        </div>
        <div className={styles.secondError}>
          <p
            className={
              !dataValidation.description.isTyped
                ? styles.errorSpanOriginal
                : dataValidation.description.max
                ? styles.errorSpanGreen
                : styles.errorSpanRed
            }
          >
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;
