import styles from "./AddEmployeeModal.module.css";
import { useEffect, useState } from "react";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [departments, setDepartments] = useState([]);

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
            <img
              src={cancel}
              alt="cancel button"
              className={styles.cancelImg}
            />
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
                    className={styles.asterisk}
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
                  <span className={styles.avatarSpan}>დეპარტამენტი</span>
                  <img src={Asterisk} className={styles.avatarImg} />
                </label>

                <div className="custom-select-wrapper">
                  <select
                    id="department_id"
                    required
                    name="department_id"
                    defaultValue=""
                  >
                    <option value="" disabled hidden></option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <img src={arrowDown} alt="Arrow" className="arrow-icon" />
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
            <div>
              <button type="button" className="cancel-button">
                გაუქმება
              </button>
              <button
                type="submit"
                className="submit-button"
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

// function AddEmployeeModal({ show, onClose }) {
//   const [name, setName] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [image, setImage] = useState(null);
//   const [department, setDepartment] = useState("");

//   const [nameError, setNameError] = useState("");
//   const [lastnameError, setLastnameError] = useState("");
//   const [imageError, setImageError] = useState("");
//   const [departmentError, setDepartmentError] = useState("");

//   const [imagePreview, setImagePreview] = useState(null);

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     setName(value);

//     // Validate name: minimum 2 characters, maximum 255, Georgian or English letters only
//     const nameRegex = /^[a-zA-Zა-ჰ]{2,255}$/;
//     if (!nameRegex.test(value)) {
//       setNameError(
//         "Name must be 2-255 characters long and contain only Georgian or English letters."
//       );
//     } else {
//       setNameError("");
//     }
//   };

//   const handleLastnameChange = (e) => {
//     const value = e.target.value;
//     setLastname(value);

//     // Validate lastname: minimum 2 characters, maximum 255, Georgian or English letters only
//     const lastnameRegex = /^[a-zA-Zა-ჰ]{2,255}$/;
//     if (!lastnameRegex.test(value)) {
//       setLastnameError(
//         "Lastname must be 2-255 characters long and contain only Georgian or English letters."
//       );
//     } else {
//       setLastnameError("");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       setImageError("Image is required.");
//       return;
//     }
//     // Validate file type and size
//     if (!file.type.startsWith("image/") || file.size > 600 * 1024) {
//       setImageError("Please upload a valid image file (less than 600KB).");
//       return;
//     }

//     setImageError("");
//     setImage(file);
//     setImagePreview(URL.createObjectURL(file)); // Set image preview
//   };

//   const handleDepartmentChange = (e) => {
//     const value = e.target.value;
//     setDepartment(value);
//     if (!value) {
//       setDepartmentError("Department is required.");
//     } else {
//       setDepartmentError("");
//     }
//   };

//   const handleDeleteImage = () => {
//     setImage(null);
//     setImagePreview(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Final validation before submitting
//     if (
//       name &&
//       lastname &&
//       image &&
//       department &&
//       !nameError &&
//       !lastnameError &&
//       !imageError &&
//       !departmentError
//     ) {
//       // Submit form
//       console.log("Form submitted:", { name, lastname, image, department });
//     }
//   };
//   if (!show) return;
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={handleNameChange} required />
//         {nameError && <p style={{ color: "red" }}>{nameError}</p>}
//       </div>
//       <div>
//         <label>Lastname:</label>
//         <input
//           type="text"
//           value={lastname}
//           onChange={handleLastnameChange}
//           required
//         />
//         {lastnameError && <p style={{ color: "red" }}>{lastnameError}</p>}
//       </div>
//       <div>
//         <label>Image:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
//         />
//         {imageError && <p style={{ color: "red" }}>{imageError}</p>}
//         {imagePreview && (
//           <div>
//             <img
//               src={imagePreview}
//               alt="Image preview"
//               style={{ maxWidth: "200px" }}
//             />
//             <button type="button" onClick={handleDeleteImage}>
//               Delete Image
//             </button>
//           </div>
//         )}
//       </div>
//       <div>
//         <label>Department:</label>
//         <input
//           type="text"
//           value={department}
//           onChange={handleDepartmentChange}
//           required
//         />
//         {departmentError && <p style={{ color: "red" }}>{departmentError}</p>}
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default AddEmployeeModal;
