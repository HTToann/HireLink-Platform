// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import {
//     connectChat,
//     disconnectChat,
//     loadMessages,
//     sendPrivateMessage,
//     getConnectionStatus,
//     ChatMessage,
//     longPollMessages
// } from '../../Services/ChatService';

// const ChatPage = () => {
//     const { userId } = useParams(); // recipientId từ URL
//     const location = useLocation();
//     const { name } = location.state || ''; // 👈 đọc state
//     const user = useSelector((state: any) => state.user);
//     const currentUserId = String(user?.id);
//     const currentUserName = user?.name;
//     const jwtToken = localStorage.getItem("token");

//     const [messages, setMessages] = useState<ChatMessage[]>([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [isConnected, setIsConnected] = useState(false);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const scrollContainerRef = useRef<HTMLDivElement>(null);
//     useEffect(() => {
//         if (!userId || !currentUserId || !jwtToken) return;

//         const connect = async () => {
//             await loadMessages(userId).then(setMessages).catch(console.error);

//             connectChat(jwtToken, currentUserId,
//                 (msg) => {
//                     setMessages((prev) => [...prev, msg]);
//                     console.log('[STOMP] New message received:', msg); // <-- cần thấy dòng này
//                 },
//                 () => {
//                     console.log('[STOMP] Connected callback');
//                     setIsConnected(true);
//                 },
//                 (err) => {
//                     console.error('[STOMP] Connection error:', err);
//                     setIsConnected(false);
//                 }
//             );
//         };

//         connect();

//         return () => {
//             disconnectChat();
//         };
//     }, [userId, currentUserId, jwtToken]);
//     useEffect(() => {
//         if (!userId || !currentUserId) return;

//         let isMounted = true;
//         let lastTimestamp: string | null = null;
//         console.log("CURRENT", currentUserId);
//         const poll = async () => {
//             try {
//                 const newMessages = await longPollMessages(currentUserId, lastTimestamp || '');

//                 if (!isMounted) return;

//                 if (newMessages.length) {
//                     setMessages((prev) => [...prev, ...newMessages]);
//                     lastTimestamp = newMessages[newMessages.length - 1].timestamp;
//                 }
//             } catch (err) {
//                 console.error("Polling error", err);
//             }

//             if (isMounted) {
//                 poll(); // gọi tiếp
//             }
//         };

//         poll();

//         return () => {
//             isMounted = false;
//         };
//     }, [userId, currentUserId]);
//     useEffect(() => {
//         if (scrollContainerRef.current && messagesEndRef.current) {
//             scrollContainerRef.current.scrollTo({
//                 top: messagesEndRef.current.offsetTop,
//                 behavior: 'smooth',
//             });
//         }
//     }, [messages]);

//     const handleSend = () => {
//         if (!newMessage.trim() || !userId || !currentUserId) return;

//         const msg: ChatMessage = {
//             sender: currentUserId,
//             senderName: currentUserName,
//             recipient: userId,
//             content: newMessage,
//             timestamp: new Date().toISOString(),
//         };

//         sendPrivateMessage(msg);
//         setMessages((prev) => [...prev, msg]);
//         setNewMessage('');
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-blue-50 min-h-screen">
//             {/* Header */}
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">
//                 Chat with <span className="text-blue-600">{name || userId}</span>
//                 <span className={`ml-2 text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
//                     ({isConnected ? 'Online' : 'Offline'})
//                 </span>
//             </h2>

//             {/* Message area */}
//             <div ref={scrollContainerRef} className="bg-white p-4 rounded-xl h-96 overflow-y-auto shadow-md">
//                 {messages.map((msg, idx) => {
//                     const isCurrentUser = msg.sender === currentUserId;
//                     return (
//                         <div
//                             key={idx}
//                             className={`my-3 flex items-end ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
//                         >
//                             {/* Avatar trái cho người khác */}
//                             {!isCurrentUser && (
//                                 <img
//                                     src={msg.senderAvatarUrl || '/default-avatar.png'}
//                                     alt="Avatar"
//                                     className="w-9 h-9 rounded-full mr-3 shadow-md border border-gray-200"
//                                 />
//                             )}

//                             {/* Bubble message */}
//                             <div
//                                 className={`px-4 py-2 max-w-sm rounded-2xl shadow-sm text-sm break-words ${isCurrentUser
//                                     ? 'bg-blue-500 text-white rounded-br-none'
//                                     : 'bg-gray-100 text-gray-800 rounded-bl-none'
//                                     }`}
//                             >
//                                 <p>{msg.content}</p>
//                                 <span className="text-xs block mt-1 opacity-70">
//                                     {msg.timestamp && new Date(msg.timestamp).toLocaleString()}
//                                 </span>
//                             </div>

//                             {/* Avatar phải cho bạn */}
//                             {isCurrentUser && (
//                                 <img
//                                     src={msg.senderAvatarUrl || '/default-avatar.png'}
//                                     alt="Avatar"
//                                     className="w-9 h-9 rounded-full ml-3 shadow-md border border-gray-200"
//                                 />
//                             )}
//                         </div>
//                     );
//                 })}
//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Input area */}
//             <div className="mt-6 flex items-center">
//                 <input
//                     type="text"
//                     className="flex-1 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//                     placeholder={isConnected ? "Type a message..." : "Disconnected..."}
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//                     disabled={!isConnected}
//                 />
//                 <button
//                     onClick={handleSend}
//                     className={`ml-3 px-6 py-2 rounded-full transition-all duration-200 ${isConnected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
//                         } text-white font-medium shadow`}
//                     disabled={!isConnected}
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatPage;
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    connectChat,
    disconnectChat,
    loadMessages,
    sendPrivateMessage,
    ChatMessage,
    longPollMessages
} from '../../Services/ChatService';

