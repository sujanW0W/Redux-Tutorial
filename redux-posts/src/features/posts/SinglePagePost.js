import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

import { useSelector, useDispatch } from "react-redux";
import { getSinglePostByID, deletePost } from "./postsSlice";

import { useParams, Link, useNavigate } from "react-router-dom";

export const SinglePagePost = () => {
    //Get post id from params
    const { postID } = useParams();
    const post = useSelector((state) => getSinglePostByID(state, postID));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!post) {
        return (
            <section>
                <h2>Post Not Found!</h2>
            </section>
        );
    }

    const handleDeletePost = async () => {
        await dispatch(deletePost({ id: post.id }));
        navigate("/");
    };

    return (
        <article className="postArticle">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <PostAuthor authorID={post.userId} />
            <TimeAgo timestamp={post.date} />
            <p id="editPostLink">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <span
                    style={{ paddingLeft: "10px", cursor: "pointer" }}
                    onClick={handleDeletePost}
                >
                    Delete Post
                </span>
            </p>
            <PostReactions postID={post.id} reactions={post.reactions} />
        </article>
    );
};
