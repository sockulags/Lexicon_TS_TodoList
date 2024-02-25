
export interface ITodoItem {
    id: number;
    title: string;
    category: "personal" | "work" | "home" | "other";
    completed: boolean;
    onToggleCompleted: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    author: string; 
    createdAt: string; 
  }
  export function TodoItem(props: ITodoItem) {
    const { id, title, category, completed, onToggleCompleted, onDelete, onEdit, author, createdAt } = props;
  
    const formattedDate = new Date(createdAt).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  
    // Function to handle the custom checkbox click
    const handleCheckboxClick = () => {
      onToggleCompleted(id);
    };
  
    return (
      <article className={`todoItem ${category}`}>
        <div className="todoInfo">
          <div
            className={`customCheckbox ${completed ? "checked" : ""}`}
            onClick={handleCheckboxClick}      
          ></div>
          <div className={`todoDetails ${completed ? "completed" : ""}`}>
            <header>
              <h4>{title}</h4>
            </header>
            <p className="detailsText">
              Author: <span>{author}</span> | Created: <time dateTime={createdAt}>{formattedDate}</time>
            </p>
          </div>
        </div>
        <div className="actionButtons">
          <span className="material-symbols-outlined edit" onClick={() => onEdit(id)}>edit</span>
          <span className="material-symbols-outlined delete" onClick={() => onDelete(id)}>delete</span>
        </div>
      </article>
    );
  }
  