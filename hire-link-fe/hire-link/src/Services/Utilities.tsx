import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../Store";
import { IconLogout } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { removeUser } from "../Slices/UserSlice";
dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { year: 'numeric' as const, month: 'long' as const };
    return date.toLocaleDateString('en-US', options); // ✅ fix here
}
function timeAgo(time: string) {
    const now = new Date();
    const postDate = new Date(time);
    const diff = now.getTime() - postDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    if (seconds < 60)
        return `${seconds} seconds ago`
    else if (minutes < 60)
        return `${minutes} minutes ago`
    else if (hours < 24)
        return `${hours} minutes ago`
    else if (days < 30)
        return `${days} minutes ago`
    else
        return `${months} months ago`

}
const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}
const formatInterviewTime = (dateStr: string) => {
    const date = dayjs.utc(dateStr).tz("Asia/Ho_Chi_Minh");
    const day = date.format("ddd, D MMMM");
    const time = date.format("hh:mm A");
    return `${day} • ${time}`;
};
function openBase64PDF(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    URL.revokeObjectURL(url); // Clean up the URL object after use
}
function isTokenExpired(token: string): boolean {
    try {
        const decoded: any = jwtDecode(token);
        const exp = decoded.exp;
        const now = Date.now() / 1000;
        return exp < now;
    } catch (error) {
        return true; // Token không hợp lệ
    }
}

function useTokenExpirationChecker() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAndLogout = async () => {
            const token = localStorage.getItem("token");
            if (token && isTokenExpired(token)) {
                console.log("⛔ Token hết hạn. Đang logout...");

                // Clear thủ công nếu có
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                sessionStorage.clear();

                // Dispatch logout để reset toàn bộ store
                dispatch({ type: "LOGOUT" });

                // Đảm bảo purge xong rồi mới xử lý tiếp
                await persistor.purge();
                localStorage.removeItem('persist:root');
                console.log("✅ Đã purge Redux Persist.");

                // Chờ một nhịp để Redux unmount
                setTimeout(() => {
                    modals.openConfirmModal({
                        title: 'Phiên đăng nhập đã hết hạn',
                        children: <p>Vui lòng đăng nhập lại để tiếp tục sử dụng hệ thống.</p>,
                        labels: { confirm: 'OK', cancel: 'Hủy' },
                        confirmProps: { color: 'red' },
                        onConfirm: () => (window.location.href = "/login"),
                        onCancel: () => (window.location.href = "/"),
                    });
                }, 100);
            }
        };

        checkAndLogout(); // check ngay lần đầu

        const interval = setInterval(checkAndLogout, 60 * 1000);
        return () => clearInterval(interval);
    }, [dispatch, navigate]);
}

export { formatDate, timeAgo, getBase64, formatInterviewTime, openBase64PDF, isTokenExpired, useTokenExpirationChecker };