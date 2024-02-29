
import { useNavigate} from "react-router-dom";

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
      dayName: date.toLocaleDateString('en-GB', { weekday: 'long' }),
      dateString: date.toLocaleDateString('en-GB', { day: 'numeric'}),
      dateParams: `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
    });
  }

  const monthYear = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const navigate = useNavigate();
  const onToggleDate = (dateParams: string) => (
   navigate("/"+ dateParams)
  )  
  
  return (
    <div className="calendar-container">
      <div className="scrollbar">
        {days.map((day, index) => (
          <div className="day-container" key={index} onClick={() => onToggleDate(day.dateParams)}>
            <div className="day-name">{day.dayName === "Thursday" ? day.dayName.slice(0,4) : day.dayName.slice(0,3)}</div>
            <div className="date">{day.dateString}</div>
          </div>
        ))}
      </div>
      <h1><span className="material-symbols-outlined">arrow_left</span>{monthYear}<span className="material-symbols-outlined">arrow_right</span></h1>
    </div>
  );
}
