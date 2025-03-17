import styles from "./Title.module.css";
import Asterisk from "../assets/icons/Asterisk.svg";
import check from "../assets/icons/check.svg";
import checkRed from "../assets/icons/check-red.svg";
import checkGreen from "../assets/icons/check-green.svg";
function Title({ titleChange, taskData }) {
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
        required
        className={styles.nameInput}
        value={taskData.name}
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
            მინიმუმ 3 სიმბოლო
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

export default Title;
