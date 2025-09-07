import axiosInstance from "../Components/Interceptor/AxiosInterceptor";
import { endpoints } from "../Configs/Apis"


const getNotification = async (userId: number) => {
    return axiosInstance.get(endpoints.getNotifications(userId))
        .then(res => res.data)
        .catch(err => { throw err });
}
const readNotification = async (id: number) => {
    return axiosInstance.patch(endpoints.readNotification(id))
        .then(res => res.data)
        .catch(err => { throw err });
}
const markAllAsRead = async (userId: number) => {
    return axiosInstance.put(endpoints.markAllAsRead(userId))
        .then(res => res.data)
        .catch(err => { throw err });
}
const longPollNotification = async (userId: number, after: string) => {
    return axiosInstance.get(endpoints.longPollNoti(userId, after))
        .then(res => res.data)
        .catch(err => { throw err });

}
export { getNotification, readNotification, markAllAsRead, longPollNotification };
