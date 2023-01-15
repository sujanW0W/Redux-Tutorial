import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getSinglePostByID } from "./postsSlice";

const PostExcerpt = ({ postId }) => {
    const post = useSelector((state) => getSinglePostByID(state, postId));
    return (
        <article className="postArticle">
            <Link to={`post/${post.id}`}>
                <h3>{post.title}</h3>
                <p>{post.body.substring(0, 100)}...</p>
            </Link>
            <PostAuthor authorID={post.userId} />
            <TimeAgo timestamp={post.date} />
            <PostReactions postID={post.id} reactions={post.reactions} />
        </article>
    );
};

//export default React.memo(PostExcerpt);
//This is one way of preventing unwanted re-rendering. Basically, memo() skips the rendering if its props have not changed.
//There is better solution to this- State Normalization

export default PostExcerpt;
