import React, {HTMLAttributes} from "react";

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement>  {
    className: string;
    data: string;
    [x: string]: any
}

const Textarea = ({className, data, ...otherTextAreaProps}: TextareaProps) => {
    return (
        <textarea
            className={className}
            value={data}
            {...otherTextAreaProps}
        />
    )
}

export default Textarea;