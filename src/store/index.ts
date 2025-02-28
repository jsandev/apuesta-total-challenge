import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import navigation from "./slices/navigation";

export const store = configureStore({
  reducer: {
    navigation,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
