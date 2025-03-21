import styles from "./EachCardContent.module.css";
import CommentsIcon from "../assets/icons/CommentsIcon.svg";
import { format, parseISO } from "date-fns";
import { ka } from "date-fns/locale";
function EachCardContent({ each }) {
  function cutLongPara(para, number) {
    return para?.length > number ? para.slice(0, number) + "..." : para;
  }
  const departmentShortNames = {
    "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
    "გაყიდვები და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ტექნოლოგიების დეპარტამენტი": "ტექ. ინფ.",
    "მედიის დეპარტამენტი": "მედია",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "ლოჯოსტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ადამიანური რესურსების დეპარტამენტი": "ად. რესურსები",
  };
  return (
    <>
      <div className={styles.cardFirstLine}>
        <div className={styles.priorityNameDiv}>
          <div
            className={`${styles.priorityDiv} ${
              each.priority.id === 1
                ? styles.border1
                : each.priority.id === 2
                ? styles.border2
                : styles.border3
            }`}
          >
            <img
              src={each.priority.icon}
              alt="priority icon"
              className={styles.priorityImg}
            />
            <span
              className={`${styles.priorityName} ${
                each.priority.id === 1
                  ? styles.priority1
                  : each.priority.id === 2
                  ? styles.priority2
                  : styles.priority3
              }`}
            >
              {each.priority.name}
            </span>
          </div>
          <div
            className={`${styles.departmentNameDiv} ${
              each.department.id === 1 ? styles.colorDesign : ""
            } ${each.department.id === 2 ? styles.colorMarketing : ""} ${
              each.department.id === 3 ? styles.colorTeq : ""
            }
                               ${
                                 each.department.id === 4
                                   ? styles.colorMarketing
                                   : ""
                               } ${
              each.department.id === 5 ? styles.colorLogistics : ""
            } ${each.department.id === 6 ? styles.colorTeq : ""} ${
              each.department.id === 7 ? styles.colorLogistics : ""
            }`}
          >
            <p className={styles.departmentName}>
              {departmentShortNames[each.department.name] ||
                each.department.name}
            </p>
          </div>
        </div>
        <div className={styles.deadlineNameDiv}>
          <p className={styles.deadlineName}>
            {format(parseISO(each.due_date), "d MMMM, yyyy", {
              locale: ka,
            })}
          </p>
        </div>
      </div>
      <div className={styles.cardSecondLine}>
        <h3 className={styles.taskName}>{cutLongPara(each.name, 50)}</h3>
        <p className={styles.taskDescription}>
          {cutLongPara(each.description, 100)}
        </p>
      </div>
      <div className={styles.cardThirdLine}>
        <img src={each.employee.avatar} className={styles.employeeAvatar} />
        <div className={styles.commentsDiv}>
          <img src={CommentsIcon} className={styles.commentsIcon} />
          <span className={styles.commentsSpan}>{each.total_comments}</span>
        </div>
      </div>
    </>
  );
}

export default EachCardContent;
