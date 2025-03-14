import styles from "./Departments.module.css";
import Asterisk from "../assets/icons/Asterisk.svg";
// import check from "../assets/icons/check.svg";
// import checkRed from "../assets/icons/check-red.svg";
// import checkGreen from "../assets/icons/check-green.svg";
// import arrowDown from "../assets/icons/arrow-down.svg";

function Depatments() {
  return (
    <div className={styles.department}>
      <dev className={styles.departmentInnerDiv}>
        <label className={styles.departmentLabel} htmlFor="department_id">
          <span className={styles.departmentSpan}>დეპარტამენტი</span>
          <img src={Asterisk} className={styles.departmentImg} />
        </label>

        {/* <div className={styles.selectDiv}>
                    <select
                      id="department_id"
                      required
                      name="department_id"
                      defaultValue=""
                      className={`${styles.select} ${
                        isSelectOpen ? styles.openSelect : ""
                      }`}
                      onClick={handleSelectClick}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled hidden></option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    <img
                      src={arrowDown}
                      alt="Arrow"
                      className={`${styles.arrowIcon} ${
                        isSelectOpen ? styles.rotate : ""
                      }`}
                    />
                  </div> */}
        {/* <div ref={selectRef} className={styles.selectDiv}>
          <div
            className={`${styles.select} ${isOpen ? styles.openSelect : ""}`}
            onClick={toggleDropdown}
          >
            <span>{selectedOption || ""}</span>
            <img
              src={arrowDown}
              alt="Arrow"
              className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`}
            />
          </div> */}

        {/* {isOpen && (
            <ul className={styles.optionsList}>
              {departments.map((dept) => (
                <li
                  key={dept.id}
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(dept, dept.id)}
                >
                  {dept.name}
                </li>
              ))}
            </ul>
          )} */}
        {/* </div> */}
        <div className={styles.errorDiv}>
          <div className={styles.firstError}>
            <img
              // src={
              //   departError === null
              //     ? check
              //     : departError
              //     ? checkGreen
              //     : checkRed
              // }
              className={styles.errorTick}
            />
            <span
            // className={
            //   departError === null
            //     ? styles.errorSpanOriginal
            //     : departError
            //     ? styles.errorSpanGreen
            //     : styles.errorSpanRed
            // }
            >
              აირჩიე დეპარტამენტი
            </span>
          </div>
        </div>
      </dev>
    </div>
  );
}

export default Depatments;
