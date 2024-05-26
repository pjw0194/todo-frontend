import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (password !== rePassword) {
				throw new Error("Passwords doesn't match!");
			}
			const response = await api.post("/user", { name, email, password });
			if (response.status === 200) {
				navigate("/login");
			}
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="display-center">
			<Form className="login-box-big login-box" onSubmit={handleSubmit}>
				<h3>회원가입</h3>
				<Form.Group className="mb-3" controlId="formName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="string"
						placeholder="Name"
						onChange={(event) => setName(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						onChange={(event) => setEmail(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(event) => setPassword(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-4" controlId="formRePassword">
					<Form.Label>Re-enter password</Form.Label>
					<Form.Control
						type="password"
						placeholder="re-enter password"
						onChange={(event) => setRePassword(event.target.value)}
					/>
				</Form.Group>
				{error && <div className="red-error">{error}</div>}
				<Button variant="primary" type="submit">
					회원가입
				</Button>
			</Form>
		</div>
	);
};

export default RegisterPage;
