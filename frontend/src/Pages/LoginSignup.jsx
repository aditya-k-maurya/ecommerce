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

	const login = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/v1/user/login",
				formData
			);

			// console.log(response)

			if (response.data.success) {
				localStorage.setItem("auth-token", response.data.data);
				window.location.replace("/");
			}
		} catch (error) {
			const errors = error.response.data.message;
			alert(errors);
		}
	};

	const signUp = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/v1/user/signup",
				formData
			);

			// console.log(response.data)
			if (response.data.success) {
				localStorage.setItem("auth-token", response.data.data);
				window.location.replace("/");
			}
		} catch (error) {
			const errors = error.response.data.message
			alert(errors)
		}
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
