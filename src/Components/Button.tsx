import React, {HTMLAttributes} from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    title?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({title = "Button", onClick = () => {}}: ButtonProps) => {
    return (
        <button onClick={onClick}>{title}</button>
    )
}

export default Button;