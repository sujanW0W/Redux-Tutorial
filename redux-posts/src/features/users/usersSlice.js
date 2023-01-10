import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = [
//     { id: 1, name: "Shree Ram" },
//     { id: 2, name: "Shree Krishna" },
//     { id: 3, name: "Hari" },
// ];

const initialState = {
    users: [],
    status: "idle", // Loading || Succeeded || Failed
    error: null,
};

const url = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get(url);
    return response.data;
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = "Loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.users = state.users.concat(action.payload);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.error.message;
            });
    },
});

// export const {} = usersSlice.actions

export const selectAllUsers = (state) => state.users.users;
export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;

export const getSingleUserById = (state, userId) =>
    state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;
