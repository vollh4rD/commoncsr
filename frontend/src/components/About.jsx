import React from "react";
import { Navbar } from "./Navbar";

import asset from "../assets/about.png";

export const About = () => {
	return (
		<>
			<Navbar />
			<div className="w-full h-screen flex bg-[#F7F7FA]">
				<div className="w-1/2 flex flex-col h-full items-start justify-center px-20">
					<p className="text-3xl">
						<span className="font-semibold">CSReach</span> - Uniting
						Forces for a Better Tomorrow.
					</p>

					<p className="mt-5 text-[#718096] text-lg">
						CSReach is not just a platform; it's{" "}
						<span className="text-[#F76680]">
							your toolkit for change!
						</span>{" "}
						Connect, collaborate, and supercharge your CSR
						initiatives effortlessly. From seamless communication to
						project coordination, CSReach makes changing the world
						simple and fun. Ready to make an impact? Dive into
						CSReach, where features meet fantastic possibilities!"
					</p>
				</div>
				<div className="w-1/2 flex justify-center items-center">
					<img src={asset} />
				</div>
			</div>
		</>
	);
};
