import { useParams } from "react-router-dom";
import styles from "./TaskInnerPage.module.css";

function TaskInnerPage() {
  const { id } = useParams();
  console.log(id);
  return <div>Task Inner</div>;
}

export default TaskInnerPage;
