import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { instance } from "../Axi";
import { Link, useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const [csrs, setCsrs] = useState([]);
	const [user, setUser] = useState();
	const navigate = useNavigate();

	const getCsrs = async () => {
		try {
			let data = await instance.get("/get_csrs");
			setCsrs(data.data.csrs);
		} catch (e) {
			throw e;
		}
	};

	const joinCsr = async (id) => {
		try {
			await instance.post("/add_csr", { id: id });
		} catch (e) {
			throw e;
		}
	};

	useEffect(() => {
		getCsrs();
		let token = localStorage.getItem("token");
		let decoded = jwtDecode(token);
		setUser(decoded["sub"]);
	}, []);

	return (
		<>
			<Navbar />
			<div className="w-full flex flex-col items-center px-10 py-32 font-inter">
				<div className="w-full flex justify-end">
					<Link to={"/create"}>
						<button className="bg-[#7408FF] font-medium text-white px-5 rounded py-2">
							Create
						</button>
					</Link>
				</div>

				<div className="flex w-[70%] justify-center flex-col mt-10">
					{csrs.map((i, k) => {
						return (
							<div
								key={k}
								className="bg-[#F1F2FF] border border-[#E7DAED] h-[300px] rounded-xl pr-5 flex items-center mb-10"
							>
								<div className="">
									<img
										className="w-[600px] h-[300px] object-cover rounded-xl"
										src={i.image}
									/>
								</div>

								<div className="flex h-full flex-col justify-between w-full px-10 py-10">
									<div>
										<div className="text-xl font-semibold">
											{i.title}
										</div>
										<div className="mt-2">
											{i.description}
										</div>
									</div>

									<div className="w-full flex justify-end mt-2">
										{i.created_by === user ? (
											<button
												onClick={() =>
													navigate(`/csr/${i.pk}`)
												}
												className="text-[#57007B] font-medium"
											>
												View
											</button>
										) : (
											<div className="flex items-center">
												<button
													onClick={() =>
														navigate(`/csr/${i.pk}`)
													}
													className="text-[#57007B] font-medium"
												>
													View
												</button>
												<button
													onClick={() =>
														joinCsr(i.pk)
													}
													className="text-[#F76680] ml-5 font-medium"
												>
													Join
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};
