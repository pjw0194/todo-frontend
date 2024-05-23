import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
	const [todos, setTodos] = useState([]);
	const [todoVal, setTodoVal] = useState("");

	const getTasks = async () => {
		const response = await api.get("/tasks");
		setTodos(response.data.data);
	};

	const addTask = async () => {
		try {
			const response = await api.post("/tasks", {
				task: todoVal,
				isComplete: false,
			});
			if (response.status === 200) {
				setTodoVal("");
				getTasks();
			}
		} catch (err) {
			console.log("Error adding the task", err);
		}
	};

	const deleteTask = async (id) => {
		try {
			const response = await api.delete(`/tasks/${id}`);
			if (response.status === 200) {
				getTasks();
			}
		} catch (err) {
			console.log("Error deleting the task", err);
		}
	};

	const updateTask = async (id, isComplete) => {
		try {
			const response = await api.put(`/tasks/${id}`, {
				isComplete: !isComplete,
			});
			if (response.status === 200) {
				getTasks();
			}
		} catch (err) {
			console.log("Error updating the task", err);
		}
	};

	const handleEnterKeyPress = (event) => {
		if (event.key === "Enter") {
			addTask();
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<Container>
			<Row className="add-item-row">
				<Col xs={12} sm={10}>
					<input
						type="text"
						placeholder="할일을 입력하세요"
						className="input-box"
						value={todoVal}
						onChange={(event) => setTodoVal(event.target.value)}
						onKeyPress={handleEnterKeyPress}
					/>
				</Col>
				<Col xs={12} sm={2}>
					<button className="button-add">추가</button>
				</Col>
			</Row>

			<TodoBoard todos={todos} onDelete={deleteTask} onUpdate={updateTask} />
		</Container>
	);
}

export default App;
