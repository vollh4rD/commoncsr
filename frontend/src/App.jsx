import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { Create } from "./components/Create";
import { CsrView } from "./components/CsrView";
import { Companies } from "./components/Companies";
import { About } from "./components/About";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<Login />} path="/login" />
				<Route element={<Register />} path="/register" />
				<Route element={<Dashboard />} path="/csrs" />
				<Route element={<Companies />} path="/companies" />
				<Route element={<Create />} path="/create" />
				<Route element={<About />} path="/about" />
				<Route element={<CsrView />} path="/csr/:csrId" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
