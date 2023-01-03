import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../features/counter/counterSlice";

const CounterReset = () => {
    const dispatch = useDispatch();
    return (
        <>
            <button
                className="counterResetBtn"
                onClick={() => dispatch(reset())}
            >
                Reset
            </button>
        </>
    );
};

export default CounterReset;
