import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8080/api/";
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export const setupResponseInterceptor = (navigate: any) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            const token = localStorage.getItem("token");

            if (error.response?.status === 401 && token) {
                localStorage.removeItem("token");
                navigate("/login");
            }

            return Promise.reject(error);
        }
    );
};
// export const setupResponseInterceptor = (navigate: any) => {
//     axiosInstance.interceptors.response.use(
//         (response) => {
//             return response;
//         },
//         (error) => {
//             if (error.response?.status === 401) {
//                 navigate("/login");
//             }

//             return Promise.reject(error);
//         }
//     );
// };

export default axiosInstance;