import React, { ChangeEventHandler } from "react";
import './Input.css';

export const Input = (props: { type: string, placeholder?: string, value: any, onChange: ChangeEventHandler<HTMLInputElement>, isRequired?: boolean, min?: number | string, name?: string }) => {
    const { type, placeholder, value, onChange, isRequired, min, name } = props;

    return (
        <input
            className="input"
            type={type}
            placeholder={placeholder}
            required={isRequired}
            value={value}
            onChange={onChange}
            min={min}
            name={name}
        />
    );
};
