import {  useNavigate } from "react-router-dom";
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

  const nav = useNavigate();
  const handleButtonClick= () => {
        nav("/newtask");
  }

  const handleHomeClick = () => {
    nav("/");
  }

  return (
    <div className="sideBar">
      <nav>
      <button onClick={handleHomeClick}><span className="home-icon material-symbols-outlined">home</span>Home</button>
        <button onClick={handleButtonClick}>+ Add Task</button>
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
