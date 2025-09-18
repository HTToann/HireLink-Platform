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
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    connectChat,
    disconnectChat,
    loadMessages,
    sendPrivateMessage,
    ChatMessage,
    longPollMessages,
    loadContacts,
} from '../../Services/ChatService';
import { IconSend } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatPage = () => {
    const { userId } = useParams();
    const location = useLocation();
    const { name } = location.state || {};
    const user = useSelector((s: any) => s.user);
    const profile = useSelector((s: any) => s.profile);

    const currentUserId = String(user?.id);
    const currentUserName = user?.name;
    const jwtToken = localStorage.getItem('token');

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [displayName, setDisplayName] = useState(name || userId);

    const [activeMsgId, setActiveMsgId] = useState<string | number | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const lastTimestampRef = useRef<string | null>(null);
    const isMountedRef = useRef(true);
    const isPollingRef = useRef(false);

    /** Resolve tên hiển thị */
    useEffect(() => {
        if (name) {
            setDisplayName(name);
        } else if (userId) {
            loadContacts()
                .then((contacts: any[]) => {
                    const target = contacts.find(c => String(c.id) === userId);
                    setDisplayName(target?.name || userId);
                })
                .catch(() => setDisplayName(userId));
        }
    }, [name, userId]);

    const handleSend = useCallback(() => {
        if (!newMessage.trim() || !userId || !currentUserId) return;

        const clientId = uuidv4();
        const msg: ChatMessage = {
            clientId,
            sender: currentUserId,
            senderName: currentUserName,
            senderAvatarUrl: profile?.picture || '/default-avatar.png',
            recipient: userId,
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, msg]);
        setNewMessage('');
        sendPrivateMessage(msg);
    }, [newMessage, userId, currentUserId, currentUserName, profile?.picture]);

    const handleIncoming = useCallback((msg: ChatMessage) => {
        setMessages(prev => {
            if (msg.clientId) {
                const idx = prev.findIndex(m => m.clientId === msg.clientId);
                if (idx !== -1) {
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], ...msg };
                    return updated;
                }
            }
            if (msg.id && prev.some(m => m.id === msg.id)) return prev;
            return [...prev, msg];
        });

        if (msg.timestamp) {
            lastTimestampRef.current = msg.timestamp;
        }
    }, []);

    /** Long-poll */
    const poll = useCallback(async () => {
        if (!userId || !currentUserId) return;
        if (isPollingRef.current) return;
        isPollingRef.current = true;

        try {
            const batch = await longPollMessages(userId, lastTimestampRef.current || '');
            if (!isMountedRef.current) return;

            if (batch?.length) {
                setMessages(prev => {
                    const deduped = [...prev];
                    for (const m of batch) {
                        if (!deduped.some(x => x.id === m.id)) {
                            deduped.push(m);
                        }
                    }
                    return deduped;
                });
                lastTimestampRef.current = batch[batch.length - 1].timestamp ?? lastTimestampRef.current;
            }
        } catch (e) {
            console.error('Polling error', e);
        } finally {
            isPollingRef.current = false;
            if (isMountedRef.current) setTimeout(poll, 1000);
        }
    }, [userId, currentUserId]);

    /** Init STOMP + load messages */
    useEffect(() => {
        if (!userId || !currentUserId || !jwtToken) return;

        const init = async () => {
            const loaded = await loadMessages(userId);
            setMessages(loaded);

            if (loaded.length > 0) {
                lastTimestampRef.current = loaded[loaded.length - 1].timestamp ?? null;
            }

            connectChat(
                jwtToken,
                currentUserId,
                msg => handleIncoming(msg),
                () => setIsConnected(true),
                () => setIsConnected(false)
            );
        };

        init();
        return () => disconnectChat();
    }, [userId, currentUserId, jwtToken, handleIncoming]);

    /** Start polling */
    useEffect(() => {
        isMountedRef.current = true;
        poll();
        return () => {
            isMountedRef.current = false;
        };
    }, [poll]);

    /** Auto scroll */
    useEffect(() => {
        if (scrollContainerRef.current && messagesEndRef.current) {
            scrollContainerRef.current.scrollTo({
                top: messagesEndRef.current.offsetTop,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    return (
        <div className="h-full flex flex-col bg-blue-50">
            {/* Header */}
            <h2 className="text-xl font-bold mb-4 text-blue-600 px-6 pt-6">
                {displayName}
            </h2>

            {/* Wrapper */}
            <div className="flex-1 flex flex-col bg-white mx-6 mb-6 rounded-xl shadow-md overflow-hidden">
                {/* Messages */}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
                    {messages.map((msg, idx) => {
                        const isMine = msg.sender === currentUserId;
                        const prevMsg = messages[idx - 1];
                        const sameSenderAsPrev = prevMsg && prevMsg.sender === msg.sender;
                        const msgKey = msg.id || msg.clientId || idx;

                        return (
                            <div
                                key={msgKey}
                                className={`flex ${isMine ? 'justify-end' : 'justify-start'} items-end`}
                            >
                                {!isMine && !sameSenderAsPrev && (
                                    <img
                                        src={msg.senderAvatarUrl || '/default-avatar.png'}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                )}

                                <div className="flex flex-col">
                                    <div
                                        onClick={() =>
                                            setActiveMsgId(activeMsgId === msgKey ? null : msgKey)
                                        }
                                        className={`cursor-pointer max-w-xs px-4 py-2 rounded-3xl shadow text-sm break-words ${isMine
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-gray-200 text-gray-900 rounded-bl-none'
                                            } ${sameSenderAsPrev ? 'mt-1 ml-10' : ''}`}
                                    >
                                        <p>{msg.content}</p>
                                    </div>

                                    {/* Animate timestamp */}
                                    <AnimatePresence>
                                        {activeMsgId === msgKey && (
                                            <motion.span
                                                initial={{ opacity: 0, y: -2 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -2 }}
                                                transition={{ duration: 0.2 }}
                                                className={`text-[10px] opacity-70 mt-1 ${isMine ? 'text-right' : 'ml-10 text-left'
                                                    }`}
                                            >
                                                {msg.timestamp &&
                                                    new Date(msg.timestamp).toLocaleTimeString()}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* {isMine && !sameSenderAsPrev && (
                                    <img
                                        src={msg.senderAvatarUrl || '/default-avatar.png'}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full ml-2"
                                    />
                                )} */}
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input bar */}
                <div className="border-t border-gray-200 p-3 flex items-center bg-white">
                    <input
                        type="text"
                        className="flex-1 px-3 py-2 text-sm border-0 focus:ring-0 focus:outline-none"
                        placeholder={isConnected ? 'Aa' : 'Disconnected...'}
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        disabled={!isConnected}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!isConnected}
                        className={`p-2 rounded-full ${isConnected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
                            } text-white`}
                    >
                        <IconSend size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;