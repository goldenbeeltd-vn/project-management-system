import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import activeCardReducer from "./activeCard/activeCardSlice";
import activeProjectReducer from "./activeProject/activeProjectSlice";

const reducers = combineReducers({
  activeProject: activeProjectReducer,
  activeCard: activeCardReducer,
});

export const store = configureStore({
  reducer: reducers,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using/63244831#63244831
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
