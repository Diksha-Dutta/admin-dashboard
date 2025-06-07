import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default function CalendarPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
}
