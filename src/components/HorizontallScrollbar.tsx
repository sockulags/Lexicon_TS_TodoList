import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

interface Day {
  date: Date;
  dayName: string;
  dateString: string;
  dateParams: string;
}

export function HorizontalScrollbar() {
  const now = new Date();
  const year: number = now.getFullYear();
  const month: number = now.getMonth();

  const firstDayOfMonth: Date = new Date(year, month, 1);
  const lastDayOfMonth: Date = new Date(year, month + 1, 0);
  const { date } = useParams<{ date?: string }>();
  const activeDate = date ?? now.toISOString().slice(0, 10).replace(/-/g, ''); 
  
  const days: Day[] = [];

  for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
    days.push({
      date: new Date(date),
      dayName: date.toLocaleDateString('en-GB', { weekday: 'long' }),
      dateString: date.toLocaleDateString('en-GB', { day: 'numeric' }),
      dateParams: `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
    });
  }

  const monthYear: string = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const navigate = useNavigate();
  const onToggleDate = (dateParams: string): void => (
    navigate("/" + dateParams)
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToActiveDay = (): void => {
    const activeDayElement: HTMLElement | null = document.querySelector('.day-container.active-day') as HTMLElement;
    if (activeDayElement && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = activeDayElement.offsetLeft - (scrollContainerRef.current.offsetWidth / 2) + (activeDayElement.offsetWidth / 2);
    }
  };

  useEffect(() => {
    scrollToActiveDay();
  }, [date]);

  return (
    <div className="calendar-container">
      <div className="scrollbar" ref={scrollContainerRef}>
        {days.map((day, index) => (
          <div className={`day-container ${day.dateParams === activeDate ? "active-day" : ""}`} key={index} onClick={() => onToggleDate(day.dateParams)}>
            <div className="day-name">{day.dayName === "Thursday" ? day.dayName.slice(0, 4) : day.dayName.slice(0, 3)}</div>
            <div className="date">{day.dateString}</div>
          </div>
        ))}
      </div>
      <h1><span className="material-symbols-outlined">arrow_left</span>{monthYear}<span className="material-symbols-outlined">arrow_right</span></h1>
    </div>
  );
}