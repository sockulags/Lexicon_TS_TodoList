import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import "./scss/main.scss"
import { NewTodoItem } from './components/NewTodoItem';
import { tasks, ITodoItem } from './assets/data/tasks';
import { HorizontalScrollbar } from './components/HorizontallScrollbar';


export function App() { 

  const createTodoItem = (newTodo:ITodoItem) => {
      tasks.push(newTodo);
  };

  return (
    <Router>
      <HorizontalScrollbar/>
      <div className="main">
        <nav>         
           <Link to="/">Home</Link>
           <Link to="/newtask">Add Task</Link>        
        </nav>
        <Routes> 
          <Route path="/" element={<TodoList/>} />
          <Route path="/newtask" element={<NewTodoItem onCreate={createTodoItem}/>}/>
        </Routes>
      </div>
    </Router>
  );
}