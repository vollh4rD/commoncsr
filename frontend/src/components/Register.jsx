import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import asset from "../assets/register.png";
import bg from "../assets/bg.png";

import MailIcon from "@mui/icons-material/Mail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { instance } from "./../Axi";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export const Register = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [name, setName] = useState();
	const [website, setWebsite] = useState();
	const [avatar, setAvatar] = useState();
	const navigate = useNavigate();

	function getBase64(cfile, cb) {
		let reader = new FileReader();
		reader.readAsDataURL(cfile);
		reader.onload = function () {
			cb(reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	}

	const Submit = async () => {
		try {
			getBase64(avatar, async (result) => {
				let data = await instance.post("/register", {
					name: name,
					email: email,
					password: password,
					website: website,
					image: result,
				});
				localStorage.setItem("token", data.data.token);
				navigate("/");
			});
		} catch (e) {
			throw e;
		}
	};

	return (
		<div className="w-full h-screen flex">
			<div className="flex flex-col items-center justify-center w-1/2 bg-white rounded-2xl p-10 relative">
				<div
					onClick={() => navigate("/")}
					className="absolute top-5 cursor-pointer left-5 text-[#7200A1] text-lg font-medium"
				>
					Home
				</div>
				<div className="w-[60%] flex flex-col items-start">
					<p className="text-2xl mx-auto font-bold mb-10">Register</p>

					<TextField
						fullWidth
						id="outlined-basic"
						className="bg-[#F0EDFF]"
						label="Name"
						InputProps={{
							startAdornment: <PersonOutlineOutlinedIcon />,
						}}
						variant="outlined"
						type="text"
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>

					<div className="mb-5"></div>
					<TextField
						fullWidth
						id="outlined-basic"
						className="bg-[#F0EDFF]"
						label="Email"
						InputProps={{
							startAdornment: <MailIcon />,
						}}
						variant="outlined"
						type="email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>

					<div className="mb-5"></div>
					<TextField
						fullWidth
						id="outlined-basic"
						className="bg-[#F0EDFF]"
						InputProps={{
							startAdornment: <LockOutlinedIcon />,
						}}
						label="Password"
						variant="outlined"
						type="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>

					<div className="mb-5"></div>
					<TextField
						fullWidth
						id="outlined-basic"
						className="bg-[#F0EDFF]"
						InputProps={{
							startAdornment: <PublicOutlinedIcon />,
						}}
						label="Website"
						variant="outlined"
						type="text"
						onChange={(e) => {
							setWebsite(e.target.value);
						}}
					/>

					<div className="mb-5"></div>
					<Button
						component="label"
						variant="contained"
						startIcon={<CloudUploadIcon />}
					>
						Upload Avatar
						<VisuallyHiddenInput
							onChange={(e) => setAvatar(e.target.files[0])}
							type="file"
							accept="image/*"
						/>
					</Button>

					<button
						className="mt-4 self-center bg-[#6675F7] px-10 rounded-lg py-2 text-white font-medium"
						onClick={Submit}
					>
						Register
					</button>

					<p className="mt-4 self-center">
						Already have an account?{" "}
						<Link className="text-blue-500" to="/login">
							Login
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
