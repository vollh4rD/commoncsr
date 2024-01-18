import React from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "./Navbar";

import hero from "../assets/hero.png";

export const Home = () => {
	const navigate = useNavigate();
	return (
		<>
			<Navbar />
			<div className="h-screen w-full flex items-center font-inter">
				<div className="flex flex-col items-start w-[60%] px-32">
					<h2 className="text-5xl font-light">
						Building{" "}
						<span className="text-[#F7666F]">Impactful</span>{" "}
						Futures With
					</h2>
					<h2 className="text-6xl font-semibold mt-2">
						Collaborative{" "}
						<span className="text-[#7408FF]">CSR Excellence</span>
					</h2>

					<h4 className="text-[#4A5568] mt-5 w-[60%] text-lg">
						Unleash the power of collaboration on the Common CSR
						Portal, where great teams unite for impactful change.{" "}
					</h4>

					<button
						onClick={() => navigate("/register")}
						className="bg-[#7408FF] text-white mt-10 rounded py-3 px-8 font-medium"
					>
						Register Now
					</button>
				</div>
				<div className="flex flex-col items-start w-[40%]">
					<img className="w-[500px]" src={hero} />
				</div>
			</div>
		</>
	);
};
