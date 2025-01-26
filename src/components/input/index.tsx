import { InputHTMLAttributes } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: inputProps) {
    return (
        <input className="outline-none border-0 rounded-md mt-2 h-8 p-2" {...props}/>
    )
}