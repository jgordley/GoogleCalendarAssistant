// CalendarDropdown.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import Spinner from './spinner';

interface Props {
    calendarIds: string[];
    onCalendarChange: (id: string) => void;
    loading: boolean;
}

const CalendarDropdown: React.FC<Props> = ({ calendarIds, onCalendarChange, loading }) => {
    // Assume the first calendar ID is the default selected value
    const [selectedCalendar, setSelectedCalendar] = useState<string>(calendarIds[0]);

    useEffect(() => {
        onCalendarChange(selectedCalendar);
    }, [selectedCalendar, onCalendarChange]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!loading) {
            console.log("CalendarDropdown.tsx handleChange: " + e.target.value);
            setSelectedCalendar(e.target.value);
        }
    };

    return (
        <div>
                {loading ? 
                (
                    <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        <Spinner loadingText="Loading calendars..." />
                    </button>
                ) : (
                    <select value={selectedCalendar} onChange={handleChange} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        {calendarIds.map(id => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                    </select>
                )}
        </div>

    );
}

export default CalendarDropdown;
