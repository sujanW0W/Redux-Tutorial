import React from "react";

import { useDispatch } from "react-redux";
import { increment } from "../features/counter/counterSlice";

const IncrementButton = () => {
    const dispatch = useDispatch();

    return (
        <>
            <button
                className="counterBtn"
                onClick={() => dispatch(increment())}
            >
                +
            </button>
        </>
    );
};

export default IncrementButton;
