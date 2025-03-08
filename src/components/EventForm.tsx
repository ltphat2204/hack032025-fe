'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiPlus, FiTrash, FiSend } from 'react-icons/fi';

interface Event {
  subject: string;
  type: string;
  dueDateTime: string;
}

export default function EventForm({ onClose }: { onClose: () => void }) {
  const { control, handleSubmit } = useForm<{ events: Event[] }>({
    defaultValues: { events: [{ subject: '', type: '', dueDateTime: '' }] },
  });
  const [events, setEvents] = useState<Event[]>([{ subject: '', type: '', dueDateTime: '' }]);

  const addEvent = () => {
    setEvents([...events, { subject: '', type: '', dueDateTime: '' }]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const onSubmit = (data: { events: Event[] }) => {
    console.log('Submitted Data:', data);
  };

  return (
    <div onClick={onClose} className='w-screen h-screen flex flex-col items-center justify-center fixed top-0 left-0 bg-black/50'>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-sky-950">Event Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {events.map((_, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                    <Controller
                    name={`events.${index}.subject` as const}
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="text" placeholder="Subject" className="p-2 border rounded w-1/3 bg-white text-sky-950" />
                    )}
                    />
                    <Controller
                    name={`events.${index}.type` as const}
                    control={control}
                    render={({ field }) => (
                        <select {...field} className="p-2 border rounded w-1/3 bg-white text-sky-950">
                        <option value="">Select Type</option>
                        <option value="Exam">Exam</option>
                        <option value="Homework">Homework</option>
                        </select>
                    )}
                    />
                    <Controller
                    name={`events.${index}.dueDateTime` as const}
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="datetime-local" className="p-2 border rounded w-1/3 bg-white text-sky-950" />
                    )}
                    />
                    <button type="button" onClick={() => removeEvent(index)} className="text-red-500 hover:text-red-700">
                        <FiTrash size={20} />
                    </button>
                </div>
                ))}
                <button
                type="button"
                onClick={addEvent}
                className="flex cursor-pointer items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
                >
                <FiPlus /> <span>Event</span>
                </button>
                <button type="submit" className="mt-4 ml-auto w-fit flex items-center space-x-2 bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800">
                <FiSend /><span>Submit</span>
                </button>
            </form>
            </div>
    </div>
  );
}
