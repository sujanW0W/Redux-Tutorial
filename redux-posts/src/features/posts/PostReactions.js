import { useDispatch } from "react-redux";
// import { addReaction } from "./postsSlice";

import { useAddReactionMutation } from "./postsSlice";

import React from "react";

const reactionButtons = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};

const PostReactions = ({ postId, reactions }) => {
    // const dispatch = useDispatch();

    const [addReaction] = useAddReactionMutation();

    return (
        <div style={{ marginTop: "5px" }}>
            {Object.entries(reactionButtons).map(
                ([reactionName, reactionIcon]) => {
                    return (
                        <span
                            key={reactionName}
                            style={{ padding: "5px", cursor: "pointer" }}
                            onClick={() => {
                                // dispatch(addReaction({ postID, reactionName }))
                                const newValue = reactions[reactionName] + 1;
                                addReaction({
                                    postId,
                                    reactions: {
                                        ...reactions,
                                        [reactionName]: newValue,
                                    },
                                });
                            }}
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
