import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

const PostsList = () => {
    // const posts = useSelector((state) => state.posts);
    //This apprach is fine. But the problem occurs when the structure of the state changes i.e. if all the posts are no longer in state.posts . The solution is we can select all the posts in "postsSlice" file and export them, so that we can simply import them here. Doing this, if the structure of the state changes, we can simply change it in the "postsSlice" file, rather than changing in each component.

    const posts = useSelector(selectAllPosts);

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => {
        return (
            <article key={post.id} className="postArticle">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <PostAuthor authorID={post.authorID} />
                <TimeAgo timestamp={post.date} />
                <PostReactions postID={post.id} reactions={post.reactions} />
            </article>
        );
    });

    return (
        <div className="postsSection">
            <h2>Posts</h2>
            <div className="articleSection">{renderedPosts}</div>
        </div>
    );
};

export default PostsList;
