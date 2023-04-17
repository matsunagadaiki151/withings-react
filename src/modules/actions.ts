import { createSlice } from "@reduxjs/toolkit";
import { EnvState, WeightsState } from "../type/types";

const initialEnvState: EnvState = {
  endpoint: "",
};

const initialWeightState: WeightsState = {
  weights: {},
};

export const envSlice = createSlice({
  name: "env",
  initialState: initialEnvState,
  reducers: {
    setEndpoint: (state, action) => {
      state.endpoint = action.payload;
    },
  },
});

export const weightsSlice = createSlice({
  name: "weights",
  initialState: initialWeightState,
  reducers: {
    setWeights: (state, action) => {
      state.weights = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEndpoint } = envSlice.actions;
export const { setWeights } = weightsSlice.actions;

const envReducer = envSlice.reducer;
const weightsReducer = weightsSlice.reducer;

export { envReducer, weightsReducer };
