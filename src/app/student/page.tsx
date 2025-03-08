'use client';

import Calendar from "@/components/Calendar";
import { FiPlus } from 'react-icons/fi';
import EventForm from "@/components/EventForm";
import { useState } from "react";

export default function StudentPage() {
    const [showEventForm, setShowEventForm] = useState(false);

    return (
        <>
            {showEventForm && <EventForm onClose={()=>setShowEventForm(false)} />}
            <h1 className="text-gray-400">Student &gt; Calendar</h1>
            <div>
                <button onClick={()=>setShowEventForm(true)} className="bg-sky-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 ml-auto cursor-pointer"><FiPlus/> Event</button>
            </div>

            <Calendar />
        </>
    );
}