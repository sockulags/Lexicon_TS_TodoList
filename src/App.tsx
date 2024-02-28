import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import "./scss/main.scss";
import { NewTodoItem } from "./components/AddOrEdit";
import { tasks, ITodoItem } from "./assets/data/tasks";
import { HorizontalScrollbar } from "./components/HorizontallScrollbar";

export function App() {
  const createOrUpdateTodoItem = (todo: ITodoItem, isUpdate: boolean) => {
    if (isUpdate) {
      const index = tasks.findIndex((x) => x.id === todo.id);
      if (index !== -1) {
        tasks[index] = todo;
        console.log("Todo updated", tasks);
      }
    } else {
      tasks.push(todo);
      console.log("Todo added", tasks);
    }
  };

  return (
    <Router>
      <HorizontalScrollbar />
      <div className="main">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/newtask">Add Task</Link>
        </nav>
<Routes>
  <Route path="/" element={<TodoList />} />
  <Route path="/newtask" element={<NewTodoItem onCreateOrUpdate={createOrUpdateTodoItem} />} />
  <Route path="/edittask/:taskId" element={<NewTodoItem onCreateOrUpdate={createOrUpdateTodoItem} />} />
</Routes>
      </div>
    </Router>
  );
}
