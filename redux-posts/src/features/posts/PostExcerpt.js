import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

const PostExcerpt = ({ post }) => {
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

export default PostExcerpt;
