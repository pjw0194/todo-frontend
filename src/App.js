import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const token = sessionStorage.getItem("token");
			if (token) {
				const response = await api.get("/user/me");
				if (response.data.user) {
					console.log("User fetched");
					setUser(response.data.user);
				}
			}
		} catch (err) {
			setUser(null);
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute user={user}>
						<TodoPage setUser={setUser} />
					</PrivateRoute>
				}
			/>
			<Route
				path="/login"
				element={<LoginPage user={user} setUser={setUser} getUser={getUser} />}
			/>
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
}

export default App;
