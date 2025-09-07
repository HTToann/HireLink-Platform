import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { deleteMessage, loadContacts } from '../../Services/ChatService';
import { IconTrash } from "@tabler/icons-react";
import { successNotification } from '../../Services/Notifications';
interface ChatContactDTO {
    id: number;
    name: string;
    email: string;
    profileId: string;
    avatarUrl: string;
}

const ChatLayout = () => {
    const [contacts, setContacts] = useState<ChatContactDTO[]>([]);
    const [contextMenuContactId, setContextMenuContactId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleOpenChat = (contact: ChatContactDTO) => {
        navigate(`/chat/${contact.id}`, {
            state: { name: contact.name },
        });
    };

    const handleDeleteContact = async (id: number) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa cuộc trò chuyện này?");
        if (!confirmed) return;

        try {
            // Gọi API để xóa cuộc trò chuyện trên server
            await deleteMessage(id.toString());

            // Xóa khỏi UI
            setContacts(prev => prev.filter(contact => contact.id !== id));
            setContextMenuContactId(null);

            // ✅ Thông báo thành công
            successNotification("Đã xóa", "Cuộc trò chuyện đã được xóa thành công.");
        } catch (error) {
            console.error("Xóa cuộc trò chuyện thất bại", error);
            alert("Đã có lỗi xảy ra khi xóa cuộc trò chuyện. Vui lòng thử lại.");
        }
    };
    useEffect(() => {
        loadContacts().then(setContacts).catch(console.error);
    }, []);

    useEffect(() => {
        const handleClickOutside = () => setContextMenuContactId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-200 p-4 border-r">
                <h2 className="text-lg text-mine-shaft-700 font-semibold mb-4">Chats</h2>
                <ul className="text-mine-shaft-700 text-sm font-semibold">
                    {contacts.map((contact) => (
                        <li
                            key={contact.id}
                            className="mb-2 relative group"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setContextMenuContactId(contact.id);
                            }}
                        >
                            <div className="flex items-center space-x-2 pr-8"> {/* dành chỗ bên phải cho nút */}
                                <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                                <button
                                    onClick={() => handleOpenChat(contact)}
                                    className="flex items-center space-x-2 hover:bg-gray-300 px-2 py-1 rounded w-full text-left"
                                >
                                    <img
                                        src={contact.avatarUrl || '/default-avatar.png'}
                                        alt={contact.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span>{contact.name}</span>
                                </button>
                            </div>

                            {/* Nút delete hiện khi hover hoặc context menu */}
                            {(contextMenuContactId === contact.id || contextMenuContactId === null) && (
                                <button
                                    className={`
    absolute right-2 top-1/2 -translate-y-1/2 
    p-1 text-gray-500 hover:text-red-500
    bg-white hover:bg-red-100 rounded-full
    transition duration-200
    ${contextMenuContactId === contact.id ? 'visible' : 'invisible group-hover:visible'}
  `}
                                    onClick={() => handleDeleteContact(contact.id)}
                                    title="Delete chat"
                                >
                                    <IconTrash size={18} stroke={1.5} />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat area */}
            <div className="flex-1 bg-blue-50">
                <Outlet />
            </div>
        </div>
    );
};

export default ChatLayout;
