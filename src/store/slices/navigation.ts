import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILastPokemon } from "../../models";

export interface State {
  modalSearchVisible: boolean;
  lastPokemon: ILastPokemon | null;
  user: string;
}

const initialState: State = {
  modalSearchVisible: false,
  lastPokemon: null,
  user: "",
} as const;

export const slice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    showModalSearch: (state: State) => {
      state.modalSearchVisible = true;
    },
    hideModalSearch: (state: State) => {
      state.modalSearchVisible = false;
    },
    setLastPokemon: (state: State, action: PayloadAction<ILastPokemon | null>) => {
      state.lastPokemon = action.payload;
    },
    setUser: (state: State, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const navigationActions = slice.actions;
export default slice.reducer;
