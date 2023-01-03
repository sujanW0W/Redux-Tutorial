import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementByValue } from "../features/counter/counterSlice";

const DecrementByValue = () => {
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
                onClick={() => dispatch(decrementByValue(value))}
            >
                Decrement
            </button>
        </div>
    );
};

export default DecrementByValue;
