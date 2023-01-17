import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { createPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
// import { addNewPost } from "./postsSlice";

import { useAddNewPostMutation } from "./postsSlice";

const CreatePost = () => {
    const [addNewPost, { isLoading }] = useAddNewPostMutation();

    // const dispatch = useDispatch(); For RTK
    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postAuthorID, setPostAuthorID] = useState();
    // const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const handlePostTitle = (e) => setPostTitle(e.target.value);
    const handlePostContent = (e) => setPostContent(e.target.value);
    const handlePostAuthor = (e) => setPostAuthorID(e.target.value);

    const allowSubmit = () => {
        return (
            Boolean(postTitle) &&
            Boolean(postContent) &&
            Boolean(postAuthorID) &&
            // addRequestStatus === "idle"
            !isLoading
        );
    };

    const handleSubmit = async () => {
        try {
            // setAddRequestStatus("pending");

            if (postTitle && postContent) {
                /* await dispatch(
                    // createPost({
                    //     id: nanoid(),
                    //     title: postTitle,
                    //     content: postContent,
                    // })
                    //Here, we have customized payload on our own. But we can customize the payload in the reducers function in the "slice" file. By cutomizing the payload in the reducer function, the benefit we will get is that we will no longer need to cutomize the payload every time as reducer function will handle it. Check it out.

                    // createPost(postTitle, postContent, postAuthorID)

                    addNewPost({ postAuthorID, postTitle, postContent })
                ); */

                await addNewPost({
                    userId: postAuthorID,
                    title: postTitle,
                    body: postContent,
                });

                setPostTitle("");
                setPostContent("");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
        //finally {
        //     setAddRequestStatus("idle");
        // }
    };

    const authors = useSelector(selectAllUsers);
    const selectAuthor = authors.map((author) => {
        return (
            <option key={author.id} value={author.id}>
                {author.name}
            </option>
        );
    });

    return (
        <div className="createPostSection">
            <h2>Create Post</h2>
            <div className="inputLabel">
                <label htmlFor="postTitle">Post Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={postTitle}
                    onChange={handlePostTitle}
                />
            </div>
            <div className="inputLabel">
                <label htmlFor="postAuthor">Post Author: </label>
                <select
                    name="postAuthor"
                    id="postAuthor"
                    onChange={handlePostAuthor}
                >
                    <option value=""></option>
                    {selectAuthor}
                </select>
            </div>
            <div className="inputLabel">
                <label htmlFor="postContent">Post Content: </label>
                <textarea
                    name="postContent"
                    id="postContent"
                    value={postContent}
                    onChange={handlePostContent}
                ></textarea>
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={!allowSubmit()}
            >
                Submit
            </button>
        </div>
    );
};

export default CreatePost;
