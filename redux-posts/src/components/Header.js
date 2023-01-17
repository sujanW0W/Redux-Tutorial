import React from "react";
import { Link } from "react-router-dom";
// import { increaseCount, getCount } from "../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    // const dispatch = useDispatch();
    // const count = useSelector(getCount);
    return (
        <header>
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="post">Post</Link>
                    </li>
                    <li>
                        <Link to="user">User</Link>
                    </li>
                </ul>
                {/* <button onClick={() => dispatch(increaseCount())}>
                    <span>{count}</span>
                </button> */}
            </nav>
        </header>
    );
};

export default Header;
