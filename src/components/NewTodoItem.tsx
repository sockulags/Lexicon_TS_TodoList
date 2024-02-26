import {  ITodoItem } from "../assets/data/tasks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewTodoItemProps {
  onCreate: (todo: ITodoItem) => void;
}

export function NewTodoItem({ onCreate }: NewTodoItemProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: ITodoItem = {
      id: new Date().getTime(),
      title,
      category,
      author,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onCreate(newTodo);

    setTitle("");
    setAuthor("");
    setCategory("personal");
    navigate("/");

  };

  return (
    <form onSubmit={handleSubmit}>    
    <h1>Add new task</h1>  
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            spellCheck="false"
          />
        </label>     
          <label>
          Category:
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value)
            }
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
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            spellCheck="false"
          />
        </label>    
      <button type="submit">Create Todo</button>
    </form>
  );
}


