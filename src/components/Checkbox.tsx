import React from 'react';

interface CheckboxProps{
    name: string;
    checked: boolean;
}


function Checkbox ( {name, checked }:CheckboxProps)  {
  return (
    <>
    <label>
        <input type="checkbox" />
        <div className="icon-box">
       {name}
       </div>
      </label>
    </>
  );
}

export default Checkbox;