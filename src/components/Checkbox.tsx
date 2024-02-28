import {useEffect, useState} from 'react';

interface CheckboxProps{
    name: string;
    checked: boolean;
}


function Checkbox ( {name, checked }:CheckboxProps)  {
const [isChecked, setIsChecked] = useState<boolean>();

useEffect(() => {
    setIsChecked(checked)
},[checked])

  return (
    <>
    <label className='radio'>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
        <span className="name">
       {name}
       </span>
      </label>
    </>
  );
}

export default Checkbox;