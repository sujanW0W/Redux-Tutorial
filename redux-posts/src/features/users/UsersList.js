import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

export const UsersList = () => {
    const users = useSelector(selectAllUsers);

    const allUsers = users.map((user, index) => {
        return (
            <li key={user.id}>
                <span>{++index}</span>{" "}
                <Link to={`/user/${user.id}`}>{user.name}</Link>
            </li>
        );
    });

    return (
        <div className="usersSection">
            <h2>Users</h2>
            <ul className="usersList">{allUsers}</ul>
        </div>
    );
};
