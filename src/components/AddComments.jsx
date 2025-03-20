import styles from "./AddComments.module.css";

function AddComments() {
  return (
    <div className={styles.addCommentsDiv}>
      <div className={styles.addCommentsInnerDiv}>
        <form className={styles.addCommentsForm}>
          <textarea
            className={styles.commentTextarea}
            placeholder="დაწერე კომენტარი"
            rows="4"
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            დააკომენტარე
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddComments;
