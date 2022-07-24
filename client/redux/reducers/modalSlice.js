import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  mealInfo: {},
  modalSlideContent: [],
  modalSlideContentIndex: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.open = true;
    },
    closeModal(state) {
      state.open = false;
    },
    updateMealInfo(state, action) {
      state.mealInfo = action.payload;
    },
    updateModalSlideContent(state, action) {
      state.modalSlideContentIndex = 0;
      state.modalSlideContent = [];
      for (let source in action.payload) {
        state.modalSlideContent.push(action.payload[source]);
      }
    },
    updateSlideContent(state, action) {
      state.modalSlideContentIndex = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const {
  openModal,
  closeModal,
  updateMealInfo,
  updateModalSlideContent,
  updateSlideContent,
} = modalSlice.actions;
