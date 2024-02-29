import { Link } from "react-router-dom";
import { useState } from "react";

interface SideBarProps {
  onToggleSorted: (category: string) => void;
}

export function SideBar({ onToggleSorted }: SideBarProps) {
  const categories: string[] = ["personal", "work", "home", "other"];
   const [checkedCategories, setCheckedCategories] = useState<boolean[]>(Array(categories.length).fill(false));

  const toggleCategory = (index: number) => {
    const updatedCategories = [...checkedCategories];
    updatedCategories[index] = !updatedCategories[index];
    setCheckedCategories(updatedCategories);
  };

  return (
    <div className="sideBar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/newtask">Add Task</Link>
      </nav>
      <div className="sorting-container">
        {categories.map((c, index) => (
          <div className="sorting-checkbox" key={index}>
            <div className="checkbox-title">
              {c[0].toUpperCase() + c.slice(1)}
            </div>
            <div
              className={`customCheckbox ${checkedCategories[index] ? 'checked' : ''}`}
              onClick={() => {
                toggleCategory(index);
                onToggleSorted(c);
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
