import { useState, useEffect } from "react";
import { instance } from "../Axi";

import { Navbar } from "./Navbar";

export const Companies = () => {
	const [c, setC] = useState([]);

	const getCompanies = async () => {
		let res = await instance.get("/companies");
		setC(res.data.companies);
	};

	useEffect(() => {
		getCompanies();
	}, []);
	return (
		<>
			<Navbar />
			<div className="min-h-screen w-full flex flex-col items-center py-24">
				<h2 className="text-2xl font-semibold">CSReach Contributors</h2>
				<h2 className="text-2xl">Collaborating to Make a</h2>
				<h2 className="text-2xl">Difference</h2>

				<div className="w-full px-20 flex flex-wrap justify-between mt-10">
					{c.map((i, k) => {
						return (
							<a
								className="w-[45%] mr-10 mb-10 p-10 bg-white border border-[#E7DAED] flex items-center"
								href={i?.website}
								target="_blank"
							>
								<div key={k} className="flex items-start">
									<img
										className="w-10 h-10 rounded-lg object-cover"
										src={i.image}
									/>

									<div className="flex flex-col ml-5">
										<p className="font-semibold">
											{i.name}
										</p>
									</div>
								</div>
							</a>
						);
					})}
				</div>
			</div>
		</>
	);
};
