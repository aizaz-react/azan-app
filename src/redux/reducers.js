import { createSlice } from "@reduxjs/toolkit";

const initialState = { calenderData: [], juzData: [], juzFilter: {} };

const counterSlice = createSlice({
  name: "Calender",
  initialState,
  reducers: {
    calenderUpdate(state, { payload }) {
      state.calenderData = payload;
    },
    juzAction(state, { payload }) {
      state.juzData = payload;
    },
    juzFilterAction(state, { payload }) {
      state.juzFilter = payload;
    },
  },
});

export const { calenderUpdate, juzAction, juzFilterAction } =
  counterSlice.actions;
export default counterSlice.reducer;
