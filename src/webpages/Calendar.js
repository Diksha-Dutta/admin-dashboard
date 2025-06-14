import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable, click, etc.
import { format } from 'date-fns';

export default function CalendarPage() {
  const [events, setEvents] = useState([
    { title: '🌱 Project Kickoff', date: '2025-06-16', description: 'Initial team sync-up' },
    { title: '🎨 UI Review', date: '2025-06-18', description: 'Final design review' },
    { title: '🚀 Launch Day', date: '2025-06-20', description: 'Go live!' },
  ]);

  const handleDateClick = (info) => {
    const title = prompt('📝 Enter event title:');
    if (title) {
      const newEvent = { title, date: info.dateStr };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (info) => {
    alert(`📌 ${info.event.title}\n📅 ${format(new Date(info.event.start), 'PPP')}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center">📅 Your Awesome Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        editable={true}
        eventColor="#4f46e5"
        eventTextColor="#fff"
        dayMaxEvents={2}
      />
    </div>
  );
}
