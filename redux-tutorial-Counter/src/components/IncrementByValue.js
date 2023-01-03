import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementByValue } from "../features/counter/counterSlice";

const IncrementByValue = () => {
    const [value, setValue] = useState();
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const dispatch = useDispatch();

    return (
        <div className="changeByValueDiv">
            <input type="number" value={value} onChange={handleChange} />
            <button
                className="changeByValueBtn"
                onClick={() => dispatch(incrementByValue(value))}
            >
                Increment
            </button>
        </div>
    );
};

export default IncrementByValue;
