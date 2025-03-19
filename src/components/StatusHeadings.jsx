import styles from "./StatusHeadings.module.css";
function StatusHeadings() {
  return (
    <section className={styles.statusSection}>
      <div className={styles.statusWrapper}>
        <div className={styles.firstStatus}>
          <span>დასაწყები</span>
        </div>
        <div className={styles.secondStatus}>
          <span>პროგრესში</span>
        </div>
        <div className={styles.thirdStatus}>
          <span>მზად ტესტირებისთვის</span>
        </div>
        <div className={styles.fourthStatus}>
          <span>დასრულებული</span>
        </div>
      </div>
    </section>
  );
}

export default StatusHeadings;
