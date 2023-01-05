import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

import { Link } from "react-router-dom";

const PostExcerpt = ({ post }) => {
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

export default PostExcerpt;
