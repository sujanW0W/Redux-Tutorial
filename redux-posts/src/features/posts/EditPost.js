import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";
import { getSinglePostByID, updatePost } from "../posts/postsSlice";

const EditPost = () => {
    const dispatch = useDispatch();

    const { postID } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => getSinglePostByID(state, postID));
    const users = useSelector(selectAllUsers);

    const [postTitle, setPostTitle] = useState(post?.title);
    const [postUserId, setPostUserId] = useState(post?.userId);
    const [postContent, setPostContent] = useState(post?.body);
    const [requestStatus, setRequestStatus] = useState("idle");

    const handlePostTitle = (e) => setPostTitle(e.target.value);
    const handlePostAuthor = (e) => setPostUserId(e.target.value);
    const handlePostContent = (e) => setPostContent(e.target.value);

    if (!post) {
        return (
            <section>
                <h2>Post Not Found!</h2>
            </section>
        );
    }

    const allowSubmit = () => {
        return (
            Boolean(postTitle) &&
            Boolean(postUserId) &&
            Boolean(postContent) &&
            requestStatus === "idle"
        );
    };

    const selectAuthor = users.map((user) => {
        return (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        );
    });

    const handleSubmit = async () => {
        try {
            setRequestStatus("pending");
            await dispatch(
                updatePost({
                    id: post.id,
                    userId: postUserId,
                    title: postTitle,
                    body: postContent,
                    reactions: post.reactions,
                })
            );

            setPostTitle("");
            setPostContent("");

            navigate(`/post/${postID}`);
        } catch (error) {
            console.log(error);
        } finally {
            setRequestStatus("idle");
        }
    };

    return (
        <div className="createPostSection">
            <h2>Edit Post</h2>
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
                    defaultValue={postUserId}
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

export default EditPost;
