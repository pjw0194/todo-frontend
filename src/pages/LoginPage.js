import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ user, setUser, getUser }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post("/user/login", { email, password });
			if (response.status === 200) {
				setUser(response.data.user);
				sessionStorage.setItem("token", response.data.token);
				api.defaults.headers["authorization"] = "Bearer " + response.data.token;
				setError("");
				await getUser();
				navigate("/");
			} else {
				throw new Error(response.message);
			}
		} catch (err) {
			setError(err.message);
		}
	};

	if (user) {
		return navigate("/");
	}

	return (
		<div className="display-center">
			{error && <div className="red-error">{error}</div>}
			<Form className="login-box" onSubmit={handleLogin}>
				<h3>로그인</h3>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={(event) => setEmail(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(event) => setPassword(event.target.value)}
					/>
				</Form.Group>
				<div className="button-box">
					<Button variant="primary" type="submit">
						Login
					</Button>
					<span
						style={{
							fontSize: "12px",
							textAlign: "center",
						}}
					>
						계정이 없다면? <Link to="/register">회원가입 하기</Link>
					</span>
				</div>
			</Form>
		</div>
	);
};

export default LoginPage;
