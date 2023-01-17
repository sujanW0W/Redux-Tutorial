import { useSelector, useDispatch } from "react-redux";
import {
    // selectAllPosts,
    selectPostIds,
    // getPostStatus,
    // getPostError,
    fetchPosts,
} from "./postsSlice";

import { useGetPostsQuery } from "./postsSlice";

// import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
    // const posts = useSelector((state) => state.posts);
    //This apprach is fine. But the problem occurs when the structure of the state changes i.e. if all the posts are no longer in state.posts . The solution is we can select all the posts in "postsSlice" file and export them, so that we can simply import them here. Doing this, if the structure of the state changes, we can simply change it in the "postsSlice" file, rather than changing in each component.

    const dispatch = useDispatch();
    // const posts = useSelector(selectAllPosts);

    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

    const orderedPostIds = useSelector(selectPostIds);
    // const postStatus = useSelector(getPostStatus);
    // const postError = useSelector(getPostError);

    //The posts have been fetched in index.js, i.e. fetched when the application loads. So, it is not required to fetch here.

    // useEffect(() => {
    //     if (postStatus === "idle") {
    //         dispatch(fetchPosts());
    //     }
    // }, [postStatus, dispatch]);

    // let content;
    // if (postStatus === "Loading") {
    //     content = <div>Loading...</div>;
    // } else if (postStatus === "Succeeded") {
    //     content = orderedPostIds.map((postId) => {
    //         return <PostExcerpt key={postId} postId={postId} />;
    //     });
    // } else if (postStatus === "Failed") {
    //     content = <div>{postError}</div>;
    // }

    let content;
    if (isLoading) content = <div>Loading...</div>;
    else if (isSuccess) {
        content = orderedPostIds.map((postId) => {
            return <PostExcerpt key={postId} postId={postId} />;
        });
    } else if (isError) content = <div>{error}</div>;

    return (
        <div className="postsSection">
            <h2>Posts</h2>
            <div className="articleSection">{content}</div>
        </div>
    );
};

export default PostsList;
