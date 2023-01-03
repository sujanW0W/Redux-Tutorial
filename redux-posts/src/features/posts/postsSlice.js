import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: 1,
        title: "Learning Redux Toolkit.",
        content:
            "Redux is basically a framework built upon flux architecture. It is a state management system with other features.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
    {
        id: 2,
        title: "Growing in React.",
        content:
            "I have a basic beginner knowledge in React. I have developed few projects in React. Now, I am learning Redux for growing in React.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
];

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: {
            reducer: (state, action) => {
                state.push(action.payload);
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
            console.log(action);
            const { postID, reactionName } = action.payload;
            const existingPost = state.find((post) => postID === post.id);

            if (existingPost) existingPost.reactions[reactionName]++;
        },
    },
});

export const { createPost, addReaction } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
