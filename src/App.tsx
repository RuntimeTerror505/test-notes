import React, { useState } from "react";
import styles from "./app.module.css";
import Form from "./components/form/Form";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { notesSelector, sortByTitle } from "./store/reducers/noteReducer";
import { INote } from "./types";
import Note from "./components/note/Note";

const App = () => {
  const [search, setSearch] = useState<string>("");
  const { notes } = useAppSelector(notesSelector);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <Form />
      <div className={styles.filters}>
        <input
          className={styles.search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => dispatch(sortByTitle("asc"))}>
          Sort by title(asc)
        </button>
        <button onClick={() => dispatch(sortByTitle("desc"))}>
          Sort by title(desc)
        </button>
        <button onClick={() => dispatch(sortByTitle("asc"))}>
          Sort by date created(asc)
        </button>
        <button onClick={() => dispatch(sortByTitle("desc"))}>
          Sort by date created(desc)
        </button>
      </div>
      <div className={styles.notesContainer}>
        {notes.map((note: INote) => {
          if (note.body.includes(search) || note.title.includes(search)) {
            return <Note key={note.id} note={note} />;
          }
        })}
      </div>
    </div>
  );
};

export default App;
