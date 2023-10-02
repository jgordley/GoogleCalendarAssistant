'use client';
import React from 'react';

interface Props {
    ACCESS_TOKEN: string;
}

// Define the structure of the calendar item
interface CalendarItem {
    summary: string;
}

const CalendarButton: React.FC<Props> = ({ ACCESS_TOKEN }) => {

    const fetchCalendars: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();

        const endpoint = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
        const headers = {
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        };

        try {
            const response = await fetch(endpoint, { headers });
            const data = await response.json();

            if (response.status === 200) {
                const calendars = data.items || [];
                calendars.forEach((calendar: CalendarItem) => {
                    alert(calendar.summary);
                });
            } else if (data.error) {
                alert(`Error ${response.status}: ${data.error.message}`);
            } else {
                alert('Unexpected error occurred');
            }
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <button onClick={fetchCalendars}>
            List Calendar Events
        </button>
    );
}

export default CalendarButton;
