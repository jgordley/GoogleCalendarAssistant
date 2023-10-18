'use client';
import { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/solid';
import SignInButton from '../components/signin-btn';
import { useSession } from "next-auth/react";
import { fetchPrimaryCalendarEvents, fetchCalendarList, fetchPrimaryChat } from './CalendarUtils';


export default function Chat() {
    const { status, data: session } = useSession();

    const [messages, setMessages] = useState([
        { user: "User2", text: "Hi! My name is Callie, your Google Calendar Assistant. What can I help you with?", color: "green" },
    ]);

    const [currentMessage, setCurrentMessage] = useState('');
    const messagesRef = useRef(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);  // assuming `messages` is the array of messages

    function renderWithLineBreaks(text: string) {
        const newText = text.split('\n').map((str, index, array) =>
            index === array.length - 1 ? str : <>
                {str}
                <br />
            </>
        );
        return newText;
    }

    // TODO: Make this into a function instead of setting new message state directly in each handler
    // const updateMessages = async (newMessage: any) => {

    // }


    const handleSendMessage = async (e: any) => {

        // Prevent default form submission
        e.preventDefault();

        if (currentMessage.trim() !== '') {
            setMessages(prevMessages => [
                ...prevMessages,
                { user: "User1", text: currentMessage, color: "blue" }

            ]);
            setCurrentMessage('');
        }

        // Send a request to the backend

        if (currentMessage.includes('calendars')) {
            let email: string = session?.user?.email || '';
            let calendars = await fetchCalendarList(email);
            console.log(calendars);

            const calendarNames = calendars.calendar_names.map((calendar: any) => Object.values(calendar)[0]);
            const resultString = `Calendar Names: ${calendarNames.join(', ')}`;

            setMessages(prevMessages => [
                ...prevMessages,
                { user: "User2", text: resultString, color: "green" }
            ]);
        } else if (currentMessage.includes('events')) {
            let email: string = session?.user?.email || '';
            let events = await fetchPrimaryCalendarEvents(email);
            console.log(events);

            const eventNames = events.events;
            const resultString = `Upcoming Events:\n ${eventNames.join('\n ')}`;

            setMessages(prevMessages => [
                ...prevMessages,
                { user: "User2", text: resultString, color: "green" }
            ]);
        } else {
            // Append a random string message from user2 without fetching
            const randomString = Math.random().toString(36).substring(7);
            setMessages(prevMessages => [
                ...prevMessages,
                { user: "User2", text: randomString, color: "green" }
            ]);
        }


    }

    return (
        <div className="flex flex-col h-screen">
            {/* <div className="flex flex-col h-screen"> */}
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white flex-shrink-0">
                <div className="flex items-center">
                    <CalendarIcon className="h-8 w-8 text-white" />
                    <h1 className="ml-2 text-2xl">Google Calendar Assistant</h1>
                </div>
                <SignInButton />
            </header>

            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-80 bg-white">
                    <div id="messages" ref={messagesEndRef} className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                        {messages.map((msg, idx) => (
                            msg.user === "User1" ? (
                                <div>
                                    <div className="flex items-end justify-end">
                                        <div className="flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 order-1 items-end">
                                            <div>
                                                <span className="px-4 py-3 rounded-xl inline-block rounded-br-none bg-blue-500 text-white">{msg.text}</span>
                                            </div>
                                        </div>
                                        <img src="https://i.pravatar.cc/100?img=7" alt="" className="w-6 h-6 rounded-full order-2"></img>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 order-2 items-start">
                                            <div>
                                                <span className="px-4 py-3 rounded-xl inline-block rounded-bl-none bg-gray-100 text-gray-600">{msg.text}</span>
                                            </div>
                                        </div>
                                        <img src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png" alt="" className="w-6 h-6 rounded-full order-1"></img>
                                    </div>
                                </div>
                            )
                        )
                        )}
                        <div x-show="botTyping" style={{ display: "none" }}>
                            <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                                    <div><img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="..." className="w-16 ml-6"></img></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <form onSubmit={handleSendMessage}>
                            <div className="relative flex">
                                <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Say something..." autoFocus={true} autoCorrect="false" className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2" x-ref="input" />
                                <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
                                    <button type="submit" className="inline-flex items-center rounded-full justify-center transition duration-200 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>


                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
            {/* </div> */}
        </div>
    );
}
