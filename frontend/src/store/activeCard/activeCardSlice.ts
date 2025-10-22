import { Card } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ActiveCardState {
  currentActiveCard: Card | null;
  isShowModalActiveCard: boolean;
}

const initialState: ActiveCardState = {
  currentActiveCard: null,
  isShowModalActiveCard: false,
};

export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true;
    },
    hideModalActiveCard: (state) => {
      state.isShowModalActiveCard = false;
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
      state.isShowModalActiveCard = false;
    },
    updateCurrentActiveCard: (state, action: PayloadAction<Card>) => {
      state.currentActiveCard = action.payload;
    },
  },
});

export const {
  showModalActiveCard,
  hideModalActiveCard,
  clearCurrentActiveCard,
  updateCurrentActiveCard,
} = activeCardSlice.actions;

// Selectors
export const selectActiveCard = (state: RootState) =>
  state.activeCard.currentActiveCard;
export const selectIsShowModalActiveCard = (state: RootState) =>
  state.activeCard.isShowModalActiveCard;

export default activeCardSlice.reducer;
