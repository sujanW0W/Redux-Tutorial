import React from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";
import CreatePost from "./features/posts/CreatePost";

const App = () => {
    return (
        <main>
            <h1>Redux Data Flow Tutorial</h1>
            <hr />
            <CreatePost />
            <hr />
            <PostsList />
        </main>
    );
};

export default App;
