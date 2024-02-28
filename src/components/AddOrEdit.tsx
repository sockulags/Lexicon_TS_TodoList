import {  tasks, ITodoItem } from "../assets/data/tasks";
import { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import Checkbox from "./Checkbox";

interface AddOrEditProps {
    onCreateOrUpdate: (todo: ITodoItem, isUpdate: boolean) => void;
  }
  
  export const NewTodoItem = ({ onCreateOrUpdate }: AddOrEditProps) => {
    const [todo, setTodo] = useState({ title: "", category: "", author: "", completed: false, createdAt: "" });
    const { taskId } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {    
      if (taskId) {   
        const existingTodo = tasks.find(t => t.id === parseInt(taskId)); 
       
        if (existingTodo) {
          setTodo({      
            title: existingTodo.title,
            category: existingTodo.category,
            author: existingTodo.author,
            completed: existingTodo.completed,
            createdAt: existingTodo.createdAt
          });
        }
      }
    }, [taskId]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTodo(prev => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (taskId) {
        onCreateOrUpdate({ ...todo, id: Number(taskId) }, true); 
      } else {
        onCreateOrUpdate({ ...todo, id: Date.now() }, false); 
      }
      navigate('/');
    };
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
          <select
            value={todo.category}
            onChange={handleChange}
            name="category"
          >
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
          <h2>Is this an reoccuring task?</h2>
        <div className="checkbox-container">
          <Checkbox name={"Mon"} checked={false}/>
          <Checkbox name={"Tue"} checked={false}/>
          <Checkbox name={"Wed"} checked={false}/>
          <Checkbox name={"Thur"} checked={false}/>
          <Checkbox name={"Fri"} checked={false}/>
          <Checkbox name={"Sat"} checked={false}/>
          <Checkbox name={"Sun"} checked={false}/>
          </div> 
      <button type="submit">{taskId ? "Add Task" : "Update Task"}</button>
    </form>
  );
}


