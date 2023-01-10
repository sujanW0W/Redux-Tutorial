import React from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";
import CreatePost from "./features/posts/CreatePost";

import { SinglePagePost } from "./features/posts/SinglePagePost";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EditPost from "./features/posts/EditPost";

import { UsersList } from "./features/users/UsersList";
import { SingleUserPosts } from "./features/users/SingleUserPosts";

const App = () => {
    return (
        // <main>
        //     <h1>Redux Data Flow Tutorial</h1>
        //     <hr />
        //     <CreatePost />
        //     <hr />
        //     <PostsList />
        // </main>

        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />

                <Route path="post">
                    <Route index element={<CreatePost />} />
                    <Route path=":postID" element={<SinglePagePost />} />
                    <Route path="edit/:postID" element={<EditPost />} />
                </Route>
                <Route path="user">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<SingleUserPosts />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
