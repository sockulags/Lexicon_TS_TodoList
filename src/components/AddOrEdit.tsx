import { tasks, ITodoItem, weekDays } from "../assets/data/tasks";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Checkbox from "./Checkbox";

interface AddOrEditProps {
  onCreateOrUpdate: (todo: ITodoItem, isUpdate: boolean) => void;
}

export const NewTodoItem = ({ onCreateOrUpdate }: AddOrEditProps) => {
  const [todo, setTodo] = useState({
    title: "",
    category: "personal",
    author: "",
    completed: false,
    createdAt: "", 
  });
  const [occuringDays, setOccuringDays] = useState<string[]>([]);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [showOccuring, setShowOccuring] = useState<boolean>(false);
  useEffect(() => {
    if (taskId) {
      const existingTodo = tasks.find((t) => t.id === parseInt(taskId));

      if (existingTodo) {
        setTodo({
          title: existingTodo.title,
          category: existingTodo.category,
          author: existingTodo.author,
          completed: existingTodo.completed,
          createdAt: existingTodo.createdAt,
        });
        if(existingTodo.occuring){
         setOccuringDays(existingTodo.occuring);
         setShowOccuring(true);
        }
      }
    }
  }, [taskId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskId) {
      onCreateOrUpdate({ ...todo, id: Number(taskId), occuring: showOccuring && occuringDays.length > 0 ? occuringDays: undefined }, true);
    } else {
      onCreateOrUpdate({ ...todo, id: Date.now(), occuring: showOccuring && occuringDays.length > 0 ? occuringDays: undefined}, false);
    }
    navigate("/");
  };

 
  const handleRadioToggle = (checked:boolean) => {
setShowOccuring(checked)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{taskId ? "Edit Task" : "Add New Task"}</h1>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={todo.title}
          onChange={handleChange}
          required
          spellCheck="false"
        />
      </label>
      <label>
        Category:
        <select value={todo.category} onChange={handleChange} name="category">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Author:
        <input
          name="author"
          type="text"
          value={todo.author}
          onChange={handleChange}
          spellCheck="false"
        />
      </label>
      <div className="radio-container">
        <h2>Is this an occuring task?</h2>
        <div className="radio-inputs">
          <label className="radio">
            <input type="radio" name="radio" checked={showOccuring} onChange={() => handleRadioToggle(true)}/>
            <span className="name">Yes</span>
          </label>
          <label className="radio">
            <input type="radio" name="radio" checked={!showOccuring} onChange={() => handleRadioToggle(false)}/>
            <span className="name">No</span>
          </label>
        </div>
      </div>
      {showOccuring ? 
      <div className="radio-inputs">
       {weekDays.map(day => (
    <Checkbox key={day} name={day[0].toUpperCase() + day.slice(1)} checked={occuringDays.includes(day)} />
  ))}
      </div>
      : ""}
      <button type="submit">{!taskId ? "Add Task" : "Update Task"}</button>
    </form>
  );
};
