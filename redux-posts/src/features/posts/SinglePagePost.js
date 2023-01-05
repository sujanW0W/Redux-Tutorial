import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

import { useSelector } from "react-redux";
import { getSinglePostByID } from "./postsSlice";

import { useParams } from "react-router-dom";

export const SinglePagePost = () => {
    //Get post id from params
    const { postID } = useParams();
    const post = useSelector((state) =>
        getSinglePostByID(state, Number(postID))
    );

    if (!post) {
        return (
            <section>
                <h2>Post Not Found!</h2>
            </section>
        );
    }

    return (
        <article className="postArticle">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <PostAuthor authorID={post.userId} />
            <TimeAgo timestamp={post.date} />
            <PostReactions postID={post.id} reactions={post.reactions} />
        </article>
    );
};
