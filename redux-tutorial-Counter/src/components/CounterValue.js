import React from "react";

import { useSelector } from "react-redux";

const CounterValue = () => {
    const count = useSelector((state) => state.counter.count);
    return (
        <>
            <p id="counterValue">{count}</p>
        </>
    );
};

export default CounterValue;
