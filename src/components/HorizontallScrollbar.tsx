import React from 'react';

export function HorizontalScrollbar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

   const days = [];
  for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
    days.push({
      date: new Date(date), 
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      dateString: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    });
  }

  const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-container">
      <div className="scrollbar">
        {days.map((day, index) => (
          <div className="day-container" key={index}>
            <div className="day-name">{day.dayName}</div>
            <div className="date">{day.dateString}</div>
          </div>
        ))}
      </div>
      <h1><span>arrow_left</span>{monthYear}<span>arrow_right</span></h1>
    </div>
  );
}
