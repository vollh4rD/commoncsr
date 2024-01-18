import { useState, useEffect } from "react";
import { instance } from "../Axi";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";

export const CsrView = () => {
	const { csrId } = useParams();
	const [joining, setJoining] = useState([]);
	const [csr, setCsr] = useState();
	const [creator, setCreator] = useState();

	const getDetails = async () => {
		let data = await instance.get(`/get_csr/${csrId}`);
		setJoining(data.data.joining);
		setCsr(data.data.csr);
		setCreator(data.data.created);
	};

	useEffect(() => {
		getDetails();
	}, []);

	return (
		<>
			<Navbar />
			<div className="w-full py-32 flex flex-col items-center px-10">
				<div className="w-[80%] flex rounded-xl bg-[#F1F2FF]">
					{/* <div className="w-full flex items-center">
						<div>
							<img
								className="w-8 h-8 object-cover rounded-full "
								src={creator?.image}
							/>
						</div>
						<div className="ml-2">
							<p className="text-lg font-medium">
								{creator?.name}
							</p>
						</div>
					</div> */}

					<div className="">
						<img
							className="w-[1000px] h-[400px] object-cover rounded-xl"
							src={csr?.image}
						/>
					</div>

					<div className="w-full flex flex-col items-center mt-2 p-10">
						<h2 className="text-2xl font-bold">{csr?.title}</h2>
						<p className="mt-5">{csr?.description}</p>

						<a
							target="_blank"
							className="mt-auto mr-auto"
							href={creator?.website}
						>
							<div className="mt-auto mr-auto">
								<button className="bg-[#7408FF] text-white px-10 py-3 rounded-lg font-medium">
									Contact us
								</button>
							</div>
						</a>
					</div>
				</div>

				<div className="flex flex-col w-full items-center p-5 mt-10 rounded-xl">
					<p className="text-2xl font-bold text-[#57007B]">
						Joining in
					</p>

					<div className="flex flex-wrap mt-10">
						{joining?.map((i, k) => {
							return (
								<div
									key={k}
									className="flex flex-col items-center mb-2 mx-10"
								>
									<img
										className="w-20 h-20 object-cover rounded-full"
										src={i.image}
									/>
									<p className="mt-5 text-lg text-[#57007B] font-medium">
										{i.name}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};
