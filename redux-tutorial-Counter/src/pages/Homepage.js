import React from "react";
import IncrementButton from "../components/IncrementButton";
import DecrementButton from "../components/DecrementButton";
import CounterValue from "../components/CounterValue";
import CounterReset from "../components/CounterReset";
import IncrementByValue from "../components/IncrementByValue";
import DecrementByValue from "../components/DecrementByValue";
import "../assets/styles/homepage.css";

const Homepage = () => {
    return (
        <div className="homeBody">
            <h1>Counter</h1>

            <div className="counterSection">
                <DecrementButton />
                <CounterValue />
                <IncrementButton />
            </div>

            <div className="changeByValue">
                <IncrementByValue />
                <DecrementByValue />
            </div>
            <div className="resetDiv">
                <CounterReset />
            </div>
        </div>
    );
};

export default Homepage;
