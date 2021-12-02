import React, {HTMLAttributes} from "react";

interface ITextareaProps extends HTMLAttributes<HTMLTextAreaElement>  {
    data: string;
    [x: string]: any
}

const Textarea = ({className, data, rows, readOnly}: ITextareaProps) => {
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