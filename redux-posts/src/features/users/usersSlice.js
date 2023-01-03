import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, name: "Shree Ram" },
    { id: 2, name: "Shree Krishna" },
    { id: 3, name: "Hari" },
];

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

// export const {} = usersSlice.actions

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
