'use client';
import { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/solid';
import SignInButton from '../components/signin-btn';
import { useSession } from "next-auth/react";
import { fetchPrimaryCalendarEvents, fetchCalendarList, fetchPrimaryChat } from './CalendarUtils';


export default function Chat() {
    const { status, data:session } = useSession();

    const [messages, setMessages] = useState([
        { user: "User2", text: "Hi! My name is Callie, your Google Calendar Assistant. What can I help you with?", color: "green" },
    ]);

    const [currentMessage, setCurrentMessage] = useState('');
    const messagesRef = useRef(null);

    function renderWithLineBreaks(text: string) {
        const newText = text.split('\n').map((str, index, array) => 
            index === array.length - 1 ? str : <>
                {str}
                <br />
            </>
        );
        return newText;
    }
    

    const handleSendMessage = async (e: any) => {

        // Prevent default form submission
        e.preventDefault();

        if (currentMessage.trim() !== '') {
            setMessages(prevMessages => [
                { user: "User1", text: currentMessage, color: "blue" }, 
                ...prevMessages
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
                { user: "User2", text: resultString, color: "green" },
                ...prevMessages
            ]);
        }

        if (currentMessage.includes('events')) {
            let email: string = session?.user?.email || '';
            let events = await fetchPrimaryCalendarEvents(email);
            console.log(events);
            
            const eventNames = events.events;
            const resultString = `Upcoming Events:\n ${eventNames.join('\n ')}`;
        
            setMessages(prevMessages => [
                { user: "User2", text: resultString, color: "green" },
                ...prevMessages
            ]);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <div className="flex items-center">
                    <CalendarIcon className="h-8 w-8 text-white" />
                    <h1 className="ml-2 text-2xl">Google Calendar Assistant</h1>
                </div>
                <SignInButton />
            </header>

            <main className="flex-1 flex flex-col">

                <div className="flex-grow flex flex-col-reverse bg-white p-4 overflow-y-auto" ref={messagesRef}>
                    {messages.map((msg, idx) => (
                        <div key={idx} className="mb-4">
                            <div className={`font-semibold text-${msg.color}-500`}>{msg.user}:</div>
                            <div className={`bg-${msg.color}-100 p-2 rounded mt-1`}>
                                {renderWithLineBreaks(msg.text)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6">
                    <form onSubmit={handleSendMessage}>
                        <input
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Type a message..."
                        />
                        <button
                            type="submit"  // This is important for form behavior
                            className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
                            Send
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
}
