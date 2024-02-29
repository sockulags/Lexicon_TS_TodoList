import { TodoItem } from './TodoItem';
import { tasks, ITodoItem, weekDays } from "../assets/data/tasks";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomConfirm } from './CustomConfirm';
import todoImg from "../assets/todo_icon.svg";


interface TodoListProps {
    sort: string[];
}

export function TodoList({ sort }: TodoListProps) {
    const { date } = useParams();
    const [todos, setTodos] = useState<ITodoItem[]>(tasks);
    const [selectedTodo, setSelectedTodo] = useState<ITodoItem | null>(null);

    const groupTodosByCategory = (todos: ITodoItem[], sort: string[]): Record<string, ITodoItem[]> => {
        const groups: Record<string, ITodoItem[]> = {};
        if (sort.length === 0) {
            groups[""] = todos;
        } else {
            for (const item of todos) {
                if (sort.includes(item.category)) {
                    if (!groups[item.category]) {
                        groups[item.category] = [];
                    }
                    groups[item.category].push(item);
                }
            }
        }
        return groups;
    };

    const formatCategory = (category: string) => {
        let formattedCategory: string = "";
        switch (category) {
            case "personal":
                formattedCategory += "🥷"; break;
            case "work":
                formattedCategory += "🗒️"; break;
            case "home":
                formattedCategory += "🏠"; break;
            case "other":
                formattedCategory += "🤷‍♂️"; break;
            default: break;
        }
        formattedCategory += ` ${category.charAt(0).toUpperCase() + category.slice(1)}`
        return formattedCategory;
    }

    useEffect(() => {
        setTodos(tasks);
    }, []);

    const onToggleCompleted = (id?: number) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const onDelete = (id?: number) => {
        if (id !== undefined) {
            const todoToDelete = todos.find(todo => todo.id === id);
            if (todoToDelete) {
                setSelectedTodo(todoToDelete);
            }
        }
    };

    const getWeekdayFromParams = () => {
        if (date) {
            const year = date.slice(0, 4);
            const month = parseInt(date.slice(4, 6)) - 1;
            const day = date.slice(6, 8);

            const todaysDate = new Date(parseInt(year), month, parseInt(day))
            return todaysDate.getDay();
        } else{
          const today = new Date();
          return today.getDay();
    }
    }

    const handleDeleteConfirm = () => {
        if (selectedTodo) {
            const updatedTodos = todos.filter(todo => todo.id !== selectedTodo.id);
            setTodos(updatedTodos);
            setSelectedTodo(null);
        }
    };

    const handleDeleteCancel = () => {
        setSelectedTodo(null);
    };

    const message: string[] = ["Are you sure you want to delete this?", "If this task is an occurring task, the deletion will lead to occurring tasks of this to also be deleted."]

    const nav = useNavigate();
    const onEdit = (id: number) => {
        nav("/edittask/" + id)
    } 

    const filteredTodos = todos.filter(todo => {
        if (todo.occuring && todo.occuring.includes(weekDays[getWeekdayFromParams()])) {
            return true;
        }
        if (!todo.occuring || todo.occuring.length === 0) {
            return true;
        }
        return false;
    });

    const groupedTodos = groupTodosByCategory(filteredTodos, sort);
    const handleButtonClick = () => {
        nav('/newtask');
    };

    return (
        <div className="todoList-container">
            {Object.entries(groupedTodos).map(([category, todosInCategory]) => (
                <div key={category}>
                    <h2 className="task-header">{category ? formatCategory(category) : <div style={{height: "33px", width: "33px"}}><img style={{height: "100%"}}src={todoImg}/>Tasks </div>  }</h2>
                    {todosInCategory.map(todo => (
                        <TodoItem
                            key={todo.id}
                            {...todo}
                            onToggleCompleted={onToggleCompleted}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            ))}
            <button onClick={handleButtonClick}>+ Add Task</button>
            {selectedTodo && (
                <CustomConfirm
                    confirmation={message[0]}
                    message={message[1]}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}
        </div>
    );
}
