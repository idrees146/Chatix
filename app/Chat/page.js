"use client";
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
    // Adding message to the database
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [refresh, setRefresh] = useState(false);

    // Fetching messages from the database
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sender's email
    const [sender, setSender] = useState('mr-auto');

    // Sending the message
    useEffect(() => {
        if (session) {
            setEmail(session.user.email); // Set email from session
            setSender(session.user.email); // Set sender's email
        }
    }, [session]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Prevent sending empty messages

        try {
            const res = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, email }) // Send both message and email
            });

            const data = await res.json();

            if (data.success) {
                setMessage(''); // Clear input after successful send
                setRefresh((prev) => !prev); // Toggle the refresh state to re-fetch
            } else {
                console.log('Failed to send message');
            }
        } catch (e) {
            console.log('Error: ' + e.message);
        }
    };

    // Fetching the messages
    useEffect(() => {
        async function fetchMessages() {
            setLoading(true); // Show loading spinner during fetch

            const res = await fetch('/api/getMessage');
            const data = await res.json();
            setMessages(data.data);
            setLoading(false);
        }

        fetchMessages();
    }, [refresh]);

    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session]);


    const handleRefresh = () => {
        setRefresh((prev) => !prev); // Toggle the refresh state to re-fetch
    }



    return (
        <div className="flex flex-col h-screen w-full">
            <div className="profile p-2 flex items-center   gap-4 h-16 bg-green-900 sticky top-0 z-50 shadow-md">
                {session && (
                    <h2 className="text-white  cursor-pointer">
                        {session.user.email === 'muhammadidr1122@gmail.com' ? (
                            <div className="flex items-center gap-4">
                                <img src="/cat.jpg" className="rounded-full" width={35} />
                                <span>Alina</span>
                            </div>
                        ) : (
                            <div className="flex items-center  gap-4">
                                <img src="/idrees.jpg" className="rounded-full" width={35} />
                                <span>Muhammad</span>
                            </div>
                        )}
                    </h2>
                )}

                {session && (
                    <span
                        onClick={handleRefresh}

                        className="text-white mr-4 hover:underline cursor-pointer"
                    >
                        Refresh
                    </span>
                )}


                {session && (
                    <span
                        onClick={signOut}
                        className="text-white mr-1 md:mr-4 hover:underline cursor-pointer"
                    >
                        Sign out
                    </span>
                )}


            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`${msg.email === sender ? 'ml-auto text-white bg-blue-700' : 'mr-auto text-black  bg-gray-200'
                            }  p-3 text-sm md:text-xl max-w-xs md:max-w-md rounded-lg my-6`}
                    >
                        {msg.message}
                    </div>
                ))}
            </div>

            <div className="w-full sticky bottom-0 bg-emerald-900 p-2">
                <form onSubmit={sendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-2 rounded-lg text-black"
                        placeholder="Type a message..."
                    />

                    <input type="text" value={email} readOnly className="hidden" />
                    <button type="submit" className="p-2 bg-blue-700 text-white rounded-lg">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
