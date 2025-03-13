import styles from "./AddEmployeeModal.module.css";
import React, { useState, useRef, useEffect } from "react";

import Asterisk from "../assets/icons/Asterisk.svg";
import check from "../assets/icons/check.svg";
import checkRed from "../assets/icons/check-red.svg";
import checkGreen from "../assets/icons/check-green.svg";
import arrowUp from "../assets/icons/arrow-up.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import cancel from "../assets/icons/cancel.svg";
import galleryExport from "../assets/icons/gallery-export.svg";
import information from "../assets/icons/information.svg";
import deleteIcon from "../assets/icons/trash-2.svg";
import axios from "axios";

const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = `https://momentum.redberryinternship.ge/api`;
const DEPARTMENT_URL = "https://momentum.redberryinternship.ge/api/departments";

function AddEmployeeModal({ show, onClose }) {
  // const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const selectRef = useRef(null);

  useEffect(function () {
    async function fetchDepartments() {
      try {
        const response = await axios.get(DEPARTMENT_URL);
        console.log(response.data);
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

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (dept) => {
    setSelectedOption(dept.name);
    // onSelect(dept);
    setIsOpen(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file!");
      return;
    }

    if (file.size > 600 * 1024) {
      alert("Image must be smaller than 600KB");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  if (!show) return;
  return (
    <section className={styles.section}>
      <div className={styles.sectionDiv}>
        <div className={styles.mainCancelDiv}>
          <div className={styles.cancelDiv}>
            <button className={styles.cancelBtn}>
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
                />
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img src={check} className={styles.errorTick} />
                    <span className={styles.errorSpan}>
                      მინიმუმ 2, მაქსიმუმ 255 სიმბოლო
                    </span>
                  </div>
                  <div className={styles.secondError}>
                    <img src={check} className={styles.errorTick} />
                    <span className={styles.errorSpan}>
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
                />
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img src={check} className={styles.errorTick} />
                    <span className={styles.errorSpan}>
                      მინიმუმ 2, მაქსიმუმ 255 სიმბოლო
                    </span>
                  </div>
                  <div className={styles.secondError}>
                    <img src={check} className={styles.errorTick} />
                    <span className={styles.errorSpan}>
                      მხოლოდ ქართული ან ლათინური სიმბოლოები
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={styles.avatar}>
              <div>
                <label className={styles.avatarLabel} for="avatar">
                  <span className={styles.avatarSpan}>ავატარი</span>
                  <img src={Asterisk} className={styles.avatarImg} />
                </label>
                <input type="file" accept="image/*" required />
              </div>
            </div> */}
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
                  <div className={styles.previewContainer}>
                    <img
                      src={imagePreview}
                      alt="Uploaded Photo"
                      className={styles.previewImg}
                    />
                    <img
                      src={deleteIcon}
                      alt="Delete Icon"
                      className={styles.previewIcon}
                    />
                  </div>

                  <div className={styles.placeholderContainer}>
                    <img
                      src={galleryExport}
                      alt="Upload photo Icon"
                      className={styles.placeholderIcon}
                    />
                    <span className={styles.uploadText}>ატვირთე ფოტო</span>
                  </div>
                </div>

                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className={styles.hiddenInput}
                  required
                />
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img src={check} className={styles.errorTick} />
                    <span className={styles.errorSpan}>
                      ფაილი უნდა იყოს სურათი
                    </span>
                  </div>
                  <div className={styles.secondError}>
                    <img src={check} className={styles.errorTick} />
                    <span className={styles.errorSpan}>
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
                          onClick={() => handleOptionClick(dept)}
                        >
                          {dept.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={styles.errorDiv}>
                  <div className={styles.firstError}>
                    <img src={check} className={styles.errorTick} />
                    <span className={styles.errorSpan}>
                      აირჩიე დეპარტამენტი
                    </span>
                  </div>
                </div>
              </dev>
            </div>
            <div className={styles.buttonDiv}>
              <button type="button" className={styles.cancelBtnBelow}>
                გაუქმება
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                // disabled={!isFormValid}
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
