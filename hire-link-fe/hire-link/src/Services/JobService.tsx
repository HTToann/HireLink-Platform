import axiosInstance from "../Components/Interceptor/AxiosInterceptor";
import { endpoints } from "../Configs/Apis"
// const postJob = async (job: any) => {
//     return await axiosInstance.post(endpoints.postJob, job).
//         then(res => res.data)
//         .catch(error => { throw error; });
// }
const postJob = (formData: FormData) => {
    return axiosInstance.post(endpoints.postJob, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
const getAllJobs = async () => {
    return await axiosInstance.get(endpoints.getAllJobs).
        then(res => res.data)
        .catch(error => { throw error; });
}
const getJob = async (id: number) => {
    return await axiosInstance.get(endpoints.getJob(id)).
        then(res => res.data)
        .catch(error => { throw error; });
}
const applyJob = async (id: number, data: any) => {
    return await axiosInstance.post(endpoints.applyJob(id), data).
        then(res => res.data)
        .catch(error => { throw error; });
}
const getJobPostedBy = async (id: number) => {
    return await axiosInstance.get(endpoints.getJobsPostedBy(id)).
        then(res => res.data)
        .catch(error => { throw error; });
}
const changeAppStatus = async (application: any) => {
    return await axiosInstance.post(endpoints.changeAppStatus, application).
        then(res => res.data)
        .catch(error => { throw error; });
}
const updateStatusJob = async (id: number, status: string) => {
    return await axiosInstance.patch(endpoints.updateStatusJob(id), { jobStatus: status }).
        then(res => res.data)
        .catch(error => { throw error; });
}
export { postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus, updateStatusJob };

