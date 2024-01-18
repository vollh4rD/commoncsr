import { useState } from "react";
import { instance } from "../Axi";
import { useNavigate, Link } from "react-router-dom";

import asset from "../assets/login.png";
import bg from "../assets/bg.png";

import MailIcon from "@mui/icons-material/Mail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import TextField from "@mui/material/TextField";

export const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	const Submit = async () => {
		let data = await instance.post("/login", {
			email: email,
			password: password,
		});
		localStorage.setItem("token", data.data.token);
		navigate("/");
	};

	return (
		<div className="w-full h-screen font-inter flex">
			<div className="flex flex-col items-center justify-center w-1/2 bg-white rounded-2xl p-10 relative">
				<div
					onClick={() => navigate("/")}
					className="absolute top-5 cursor-pointer left-5 text-[#7200A1] text-lg font-medium"
				>
					Home
				</div>
				<div className="w-[60%] flex flex-col items-center">
					<p className="text-2xl mx-auto font-bold mb-10">Login</p>
					{/* <p className="text-xl">Email:</p> */}

					<TextField
						InputProps={{
							startAdornment: <MailIcon />,
						}}
						fullWidth
						className="bg-[#F0EDFF]"
						id="outlined-basic"
						label="Email"
						variant="outlined"
						type="email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>

					{/* <input
					type="text"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/> */}
					<div className="mt-5"></div>

					<TextField
						fullWidth
						InputProps={{
							startAdornment: <LockOutlinedIcon />,
						}}
						id="outlined-basic"
						className="bg-[#F0EDFF]"
						label="Password"
						variant="outlined"
						type="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					{/* <input
					type="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/> */}

					<button
						className="mt-4 bg-[#6675F7] px-10 rounded-lg py-2 text-white font-medium"
						onClick={Submit}
					>
						Login
					</button>

					<p className="mt-4">
						Don't have an account?{" "}
						<Link className="text-blue-500" to="/register">
							Register Now
						</Link>
					</p>
				</div>
			</div>

			<div className="w-1/2 relative flex items-center justify-center bg-gradient-to-tr from-[#9181F4] to-[#5038ED]">
				<img
					className="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
					src={bg}
				/>
				<img className="z-10" src={asset} />
			</div>
		</div>
	);
};
