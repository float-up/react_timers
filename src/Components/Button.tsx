import React from "react";

interface IButtonProps {
    title?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({title = "Button", onClick = () => {}}: IButtonProps) => {
    return (
        <button onClick={onClick}>{title}</button>
    )
}

export default Button;