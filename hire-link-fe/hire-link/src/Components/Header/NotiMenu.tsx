import { Indicator, Menu, Notification, rem } from "@mantine/core";
import { IconBell, IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNotification, longPollNotification, markAllAsRead, readNotification } from "../../Services/NotificationService";

const NotiMenu = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const [notifications, setNotifications] = useState<any>([]);
    useEffect(() => {
        getNotification(user.id)
            .then((res: any) => {
                setNotifications(res);
            })
            .catch((err: any) => {
                console.error("Failed to fetch notifications:", err);
            });
    }, [user])
    useEffect(() => {
        console.log("👤 Current user id:", user?.id);
        if (!user?.id) return;

        let isMounted = true;
        let lastTimestamp: string | null = null;

        const poll = async () => {
            try {
                const newNoti = await longPollNotification(user.id, lastTimestamp || '');
                console.log("📡 Polling with lastTimestamp:", lastTimestamp);
                if (!isMounted) return;

                if (newNoti.length) {
                    setNotifications((prev: any) => [...prev, ...newNoti]);
                    lastTimestamp = newNoti[newNoti.length - 1].timeStamp; // tùy theo backend dùng 'createdAt' hay 'timestamp'
                }
            } catch (err) {
                console.error("Polling error", err);
            }

            if (isMounted) {
                poll(); // tiếp tục gọi
            }
        };

        poll();

        return () => {
            isMounted = false;
        };
    }, [user?.id]);
    const [opened, setOpened] = useState(false);
    const unread = (index: number) => {
        let notis = [...notifications];
        notis = notis.filter((noti: any, i: number) => i !== index);
        setNotifications(notis);
        readNotification(notifications[index].id).then((res) => {
            console.log("res:", res);
        }).catch((err: any) => {
            console.error("Failed to mark notification as read:", err);
        });
    }
    const readAllNotifications = () => {
        markAllAsRead(user.id)
            .then(() => {
                setNotifications([]); // Clear hết notification
            })
            .catch((err: any) => {
                console.error("Failed to mark all as read:", err);
            });
    };
    return <Menu shadow="md" width={500} opened={opened} onChange={setOpened} position="bottom-end" withinPortal>
        <Menu.Target>
            <div className="bg-shakespeare-700 p-1.5 rounded-full">
                <Indicator disabled={notifications.length <= 0} color="shakeSpeare.4" offset={6} size={8} processing>
                    <IconBell stroke={1.5} />
                </Indicator>
            </div>
        </Menu.Target>

        <Menu.Dropdown onChange={() => setOpened(true)} className="p-0">
            {/* Header: cố định trên cùng */}
            <div className="px-4 py-2 border-b border-gray-700 sticky top-0 bg-black z-10 flex justify-between items-center">
                <span className="text-sm font-medium text-white">Notifications</span>
                <button
                    onClick={() => {
                        readAllNotifications();
                        setOpened(false);
                    }}
                    className="text-xs text-blue-400 hover:underline"
                >
                    Mark all as read
                </button>
            </div>

            {/* Scrollable content */}
            <div className="max-h-[400px] overflow-y-auto px-2 py-2">
                {notifications.length > 0 ? (
                    notifications.map((noti: any, index: number) => (
                        <Notification
                            key={index}
                            onClick={() => {
                                navigate(noti.route);
                                setOpened(false);
                                unread(index);
                            }}
                            className="hover:bg-mine-shaft-900 cursor-pointer"
                            onClose={() => unread(index)}
                            icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                            color="teal"
                            title={noti.action}
                            mt="sm"
                        >
                            {noti.message}
                        </Notification>
                    ))
                ) : (
                    <Notification
                        className="hover:bg-mine-shaft-900 cursor-pointer"
                        icon={<IconX style={{ width: rem(20), height: rem(20) }} />}
                        color="red"
                        title="No notifications"
                        mt="sm"
                    >
                        You have no notifications
                    </Notification>
                )}
            </div>
        </Menu.Dropdown>
    </Menu>
}
export default NotiMenu;