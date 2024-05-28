import TodoBoard from "../components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function TodoPage({ setUser }) {
	const [todos, setTodos] = useState([]);
	const [todoVal, setTodoVal] = useState("");
	const navigate = useNavigate();

	const getTasks = async () => {
		const response = await api.get("/tasks");
		console.log("task list", response.data.data);
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

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<Container>
			<Row className="add-item-row">
				<Col xs={12} sm={2}>
					<button onClick={handleLogout} className="logout-button">
						로그아웃
					</button>
				</Col>
				<Col xs={12} sm={8}>
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
					<button className="button-add" onClick={addTask}>
						추가
					</button>
				</Col>
			</Row>
			<TodoBoard todos={todos} onDelete={deleteTask} onUpdate={updateTask} />
		</Container>
	);
}

export default TodoPage;
