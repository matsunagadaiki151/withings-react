import { createSlice } from "@reduxjs/toolkit";

export type EnvState = {
  endpoint: string;
};

const initialState: EnvState = {
  endpoint: "",
};

export const envSlice = createSlice({
  name: "env",
  initialState,
  reducers: {
    setEndpoint: (state, action) => {
      state.endpoint = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEndpoint } = envSlice.actions;

export default envSlice.reducer;
