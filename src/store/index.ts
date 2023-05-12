import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";

const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export { store };
