import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// const initialState = [
//     {
//         id: 1,
//         title: "Learning Redux Toolkit.",
//         content:
//             "Redux is basically a framework built upon flux architecture. It is a state management system with other features.",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         },
//     },
//     {
//         id: 2,
//         title: "Growing in React.",
//         content:
//             "I have a basic beginner knowledge in React. I have developed few projects in React. Now, I am learning Redux for growing in React.",
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         },
//     },
// ];

const initialState = {
    posts: [],
    status: "idle", //idle || loading || succeeded || failed
    error: null,
};

const url = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(url);

    let min = 1;
    const fetchedData = response.data.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        };
        return post;
    });
    return fetchedData;
});

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (newPost) => {
        const response = await axios.post(url, newPost);
        return response.data;
    }
);

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
            },
            prepare: (title, content, authorID) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        authorID,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    },
                };
            },
        },
        //If we do not want to perform any customization in payload, we can simply return the reducer function, which we do normally. But if we want to customize the payload, we can do it here with the help of "prepare callback". Basically, rather than just a reducer function, a reducer will be an object with two properties, reducer and prepare. reducer will be an reducer function and prepare will be the function that returns the customized payload.

        addReaction: (state, action) => {
            const { postID, reactionName } = action.payload;
            const existingPost = state.posts.find((post) => postID === post.id);

            if (existingPost) existingPost.reactions[reactionName]++;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "Loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const { postAuthorID, postTitle, postContent } = action.payload;

                const formattedPost = {
                    userId: postAuthorID,
                    id: nanoid(),
                    title: postTitle,
                    body: postContent,
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    },
                };

                state.posts.push(formattedPost);
            });
    },
});

export const { createPost, addReaction } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export default postsSlice.reducer;
