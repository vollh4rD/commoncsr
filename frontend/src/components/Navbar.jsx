import { useState, useEffect } from "react";

import logo from "../assets/logo.png";

import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(() => {
		if (localStorage.getItem("token")) {
			return true;
		} else {
			return false;
		}
	});

	const handleLogout = () => {
		localStorage.clear();
		window.location.href = "/";
	};
	return (
		<div className="flex w-full items-center justify-between fixed z-20 py-4 px-5 shadow-lg">
			<div>
				<img className="w-32" src={logo} />
			</div>
			<div className="flex items-center">
				<ul className="flex items-center">
					<li
						onClick={() => navigate("/")}
						className="mx-8 cursor-pointer"
					>
						Home
					</li>
					<li
						onClick={() => navigate("/about")}
						className="mx-8 cursor-pointer"
					>
						About us
					</li>

					{
						<li
							onClick={() => navigate("/companies")}
							className="mx-8 cursor-pointer"
						>
							Companies
						</li>
					}

					{loggedIn && (
						<li
							onClick={() => navigate("/csrs")}
							className="mx-8 cursor-pointer"
						>
							Events
						</li>
					)}
				</ul>
				{loggedIn ? (
					<button
						onClick={handleLogout}
						className="rounded-lg bg-gradient-to-tr from-[#57007B] to-[#6675F7] text-white px-5 py-2 ml-10"
					>
						Log out
					</button>
				) : (
					<button
						onClick={() => navigate("/login")}
						className="rounded-lg bg-gradient-to-tr from-[#57007B] to-[#6675F7] text-white px-5 py-2 ml-10"
					>
						Log In
					</button>
				)}
			</div>
		</div>
	);
};
