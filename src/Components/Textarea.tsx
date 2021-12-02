import React, {HTMLAttributes} from "react";

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement>  {
    data: string;
    [x: string]: any
}

const Textarea = ({className, data, rows, readOnly}: TextareaProps) => {
    return (
            <textarea
                className={className}
                readOnly={readOnly}
                value={data}
                rows={rows}
            />
    )
}

export default Textarea;