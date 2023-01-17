import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ authorID }) => {
    const authors = useSelector(selectAllUsers);

    const author = authors.find((author) => author.id === Number(authorID));
    return (
        <p style={{ fontWeight: "600", display: "inline" }}>
            -{" "}
            {author ? (
                <Link to={`/user/${author.id}`}>{author.name}</Link>
            ) : (
                "Unknown Author"
            )}
        </p>
    );
};

export default PostAuthor;
