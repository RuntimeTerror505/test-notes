import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks";
import { INote } from "../../types";

interface IState {
  notes: INote[];
}

const initialState: IState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = [action.payload, ...state.notes];
    },
    sortByTitle: (state, action) => {
      if (action.payload === "asc") {
        state.notes = state.notes.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else {
        state.notes.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    sortByDateCreated: (state, action) => {
      if (action.payload === "asc") {
        state.notes.sort(
          (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
        );
      } else {
        state.notes.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    editNote: (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            id: note.id,
            title: action.payload.noteTitle,
            body: action.payload.noteBody,
            createdAt: note.createdAt,
          };
        } else {
          return note;
        }
      });
    },
  },
});

export const { addNote, deleteNote, editNote, sortByTitle, sortByDateCreated } =
  notesSlice.actions;

export const notesSelector = (state: RootState) => state.note;
export default notesSlice.reducer;
