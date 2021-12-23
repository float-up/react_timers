import React, {HTMLAttributes} from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    title?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    [x: string]: any;
}

const Button = ({title = "Button", onClick = () => {}, ...otherButtonProps}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            {...otherButtonProps}
        >
            {title}
        </button>
    )
}

export default Button;