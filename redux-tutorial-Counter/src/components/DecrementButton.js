import React from "react";

import { useDispatch } from "react-redux";
import { decrement } from "../features/counter/counterSlice";

const DecrementButton = () => {
    const dispatch = useDispatch();
    return (
        <>
            <button
                className="counterBtn"
                onClick={() => dispatch(decrement())}
            >
                -
            </button>
        </>
    );
};

export default DecrementButton;
