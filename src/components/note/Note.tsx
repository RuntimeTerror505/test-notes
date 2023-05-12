import React, { FC, useState } from "react";
import styles from "./note.module.css";
import { useAppDispatch } from "../../store/hooks";
import {
  addNote,
  deleteNote,
  editNote,
} from "../../store/reducers/noteReducer";
import { INote } from "../../types";

interface IProps {
  note: INote;
}

const Note: FC<IProps> = ({ note }) => {
  const [isEditted, setIsEditted] = useState<boolean>(false);
  const [edittedTitle, setEdditedTitle] = useState<string>("");
  const [edittedBody, setEdditedBody] = useState<string>("");
  const dispatch = useAppDispatch();
  const { title, body, createdAt, id } = note;

  const deleteHandler = () => {
    dispatch(deleteNote(id));
  };

  const editHandler = () => {
    setEdditedTitle(title);
    setEdditedBody(body);
    setIsEditted(true);
  };

  const cancelHandler = () => {
    setIsEditted(false);
  };

  const saveHandler = () => {
    dispatch(
      editNote({ id: id, noteTitle: edittedTitle, noteBody: edittedBody })
    );
    setIsEditted(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        {isEditted ? (
          <input
            className={styles.titleInput}
            value={edittedTitle}
            onChange={(e) => setEdditedTitle(e.target.value)}
          />
        ) : (
          <h2 className={styles.title}>{title}</h2>
        )}
        {isEditted ? (
          <textarea
            className={styles.bodyInput}
            value={edittedBody}
            onChange={(e) => setEdditedBody(e.target.value)}
          />
        ) : (
          <p className={styles.body}>{body}</p>
        )}
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.buttons}>
          {isEditted ? (
            <div>
              <button onClick={cancelHandler} className={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={saveHandler} className={styles.saveBtn}>
                Save
              </button>
            </div>
          ) : (
            <button className={styles.editBtn} onClick={editHandler}>
              Edit
            </button>
          )}
          <button className={styles.deleteBtn} onClick={deleteHandler}>
            Delete
          </button>
        </div>
        <h3 className={styles.createdAt}>{createdAt}</h3>
      </div>
    </div>
  );
};

export default Note;
