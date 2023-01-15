import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";

import {
    useGetTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();

    const [createTodo] = useCreateTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const [inputTodo, setInputTodo] = useState("");

    const handleInputTodo = (e) => {
        setInputTodo(e.target.value);
    };

    const handleSubmit = () => {
        const todo = {
            userId: 1,
            title: inputTodo,
            completed: false,
        };
        console.log(todo);
        createTodo(todo);
        setInputTodo("");
    };

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = todos.map((todo) => (
            <div key={todo.id} className="todoItem">
                <div className="innerItem">
                    <input
                        type="checkbox"
                        className="todoCheck"
                        id={todo.id}
                        checked={todo.completed}
                        onChange={() =>
                            updateTodo({ ...todo, completed: !todo.completed })
                        }
                    />
                    <span className="todoTitle">{todo.title}</span>
                </div>
                <button id="submit" onClick={() => deleteTodo({ id: todo.id })}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <main className="outerDiv">
            <h1>Todo List</h1>
            <div className="inputDiv">
                <input
                    type="text"
                    id="inputTodo"
                    name="inputTodo"
                    value={inputTodo}
                    onChange={handleInputTodo}
                    placeholder="Enter a Todo..."
                />
                <button id="submit" onClick={() => handleSubmit()}>
                    <FontAwesomeIcon icon={faUpload} />
                </button>
            </div>

            <div className="todoListSection">{content}</div>
        </main>
    );
};

export default TodoList;
