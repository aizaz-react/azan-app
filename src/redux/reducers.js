import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calenderData: [],
  juzData: [],
  juzFilter: {},
  address: "",
};

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
    addressInfo(state, { payload }) {
      state.address = payload;
    },
  },
});

export const { calenderUpdate, juzAction, juzFilterAction, addressInfo } =
  counterSlice.actions;
export default counterSlice.reducer;
