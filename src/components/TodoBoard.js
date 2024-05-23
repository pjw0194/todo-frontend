import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todos, onDelete, onUpdate }) => {
	return (
		<div>
			<h2>Todo List</h2>
			{todos.length > 0 ? (
				todos.map((item) => <TodoItem {...{ item, onDelete, onUpdate }} />)
			) : (
				<h2>There is no item to show</h2>
			)}
		</div>
	);
};

export default TodoBoard;
