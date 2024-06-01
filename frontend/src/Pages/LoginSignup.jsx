import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";

const LoginSignup = () => {
	const [state, setState] = useState("Login");

	const [formData, setFormData] = useState({
		name: "",
		password: "",
		email: "",
	});

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const login = async () => {};

	const signUp = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/v1/user/signup",
				formData
			);

			return response.data;
		} catch (error) {
			if (error.response) {
				// Server responded with a status other than 200 range
				console.error("Signup failed:", error.response.data);
				throw new Error(
					`Error: ${error.response.status} ${error.response.statusText}, ${error.response.data.message}`
				);
			} else if (error.request) {
				// Request was made but no response received
				console.error("No response received:", error.request);
				throw new Error("No response received from the server.");
			} else {
				// Something else happened
				console.error("Error during signup:", error.message);
				throw new Error(`Error: ${error.message}`);
			}
		}

		// if (responseData.success) {
		// 	localStorage.setItem('auth-token',responseData.token)
		// 	window.location.replace("/")
		// }
	};

	return (
		<div className="loginsignup">
			<div className="loginsignup-container">
				<h1>{state}</h1>
				<div className="loginsignup-fields">
					{state === "Sign Up" ? (
						<input
							name="name"
							type="text"
							value={formData.name}
							onChange={changeHandler}
							placeholder="Your Name"
						/>
					) : (
						<></>
					)}
					<input
						name="email"
						value={formData.email}
						onChange={changeHandler}
						type="email"
						placeholder="Email Address"
					/>
					<input
						name="password"
						value={formData.password}
						onChange={changeHandler}
						type="password"
						placeholder="Password"
					/>
				</div>

				<button
					onClick={() => {
						state === "Login" ? login() : signUp();
					}}>
					Continue
				</button>

				{state === "Sign Up" ? (
					<p className="loginsignup-login">
						Already have an account?{" "}
						<span
							onClick={() => {
								setState("Login");
							}}>
							{" "}
							Login
						</span>
					</p>
				) : (
					<p className="loginsignup-login">
						Create an account?
						<span
							onClick={() => {
								setState("Sign Up");
							}}>
							{" "}
							Click here
						</span>
					</p>
				)}

				<div className="loginsignup-agree">
					<input type="checkbox" name="" />
					<p>By continuing, i agree to the terms of use & privacy policy.</p>
				</div>
			</div>
		</div>
	);
};

export default LoginSignup;
