import axios from 'axios';

export const baseURL = process.env.NODE_ENV === 'production' ? "https://roxiler-be.vercel.app/api" : 'http://localhost:8000/api';

const axiosInstance = axios.create({
	baseURL: baseURL,
});

export default axiosInstance;