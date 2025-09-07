
import axiosInstance from "../Components/Interceptor/AxiosInterceptor";
import { endpoints } from "../Configs/Apis"

const registerUser = async (user: any) => {

    return axiosInstance.post(endpoints.register, user)
        .then(res => res.data)
        .catch(error => { throw error; });
}
const loginUser = async (user: any) => {

    return axiosInstance.post(endpoints.login, user)
        .then(res => res.data)
        .catch(error => { throw error; });
}
const sendOtp = async (email: any) => {
    return axiosInstance.post(endpoints.sendOtp(email))
        .then(res => res.data)
        .catch(error => { throw error; });
}
const verifyOtp = async (email: string, otp: string) => {
    return axiosInstance.get(endpoints.verifyOtp(email, otp))
        .then(res => res.data)
        .catch(error => { throw error; });
};
const changePassword = async (email: string, password: string) => {
    return axiosInstance.post(endpoints.changePassword, { email, password })
        .then(res => res.data)
        .catch(error => { throw error; });
};
export { registerUser, loginUser, sendOtp, verifyOtp, changePassword };