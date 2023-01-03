import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ authorID }) => {
    const authors = useSelector(selectAllUsers);

    const author = authors.find((author) => author.id === Number(authorID));
    return (
        <p style={{ fontWeight: "600", display: "inline" }}>
            - {author ? author.name : "Unknown Author"}
        </p>
    );
};

export default PostAuthor;
