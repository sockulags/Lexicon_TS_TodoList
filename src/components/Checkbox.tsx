import  { useEffect, useState } from 'react';

interface CheckboxProps {
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function Checkbox({ name, checked, onChange }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleCheckboxChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange(newChecked);
    };

    return (
        <label className='radio'>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span className="name">{name}</span>
        </label>
    );
}

export default Checkbox;