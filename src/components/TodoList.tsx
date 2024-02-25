import { TodoItem, ITodoItem } from './TodoItem';

const mockTodos: ITodoItem[] = [
    {
        id: 1,
        title: 'Learn TypeScript',
        category: "work",
        completed: false,
        onToggleCompleted: (id) => console.log(`Toggle completed for item ${id}`),
        onDelete: (id) => console.log(`Delete item ${id}`),
        onEdit: (id) => console.log(`Edit item ${id}`),
        author: 'John Doe',
        createdAt: new Date().toISOString(), 
      },
      {
        id: 2,
        title: 'Build a React app',
        category: "personal",
        completed: true,
        onToggleCompleted: (id) => console.log(`Toggle completed for item ${id}`),
        onDelete: (id) => console.log(`Delete item ${id}`),
        onEdit: (id) => console.log(`Edit item ${id}`),
        author: 'Jane Smith',
        createdAt: new Date().toISOString(),
      },
];

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

export function TodoList() {
  const groupedTodos = groupTodosByCategory(mockTodos);

  return (
    <div>
      {Object.entries(groupedTodos).map(([category, todos]) => (
        <div key={category}>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          {todos.map(todo => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      ))}
    </div>
  );
}
