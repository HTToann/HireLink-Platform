import { endpoints } from "../Configs/Apis"
import axiosInstance from "../Components/Interceptor/AxiosInterceptor";
const getProfile = async (id: number) => {
    return axiosInstance.get(endpoints.getProfile(id))
        .then(res => res.data)
        .catch(err => { throw err });
}

const updateProfile = async (profile: any) => {
    return axiosInstance.put(endpoints.updateProfile, profile)
        .then(res => res.data)
        .catch(err => { throw err });
}
const updateAvatar = async (id: any, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosInstance.put(endpoints.updateAvatar(id), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
const getAllProfiles = async () => {
    return axiosInstance.get(endpoints.getAllProfiles)
        .then(res => res.data)
        .catch(err => { throw err });
}
export { getProfile, updateProfile, updateAvatar, getAllProfiles };