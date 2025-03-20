import { useState, useEffect, useCallback } from "react";
import styles from "./AddComments.module.css";
import axios from "axios";
import upasuxe from "../assets/icons/upasuxe.svg";
const API_TOKEN = "9e6a0a16-99cf-4a40-a05d-da24dfeff3d4";
const BASE_URL = "https://momentum.redberryinternship.ge/api";

function AddComments({ taskId }) {
  const [fetchedComments, setFetchedComments] = useState([]);
  const [addedComment, setAddedComment] = useState("");
  const [addedReply, setAddedReply] = useState("");
  const [replyOpenId, setReplyOpenId] = useState(null);
  const fetchTask = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${taskId}/comments`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      setFetchedComments(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [taskId]);
  useEffect(
    function () {
      fetchTask();
    },
    [taskId, fetchTask]
  );
  async function handleSubmit(e, messageName, parentId = null) {
    e.preventDefault();
    const trimmedComment =
      messageName === "comment" ? addedComment.trim() : addedReply.trim();
    if (!trimmedComment) return;
    const commentData = {
      text: trimmedComment,
      parent_id: parentId,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/tasks/${taskId}/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (messageName === "reply") {
        setReplyOpenId(null);
      }
      setAddedComment("");
      setAddedReply("");
      fetchTask();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => console.log(fetchedComments), [fetchedComments]);

  function handleReply(commentId) {
    setAddedReply("");
    setReplyOpenId((prev) => {
      if (prev === commentId) {
        return null;
      } else {
        return commentId;
      }
    });
  }
  return (
    <div className={styles.addCommentsDiv}>
      <div className={styles.addCommentsInnerDiv}>
        <form
          className={styles.addCommentsForm}
          onSubmit={(e) => handleSubmit(e, "comment")}
        >
          <div className={styles.commentsDiv}>
            <textarea
              className={styles.commentTextarea}
              placeholder="დაწერე კომენტარი"
              value={addedComment}
              onChange={(e) => setAddedComment(e.target.value)}
            ></textarea>
            <button type="submit" className={styles.submitButton}>
              დააკომენტარე
            </button>
          </div>
        </form>
        <div className={styles.headingDiv}>
          <h3 className={styles.commentsPara}>
            კომენტარები
            <span className={styles.commentsAmount}>
              {fetchedComments.length}
            </span>
          </h3>
        </div>
        <div className={styles.renderedCommentsDiv}>
          {fetchedComments.length > 0 ? (
            <ul className={styles.renderedCommentsUl}>
              {fetchedComments.map((eachComment) => (
                <li
                  className={styles.eachrenderedCommentsList}
                  key={eachComment.id}
                >
                  {/* <div> */}
                  <div className={styles.commentsAvatarDiv}>
                    <img
                      src={eachComment.author_avatar}
                      alt="photo"
                      className={styles.commentsAvatar}
                    />
                  </div>
                  <div className={styles.commentsdescription}>
                    <span className={styles.authorName}>
                      {eachComment.author_nickname}
                    </span>
                    <p className={styles.commentText}>{eachComment.text}</p>
                    <button
                      className={styles.replyBtn}
                      onClick={() => handleReply(eachComment.id)}
                    >
                      <img
                        src={upasuxe}
                        alt="reply icon"
                        className={styles.replyIcon}
                      />
                      <span className={styles.replySpan}>უპასუხე</span>
                    </button>
                    {replyOpenId === eachComment.id ? (
                      <form
                        className={styles.addReplyForm}
                        onSubmit={(e) =>
                          handleSubmit(e, "reply", eachComment.id)
                        }
                      >
                        <div className={styles.ReplyDiv}>
                          <textarea
                            className={styles.commentTextarea}
                            placeholder="დაწერე კომენტარი"
                            value={addedReply}
                            onChange={(e) => setAddedReply(e.target.value)}
                          ></textarea>
                          <button
                            type="submit"
                            className={styles.ReplySubmitButton}
                          >
                            დააკომენტარე
                          </button>
                        </div>
                      </form>
                    ) : (
                      ""
                    )}

                    {eachComment.sub_comments.length > 0 ? (
                      <ul className={styles.renderedReplyUl}>
                        {eachComment.sub_comments.map((eachsubCom) => (
                          <li
                            className={styles.eachrenderedReplyList}
                            key={eachsubCom.id}
                          >
                            <div className={styles.replyAvatarDiv}>
                              <img
                                src={eachsubCom.author_avatar}
                                alt="photo"
                                className={styles.replyAvatar}
                              />
                            </div>
                            <div className={styles.replydescription}>
                              <span className={styles.replyauthorName}>
                                {eachsubCom.author_nickname}
                              </span>
                              <p className={styles.replyText}>
                                {eachsubCom.text}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AddComments;
