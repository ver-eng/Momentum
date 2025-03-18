import { Link } from "react-router-dom";
import addIcon from "../assets/icons/add.svg";
import logo from "../assets/images/logo.png";
import styles from "./Navigation.module.css";
import { useState } from "react";

function Navigation({ handleOpenModal }) {
  // const [showModal, setShowModal] = useState(false);
  // function handleOpenModal() {
  //   setShowModal(true);
  // }
  // function handleCloseModal() {
  //   setShowModal(false);
  // }
  return (
    <nav className={styles.nav}>
      <div className={styles.logoDiv}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.linksDiv}>
        <button className={styles.addEmployeeBtn} onClick={handleOpenModal}>
          თანამშრომლის შექმნა
        </button>
        <Link to="/newTask" className={styles.link}>
          <img src={addIcon} alt="Add Icon" className={styles.linkIcon} />
          <span className={styles.linkSpan}>შექმენი ახალი დავალება</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
