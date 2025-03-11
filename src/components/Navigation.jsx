import { Link } from "react-router-dom";
import addIcon from "../assets/icons/add.svg";
import logo from "../assets/images/logo.png";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoDiv}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.linksDiv}>
        <button className={styles.addEmployeeBtn}>თანამშრომლის შექმნა</button>
        <Link to="/newTask">
          <img src={addIcon} alt="Add Icon" />
          <span>შექმენი ახალი დავალება</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
