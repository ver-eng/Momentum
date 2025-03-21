import styles from "./AddEmployeeModal.module.css";
import React, { useState, useRef, useEffect } from "react";

import Asterisk from "../assets/icons/Asterisk.svg";
import check from "../assets/icons/check.svg";
import checkRed from "../assets/icons/check-red.svg";
import checkGreen from "../assets/icons/check-green.svg";
// import arrowUp from "../assets/icons/arrow-up.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import cancel from "../assets/icons/cancel.svg";
import galleryExport from "../assets/icons/gallery-export.svg";
// import information from "../assets/icons/information.svg";
import deleteIcon from "../assets/icons/trash-2.svg";
import axios from "axios";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = `https://momentum.redberryinternship.ge/api`;
const DEPARTMENT_URL = "https://momentum.redberryinternship.ge/api/departments";
const EMPLOYEE_URL = "https://momentum.redberryinternship.ge/api/employees";

function AddEmployeeModal({ show, onClose, fetchEmployee }) {
  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedOption, setSelectedOption] = useState("");
  const [deptID, setSeptId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const [nameErrors, setNameErrors] = useState({
    minLength: null,
    maxLength: null,
    letters: null,
  });
  const [surnameErrors, setSurnameErrors] = useState({
    minLength: null,
    maxLength: null,
    letters: null,
  });
  const [imgErrors, setImgErrors] = useState({
    type: null,
    size: null,
  });
  const [departError, setDepartError] = useState(null);

  useEffect(function () {
    async function fetchDepartments() {
      try {
        const response = await axios.get(DEPARTMENT_URL);

        setDepartments(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchDepartments();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function validateLetters(value) {
    return /^[ა-ჰa-zA-Z\s]+$/.test(value);
  }
  function isMinLengthValid(value) {
    return value.trim().length >= 2;
  }

  function isMaxLengthValid(value) {
    return value.trim().length <= 255;
  }

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    validateName(value);
  }
  function validateName(value) {
    setNameErrors((prevErrors) => ({
      ...prevErrors,
      minLength: isMinLengthValid(value),
      maxLength: isMaxLengthValid(value),
      letters: validateLetters(value),
    }));
  }
  function handleSurnameChange(e) {
    const value = e.target.value;
    setSurname(value);

    setSurnameErrors((prevErrors) => ({
      ...prevErrors,
      minLength: isMinLengthValid(value),
      maxLength: isMaxLengthValid(value),
      letters: validateLetters(value),
    }));
  }
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (dept) => {
    setSelectedOption(dept.name);
    setSeptId(dept.id);
    setDepartError(true);
    setIsOpen(false);
  };
  function handleImgChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }
    const isImage = selectedFile.type.startsWith("image/");
    const maxSize = 650 * 1024;
    const isValidSize = selectedFile.size <= maxSize;
    // console.log(selectedFile);
    // console.log(isImage);
    // console.log(isValidSize);
    setImgErrors((prev) => ({ ...prev, type: isImage, size: isValidSize }));
    // console.log(imgErrors);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFile(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  }
  function handleDeleteImage() {
    setImagePreview(null);
    setFile(null);
    setImgErrors((prev) => ({ ...prev, type: null, size: null }));

    const input = document.getElementById("avatar");
    if (input) input.value = "";
  }
  function isFormValid() {
    const isNameValid =
      nameErrors.minLength && nameErrors.letters && nameErrors.maxLength;
    if (!isNameValid) {
      setNameErrors((prevErrors) => ({
        ...prevErrors,
        minLength: isMinLengthValid(name),
        maxLength: isMaxLengthValid(name),
        letters: validateLetters(name),
      }));
      // setName("");
    }
    const isSurnameValid =
      surnameErrors.minLength &&
      surnameErrors.maxLength &&
      surnameErrors.letters;
    if (!isSurnameValid) {
      setSurnameErrors((prevErrors) => ({
        ...prevErrors,
        minLength: isMinLengthValid(surname),
        maxLength: isMaxLengthValid(surname),
        letters: validateLetters(surname),
      }));
      // setSurname("");
    }
    const isImgValid = imgErrors.type && imgErrors.size;
    if (!isImgValid) {
      handleDeleteImage();
      setImgErrors((prev) => ({ ...prev, type: false, size: false }));
    }
    const isDepartmentSelected = selectedOption.length !== 0;
    if (!isDepartmentSelected) {
      setDepartError(false);
    }
    return (
      isNameValid &&
      isSurnameValid &&
      isImgValid &&
      isDepartmentSelected &&
      file !== null
    );
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("department_id", deptID);
    formData.append("avatar", file);

    try {
      const response = await axios.post(EMPLOYEE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      console.log("Success:", response.data);
      await fetchEmployee();
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function handleCloseModal() {
    onClose();
    setName("");
    setSurname("");
    setSelectedOption("");
    setSeptId(null);
    setFile(null);
    setImagePreview(null);

    handleDeleteImage();

    setNameErrors({ minLength: null, maxLength: null, letters: null });
    setSurnameErrors({ minLength: null, maxLength: null, letters: null });
    setImgErrors({ type: null, size: null });
    setDepartError(null);
  }

  if (!show) return;
  return (
    <section className={styles.section} onClick={handleCloseModal}>
      <div className={styles.sectionDiv} onClick={(e) => e.stopPropagation()}>
        <div className={styles.mainCancelDiv}>
          <div className={styles.cancelDiv}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              <img
                src={cancel}
                alt="cancel button"
                className={styles.cancelImg}
              />
            </button>
          </div>
        </div>
        <div className={styles.addEmployeeDiv}>
          <h2 className={styles.addEmployeePara}>თანამშრომლის დამატება</h2>
        </div>
        <div className={styles.formDiv}>
          <form action="" onSubmit="" className={styles.form}>
            <div className={styles.nameSurnameDiv}>
              <div className={styles.nameDiv}>
                <label className={styles.nameLabel} htmlFor="name">
                  <span className={styles.nameSpan}>სახელი</span>
                  <img src={Asterisk} className={styles.nameImg} />
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={styles.nameInput}
                  value={name}
                  onChange={handleNameChange}
                />
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img
                      src={
                        nameErrors.minLength === null
                          ? check
                          : nameErrors.minLength
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <span
                      className={
                        nameErrors.minLength === null
                          ? styles.errorSpanOriginal
                          : nameErrors.minLength
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      მინიმუმ 2 სიმბოლო
                    </span>
                  </div>
                  <div className={styles.firstError}>
                    <img
                      src={
                        nameErrors.maxLength === null
                          ? check
                          : nameErrors.maxLength
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <span
                      className={
                        nameErrors.maxLength === null
                          ? styles.errorSpanOriginal
                          : nameErrors.maxLength
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      მაქსიმუმ 255 სიმბოლო
                    </span>
                  </div>
                  <div className={styles.secondError}>
                    <img
                      src={
                        nameErrors.letters === null
                          ? check
                          : nameErrors.letters
                          ? checkGreen
                          : checkRed
                      }
                    />
                    <span
                      className={
                        nameErrors.letters === null
                          ? styles.errorSpanOriginal
                          : nameErrors.letters
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      მხოლოდ ქართული ან ლათინური სიმბოლოები
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.surnameDiv}>
                <label className={styles.surnameLabel} htmlFor="surname">
                  <span className={styles.surnameSpan}>გვარი</span>
                  <img src={Asterisk} className={styles.surnameImg} />
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  required
                  className={styles.surnameInput}
                  value={surname}
                  onChange={handleSurnameChange}
                />
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img
                      src={
                        surnameErrors.minLength === null
                          ? check
                          : surnameErrors.minLength
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <span
                      className={
                        surnameErrors.minLength === null
                          ? styles.errorSpanOriginal
                          : surnameErrors.minLength
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      მინიმუმ 2 სიმბოლო
                    </span>
                  </div>
                  <div className={styles.firstError}>
                    <img
                      src={
                        surnameErrors.maxLength === null
                          ? check
                          : surnameErrors.maxLength
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <span
                      className={
                        surnameErrors.maxLength === null
                          ? styles.errorSpanOriginal
                          : surnameErrors.maxLength
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      მაქსიმუმ 255 სიმბოლო
                    </span>
                  </div>
                  <div className={styles.secondError}>
                    <img
                      src={
                        surnameErrors.letters === null
                          ? check
                          : surnameErrors.letters
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <span
                      className={
                        surnameErrors.letters === null
                          ? styles.errorSpanOriginal
                          : surnameErrors.letters
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      მხოლოდ ქართული ან ლათინური სიმბოლოები
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.avatar}>
              <div>
                <label htmlFor="avatar" className={styles.avatarLabel}>
                  <span className={styles.avatarSpan}>ავატარი</span>
                  <img
                    src={Asterisk}
                    alt="Asterisk"
                    className={styles.avatarImg}
                  />
                </label>

                <div className={styles.customFileUpload}>
                  {imagePreview ? (
                    <div className={styles.previewContainer}>
                      <img
                        src={imagePreview}
                        alt="Uploaded Photo"
                        className={styles.previewImg}
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage();
                        }}
                        className={styles.deleteButton}
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete Icon"
                          className={styles.deleteIcon}
                        />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.beforeUploadContainer}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById("avatar").click();
                        }}
                        className={styles.uploadButton}
                      >
                        <img
                          src={galleryExport}
                          alt="Upload photo Icon"
                          className={styles.beforeUploadIcon}
                        />
                      </button>
                      <span className={styles.uploadText}>ატვირთე ფოტო</span>
                    </div>
                  )}
                </div>

                <input
                  id="avatar"
                  type="file"
                  // accept="image/*"
                  className={styles.hiddenInput}
                  required
                  onChange={handleImgChange}
                />
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img
                      src={
                        imgErrors.type === null
                          ? check
                          : imgErrors.type
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <p
                      className={
                        imgErrors.type === null
                          ? styles.errorSpanOriginal
                          : imgErrors.type
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      ფაილი უნდა იყოს სურათი
                    </p>
                  </div>
                  <div className={styles.secondError}>
                    <img
                      src={
                        imgErrors.size === null
                          ? check
                          : imgErrors.size
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <span
                      className={
                        imgErrors.size === null
                          ? styles.errorSpanOriginal
                          : imgErrors.size
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      მაქსიმუმ 600kb ზომაში
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.department}>
              <dev className={styles.departmentInnerDiv}>
                <label
                  className={styles.departmentLabel}
                  htmlFor="department_id"
                >
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
                <div ref={selectRef} className={styles.selectDiv}>
                  <div
                    className={`${styles.select} ${
                      isOpen ? styles.openSelect : ""
                    }`}
                    onClick={toggleDropdown}
                  >
                    <span>{selectedOption || ""}</span>
                    <img
                      src={arrowDown}
                      alt="Arrow"
                      className={`${styles.arrowIcon} ${
                        isOpen ? styles.rotate : ""
                      }`}
                    />
                  </div>

                  {isOpen && (
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
                  )}
                </div>
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img
                      src={
                        departError === null
                          ? check
                          : departError
                          ? checkGreen
                          : checkRed
                      }
                      className={styles.errorTick}
                    />
                    <span
                      className={
                        departError === null
                          ? styles.errorSpanOriginal
                          : departError
                          ? styles.errorSpanGreen
                          : styles.errorSpanRed
                      }
                    >
                      აირჩიე დეპარტამენტი
                    </span>
                  </div>
                </div>
              </dev>
            </div>
            <div className={styles.buttonDiv}>
              <button
                className={styles.cancelBtnBelow}
                onClick={handleCloseModal}
              >
                გაუქმება
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                // disabled={!isFormValid}
                onClick={handleFormSubmit}
              >
                დაამატე თანამშრომელი
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeModal;
