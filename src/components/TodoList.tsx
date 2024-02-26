import { TodoItem } from './TodoItem';
import { tasks, ITodoItem } from "../assets/data/tasks";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const groupTodosByCategory = (todos: ITodoItem[]): Record<string, ITodoItem[]> => {
    const groups: Record<string, ITodoItem[]> = {};
    for (const item of todos) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }
    return groups;
  };

const formatCategory = (category :string) => {
    let formattedCategory:string = "";
    switch(category){
        case "personal": formattedCategory += "🥷"; break;
        case"work": formattedCategory+= "🗒️"; break;
        case "home": formattedCategory += "🏠"; break;
        case "other": formattedCategory+= "🤷‍♂️"; break;
        default: break;
    }
    formattedCategory += ` ${category.charAt(0).toUpperCase() + category.slice(1)}`
    return formattedCategory;
}

export function TodoList() {
    const [todos, setTodos] = useState<ITodoItem[]>(tasks);
  
    const onToggleCompleted = (id?: number) => {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
    };

    const onDelete = (id?: number)=> {
        const updatedTodos = todos.filter(todo=> todo.id !== id);
        setTodos(updatedTodos)
    }
  
    const groupedTodos = groupTodosByCategory(todos);
    const navigate = useNavigate();
    const handleButtonClick = () => {   
        navigate('/newtask');
      };
  
    return (
      <div>
        {Object.entries(groupedTodos).map(([category, todosInCategory]) => (
          <div key={category}>
            <h2>{formatCategory(category)}</h2>
            {todosInCategory.map(todo => (
              <TodoItem
                key={todo.id}
                {...todo}
                onToggleCompleted={onToggleCompleted}
                onDelete={onDelete} 
                onEdit={(id) => console.log(`Edit item ${id}`)}
              />
            ))}
          </div>
        ))}
        <button onClick={handleButtonClick}>Add Task</button>
      </div>
    );
  }