const ChatPage = () => {
    const { userId } = useParams();
    const location = useLocation();
    const { name } = location.state || '';
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const currentUserId = String(user?.id);
    const currentUserName = user?.name;
    const jwtToken = localStorage.getItem("token");

    const lastTimestampRef = useRef<string | null>(null);
    const isMountedRef = useRef(true);
    const isPollingRef = useRef(false);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Load message history + connect STOMP
    useEffect(() => {
        if (!userId || !currentUserId || !jwtToken) return;

        const connect = async () => {
            try {
                const loaded = await loadMessages(userId);
                setMessages(loaded);
                if (loaded.length > 0) {
                    lastTimestampRef.current = loaded[loaded.length - 1].timestamp ?? null;
                }

                connectChat(
                    jwtToken,
                    currentUserId,
                    (msg) => {
                        setMessages((prev) => [...prev, msg]);
                        if (msg.timestamp) lastTimestampRef.current = msg.timestamp;
                    },
                    () => setIsConnected(true),
                    (err) => {
                        console.error('[STOMP] Connection error:', err);
                        setIsConnected(false);
                    }
                );
            } catch (err) {
                console.error('Chat connect failed', err);
            }
        };

        connect();

        return () => {
            disconnectChat();
        };
    }, [userId, currentUserId, jwtToken]);

    // Long-polling only one thread
    useEffect(() => {
        if (!userId || !currentUserId) return;

        isMountedRef.current = true;

        const poll = async () => {
            if (isPollingRef.current) return; // 🔒 prevent overlap
            isPollingRef.current = true;

            try {
                const newMessages: ChatMessage[] = await longPollMessages(currentUserId, lastTimestampRef.current || '');

                if (!isMountedRef.current) return;

                setMessages((prev) => {
                    const seen = new Set(prev.map((m) => m.timestamp));
                    const filtered = newMessages.filter((m) => m.timestamp && !seen.has(m.timestamp));
                    if (filtered.length > 0) {
                        lastTimestampRef.current = filtered[filtered.length - 1].timestamp ?? null;
                        return [...prev, ...filtered];
                    }
                    return prev;
                });
            } catch (err) {
                console.error("Polling error", err);
            } finally {
                isPollingRef.current = false;
                if (isMountedRef.current) {
                    poll(); // repeat
                }
            }
        };

        poll();

        return () => {
            isMountedRef.current = false;
        };
    }, [userId, currentUserId]);

    useEffect(() => {
        if (scrollContainerRef.current && messagesEndRef.current) {
            scrollContainerRef.current.scrollTo({
                top: messagesEndRef.current.offsetTop,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim() || !userId || !currentUserId) return;

        const timestamp = new Date().toISOString();

        const msg: ChatMessage = {
            sender: currentUserId,
            senderName: currentUserName,
            senderAvatarUrl: profile?.picture || '/default-avatar.png',
            recipient: userId,
            content: newMessage,
            timestamp,
        };

        sendPrivateMessage(msg);
        setMessages((prev) => [...prev, msg]);
        lastTimestampRef.current = timestamp;
        setNewMessage('');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-blue-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Chat
                {/* with <span className="text-blue-600">{name || userId}</span> */}
                {/* <span className={`ml-2 text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                    ({isConnected ? 'Online' : 'Offline'})
                </span> */}
            </h2>

            <div ref={scrollContainerRef} className="bg-white p-4 rounded-xl h-96 overflow-y-auto shadow-md">
                {messages.map((msg, idx) => {
                    const isCurrentUser = msg.sender === currentUserId;
                    return (
                        <div key={idx} className={`my-3 flex items-end ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            {!isCurrentUser && (
                                <img src={msg.senderAvatarUrl || '/default-avatar.png'} alt="Avatar" className="w-9 h-9 rounded-full mr-3 shadow-md border border-gray-200" />
                            )}
                            <div className={`px-4 py-2 max-w-sm rounded-2xl shadow-sm text-sm break-words ${isCurrentUser
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}>
                                <p>{msg.content}</p>
                                <span className="text-xs block mt-1 opacity-70">{msg.timestamp && new Date(msg.timestamp).toLocaleString()}</span>
                            </div>
                            {isCurrentUser && (
                                <img src={msg.senderAvatarUrl || '/default-avatar.png'} alt="Avatar" className="w-9 h-9 rounded-full ml-3 shadow-md border border-gray-200" />
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-6 flex items-center">
                <input
                    type="text"
                    className="flex-1 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder={isConnected ? "Type a message..." : "Disconnected..."}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={!isConnected}
                />
                <button
                    onClick={handleSend}
                    className={`ml-3 px-6 py-2 rounded-full transition-all duration-200 ${isConnected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white font-medium shadow`}
                    disabled={!isConnected}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;