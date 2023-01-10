import React from "react";
import { useSelector } from "react-redux";
import { getSingleUserById } from "./usersSlice";
import { useParams, Link } from "react-router-dom";
import { getPostByUserId } from "../posts/postsSlice";

export const SingleUserPosts = () => {
    const { userId } = useParams();

    const user = useSelector((state) =>
        getSingleUserById(state, Number(userId))
    );

    const posts = useSelector((state) =>
        getPostByUserId(state, Number(userId))
    );

    if (!user) {
        return (
            <section>
                <h2>User Not Found.</h2>
            </section>
        );
    }

    const postsByUser = posts.map((post, index) => {
        return (
            <li key={post.id}>
                <span>{++index}</span>{" "}
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
        );
    });

    return (
        <div className="usersSection">
            <h2>{user.name}</h2>
            <ul className="usersList">{postsByUser}</ul>
        </div>
    );
};

export default SingleUserPosts;
