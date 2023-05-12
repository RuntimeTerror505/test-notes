import React, { FC, useState } from "react";
import styles from "./form.module.css";
import { useAppDispatch } from "../../store/hooks";
import { addNote } from "../../store/reducers/noteReducer";

interface IProps {}

const Form: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const submitFromHandler = (e: any) => {
    e.preventDefault();
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    dispatch(
      addNote({
        id: new Date().valueOf(),
        title: title,
        body: note,
        createdAt: dateTime,
      })
    );

    setTitle("");
    setNote("");
  };
  return (
    <form className={styles.container} onSubmit={submitFromHandler}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Enter note"
        value={note}
        onChange={(e: any) => setNote(e.target.value)}
      />
      <button className={styles.btn} type="submit">
        Save note
      </button>
    </form>
  );
};

export default Form;
