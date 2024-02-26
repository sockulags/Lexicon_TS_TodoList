export interface ITodoItem {
    id?: number;
    title: string;
    category:string;
    completed: boolean;
    author: string; 
    createdAt: string; 
  }

  export const tasks: ITodoItem[] = [
    {
        id: 1,
        title: 'Build a React app',
        category: "work",
        completed: false,
        author: 'Lucas Skog',
        createdAt: new Date().toISOString(), 
      },
      {
        id: 2,
        title: 'Build a React app',
        category: "personal",
        completed: false,
        author: 'Lucas Skog',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Build a React app',
        category: "home",
        completed: false,
        author: 'Lucas Skog',
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        title: 'Build a React app',
        category: "other",
        completed: false,
        author: 'Lucas Skog',
        createdAt: new Date().toISOString(),
      },  {
        id: 5,
        title: 'Build a React app',
        category: "other",
        completed: false,
        author: 'Lucas Skog',
        createdAt: new Date().toISOString(),
      },
];