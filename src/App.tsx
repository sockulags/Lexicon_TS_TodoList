import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import "./scss/main.scss";
import { NewTodoItem } from "./components/AddOrEdit";
import { tasks, ITodoItem } from "./assets/data/tasks";
import { HorizontalScrollbar } from "./components/HorizontallScrollbar";
import SideBar from "./components/SideBar";
import { useState } from "react";


export function App() {
const [sortOptions, setSortedOptions] = useState<string[]>([]);

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

  const onToggleSorted = (category: string) => {   
    const updatedOptions = [...sortOptions];
    const index = updatedOptions.indexOf(category);

    if (index !== -1) {
        updatedOptions.splice(index, 1);
    } else {
        updatedOptions.push(category);
    }
    setSortedOptions(updatedOptions);
};

  return (
    <Router>
      <HorizontalScrollbar />
      <div className="main">
        <SideBar onToggleSorted={onToggleSorted}/>
        <Routes>
          <Route path="/" element={<TodoList sort={sortOptions}/>} />
          <Route path="/:date" element={<TodoList sort={sortOptions}/>} />
          <Route
            path="/newtask"
            element={<NewTodoItem onCreateOrUpdate={createOrUpdateTodoItem} />}
          />
          <Route
            path="/edittask/:taskId"
            element={<NewTodoItem onCreateOrUpdate={createOrUpdateTodoItem} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
