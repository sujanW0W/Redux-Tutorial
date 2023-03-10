import {
    // createSlice,
    nanoid,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";

import { apiSlice } from "../api/apiSlice";

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

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// const initialState = {
//     posts: [],
//     status: "idle", //idle || loading || succeeded || failed
//     error: null,
//     count: 0,
// };

// For RTK
/*
const initialState = postAdapter.getInitialState({
    status: "idle", //idle || loading || succeeded || failed
    error: null,
    count: 0,
});

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

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (editedPost) => {
        try {
            const response = await axios.put(
                `${url}/${editedPost.id}`,
                editedPost
            );
            return response.data;
        } catch (error) {
            // console.log(error);
            return editedPost; //For testing Redux.
        }
    }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
    const response = await axios.delete(`${url}/${post.id}`);
    if (response.status === 200) return post;
    return `${response?.status}: ${response?.statusText}`;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: {
            //This is static way of creating a post.
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
            //const existingPost = state.posts.find((post) => postID === post.id);
            const existingPost = state.entities[postID];

            if (existingPost) existingPost.reactions[reactionName]++;
        },

        increaseCount: (state, action) => {
            state.count += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "Loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "Succeeded";
                // state.posts = state.posts.concat(action.payload);\
                postAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const { postAuthorID, postTitle, postContent } = action.payload;

                const formattedPost = {
                    userId: Number(postAuthorID),
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

                // state.posts.push(formattedPost);
                postAdapter.addOne(state, formattedPost);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Update could not complete!");
                    console.log(action.payload);
                    return;
                }

                // const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                // const otherPosts = state.posts.filter((post) => post.id !== id);
                // state.posts = [...otherPosts, action.payload];
                postAdapter.upsertOne(state, action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Delete could not complete!");
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                // const otherPosts = state.posts.filter((post) => post.id !== id);
                // state.posts = [...otherPosts];
                postAdapter.removeOne(state, id);
            });
    },
});

export const { createPost, addReaction, increaseCount } = postsSlice.actions;
*/

const initialState = postAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date)
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    if (!post?.reactions)
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };

                    return post;
                });

                return postAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                { type: "Post", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Post", id })),
            ],
        }),

        getPostsByUserId: builder.query({
            query: (id) => `/posts/?userId=${id}`,
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date)
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    if (!post?.reactions)
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };

                    return post;
                });

                return postAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map((id) => ({ type: "Post", id })),
            ],
        }),

        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: "/posts",
                method: "POST",
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    },
                },
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),

        updatePost: builder.mutation({
            query: (initialPost) => ({
                url: `/posts/${initialPost.id}`,
                method: "PUT",
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),

        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),

        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `/posts/${postId}`,
                method: "PATCH",
                body: { reactions },
            }),
            //Optimistic Updates

            async onQueryStarted(
                { postId, reactions },
                { dispatch, queryFulfilled }
            ) {
                //'updateQueryData' requires the endpoint name and cache key arguments, so it knows which piece of cache state to update
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData(
                        "getPosts",
                        undefined,
                        (draft) => {
                            //The draft is immer-wrapped and can be mutated like createSlice.
                            const post = draft.entities[postId];
                            if (post) post.reactions = reactions;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation,
} = extendedApiSlice;

//returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

//creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    (postResult) => postResult.data
);

export const {
    selectAll: selectAllPosts,
    selectById: getSinglePostByID,
    selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => selectPostsData(state) ?? initialState);

// export const selectAllPosts = (state) => state.posts.posts;
// export const getSinglePostByID = (state, postID) =>
//     state.posts.posts.find((post) => postID === post.id.toString());

/*
export const {
    selectAll: selectAllPosts,
    selectById: getSinglePostByID,
    selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts);

export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

// export const getPostByUserId = (state, userId) =>
//     state.posts.posts.filter((post) => post.userId === Number(userId));
//this filter is executed in every render of the header. This is because, the page has to figure out the filterate every time. The solution to this is to use createSelector.

//createSelector will only get executed when its input changes.
export const getPostByUserId = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.userId === userId)
);

// export default postsSlice.reducer;

*/
