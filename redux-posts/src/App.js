import React from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";
import CreatePost from "./features/posts/CreatePost";

import { SinglePagePost } from "./features/posts/SinglePagePost";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

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
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
