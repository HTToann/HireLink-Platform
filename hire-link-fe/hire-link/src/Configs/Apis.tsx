import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/`;

export const endpoints = {
  authLogin: "/auth/login",
  register: "/register",
  login: "/login",
  sendOtp: (email: string) => `/sendOtp/${email}`,
  verifyOtp: (email: string, otp: string) => `/verifyOtp/${email}/${otp}`,
  changePassword: "/changePassword",
  getProfile: (id: number) => `/profiles/get/${id}`,
  getAllProfiles: "/profiles/getAll",
  updateProfile: "/profiles/update",
  updateAvatar: (id: number) => `/profiles/${id}/avatar`,
  postJob: "/jobs/post",
  updateStatusJob: (id: number) => `/jobs/${id}/update-status`,
  getAllJobs: "/jobs/getAll",
  getJob: (id: number) => `/jobs/get/${id}`,
  applyJob: (id: number) => `/jobs/apply/${id}`,
  getJobsPostedBy: (id: number) => `/jobs/postedBy/${id}`,
  changeAppStatus: "/jobs/changeAppStatus",
  getNotifications: (userId: number) => `/notifications/get/${userId}`,
  markAllAsRead: (userId: number) => `/notifications/read/all/${userId}`,
  readNotification: (id: number) => `/notifications/read/${id}`,
  loadMessages: (userId: string) => `/messages/${userId}`,
  contactConversations: "/messages/contacts",
  longPollMessages: (recipientId: string, after: string) => `/messages/long-poll?recipientId=${recipientId}&after=${after}`,
  longPollNoti: (userId: number, after: string) => `/notifications/long-poll?userId=${userId}&after=${after}`,
  deleteMessage: (otherUserId: string) => `/messages/${otherUserId}`,
};

export const authApis = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

