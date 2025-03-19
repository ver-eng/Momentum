import { Link } from "react-router-dom";
import styles from "./RenderTaskCards.module.css";
import EachCardContent from "./EachCardContent";

function RenderTaskCards({ allTasks }) {
  const beginnerTasks = allTasks.filter((eachTask) => eachTask.status.id === 1);
  const progressTasks = allTasks.filter((eachTask) => eachTask.status.id === 2);
  const readyForTestingTasks = allTasks.filter(
    (eachTask) => eachTask.status.id === 3
  );
  const completedTasks = allTasks.filter(
    (eachTask) => eachTask.status.id === 4
  );

  const id = 5;

  return (
    <section className={styles.cardsSection}>
      <div className={styles.parentCardsDiv}>
        <ul className={styles.cardsColumn}>
          {beginnerTasks.length > 0
            ? beginnerTasks.map((each) => {
                return (
                  <li key={each.id}>
                    <Link to={`${each.id}`}>
                      <div
                        className={`${styles.eachCardDiv} ${styles.beginner}`}
                      >
                        <EachCardContent each={each} />
                      </div>
                    </Link>
                  </li>
                );
              })
            : ""}
        </ul>
        <ul className={styles.cardsColumn}>
          {progressTasks.length > 0
            ? progressTasks.map((each) => {
                return (
                  <li key={each.id}>
                    <Link to={`${each.id}`}>
                      <div
                        className={`${styles.eachCardDiv} ${styles.progress}`}
                      >
                        <EachCardContent each={each} />
                      </div>
                    </Link>
                  </li>
                );
              })
            : ""}
        </ul>
        <ul className={styles.cardsColumn}>
          {readyForTestingTasks.length > 0
            ? readyForTestingTasks.map((each) => {
                return (
                  <li key={each.id}>
                    <Link to={`${each.id}`}>
                      <div className={`${styles.eachCardDiv} ${styles.ready}`}>
                        <EachCardContent each={each} />
                      </div>
                    </Link>
                  </li>
                );
              })
            : ""}
        </ul>
        <ul className={styles.cardsColumn}>
          {completedTasks.length > 0
            ? completedTasks.map((each) => {
                return (
                  <li key={each.id}>
                    <Link to={`${each.id}`}>
                      <div
                        className={`${styles.eachCardDiv} ${styles.completed}`}
                      >
                        <EachCardContent each={each} />
                      </div>
                    </Link>
                  </li>
                );
              })
            : ""}
        </ul>
        {/* <ul className={styles.cardsColumn}>
          <li>
            <Link
              className={`${styles.eachCardDiv} ${styles.progress}`}
              to={`${id}`}
            ></Link>
          </li>
        </ul>
        <ul className={styles.cardsColumn}>
          <li>
            <Link
              className={`${styles.eachCardDiv} ${styles.readyForTesting}`}
              to={`${id}`}
            ></Link>
          </li>
        </ul>
        <ul className={styles.cardsColumn}>
          <li>
            <Link
              className={`${styles.eachCardDiv} ${styles.completed}`}
              to={`${id}`}
            ></Link>
          </li>
        </ul> */}
      </div>
    </section>
  );
}

export default RenderTaskCards;
