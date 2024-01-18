import { default as axios } from "axios";

const URL = "http://localhost:8000/";

export const instance = axios.create({
	baseURL: URL,
});

instance.interceptors.request.use(function (config) {
	const token = localStorage.getItem("token");
	config.headers.Authorization = token ? `Bearer ${token}` : null;
	return config;
});
