import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

import asset from "../assets/csr_create.png";
import bg from "../assets/bg.png";

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

export const Create = () => {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [image, setImage] = useState();
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
			getBase64(image, async (result) => {
				let data = await instance.post("/create_csr", {
					title: title,
					description: description,
					image: result,
				});

				navigate("/dashboard");
			});
		} catch (e) {
			throw e;
		}
	};
	return (
		<>
			{/* <Navbar /> */}
			<div className="w-full h-screen flex">
				<div className="flex flex-col items-center justify-center w-1/2 bg-white rounded-2xl p-10 relative">
					<div
						onClick={() => navigate("/")}
						className="absolute top-5 cursor-pointer left-5 text-[#7200A1] text-lg font-medium"
					>
						Home
					</div>
					<div className="w-[60%] flex flex-col items-start">
						<p className="text-2xl mx-auto font-bold uppercase mb-10">
							Create Activity
						</p>

						<TextField
							fullWidth
							id="outlined-basic"
							className="bg-[#F0EDFF]"
							label="Title"
							variant="outlined"
							type="text"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>

						<div className="mt-5"></div>
						<TextField
							fullWidth
							id="outlined-basic"
							className="bg-[#F0EDFF]"
							label="Description"
							variant="outlined"
							type="text"
							multiline
							rows={4}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>

						<p className="text-xl mt-4">Image:</p>
						<Button
							component="label"
							variant="contained"
							startIcon={<CloudUploadIcon />}
						>
							Upload file
							<VisuallyHiddenInput
								onChange={(e) => setImage(e.target.files[0])}
								type="file"
								accept="image/*"
							/>
						</Button>

						<button
							className="mt-4 self-center bg-[#6675F7] px-10 rounded-lg py-2 text-white font-medium"
							onClick={Submit}
						>
							Submit
						</button>
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
		</>
	);
};
