// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   userId: string | null;
// }

// const initialState: AuthState = {
//   userId: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUserId: (state, action: PayloadAction<string>) => {
//       state.userId = action.payload;
//     },
//     clearUserId: (state) => {
//       state.userId = null;
//     },
//   },
// });

// export const { setUserId, clearUserId } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  token: string | null;
}

const initialState: AuthState = {
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ userId: string; token: string }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    clearAuth: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setCredentials, setUserId, setToken, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
