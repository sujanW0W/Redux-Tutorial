import { useDispatch } from "react-redux";
import { addReaction } from "./postsSlice";

import React from "react";

const reactionButtons = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};

const PostReactions = ({ postID, reactions }) => {
    const dispatch = useDispatch();

    return (
        <div style={{ marginTop: "5px" }}>
            {Object.entries(reactionButtons).map(
                ([reactionName, reactionIcon]) => {
                    return (
                        <span
                            key={reactionName}
                            style={{ padding: "5px", cursor: "pointer" }}
                            onClick={() =>
                                dispatch(addReaction({ postID, reactionName }))
                            }
                        >
                            {reactionIcon} {reactions[reactionName]}
                        </span>
                    );
                }
            )}
        </div>
    );
};

export default PostReactions;
