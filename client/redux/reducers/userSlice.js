import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  link: "",
  name: "",
  loggedIn: false,
  info: {}, // for now should have university and have favorite food (possibily an array)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.name = "";
      state.link = "";
      state.loggedIn = false;
    },
    updateInfo(state, action) {
      const newInformation = action.payload;
      state.name = newInformation.name;
      state.info = newInformation.info;
    },
  },
  extraReducers(builder) {
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      console.log(action.payload.user);
      if (action.payload.user !== null) {
        const name = action.payload.user.name;
        const link = action.payload.redirectLink;
        if (name) {
          // meaning if the user is already logged in
          state.loggedIn = true;
        } else {
          state.loggedIn = false;
        }
        state.name = name;
        state.link = link;
      } else {
        state.name = "";
        state.link = "";
        state.loggedIn = false;
      }
    });
  },
});

export const checkLogin = createAsyncThunk(
  "user/checkLogin",
  // function has empty argument parameter
  async () => {
    const url = "http://127.0.0.1:3001/auth/profile";
    const user = await fetch(url, { credentials: "include" }).then((response) =>
      response.json()
    );
    console.log(user);
    return user;
  }
);

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
