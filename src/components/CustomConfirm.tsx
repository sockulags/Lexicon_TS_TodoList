interface CustomConfirmProps {
    confirmation: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function CustomConfirm({ confirmation, message, onConfirm, onCancel }:CustomConfirmProps) {

    return (
        <div>
        <div className="custom-confirm">
            <h2>Delete Task</h2>
            <p>{confirmation}</p>
            <p>{message}</p>
            <div className="buttons">
            <button className="delete" onClick={() => onConfirm()}>Delete</button>
            <button onClick={() => onCancel()}>Cancel</button>
            </div>
        </div>
        <div className="background-blur"></div>
        </div>
    );
}
