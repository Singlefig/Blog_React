import React from "react";
import './Button.css';

type ButtonProps = {
    fillColor: string,
    textColor: string,
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    disabled: boolean,
    width: number | string,
    height: number | string,
}

export const Button = (props: ButtonProps) => {

    const {
        fillColor,
        textColor,
        text,
        onClick,
        disabled,
        width,
        height,
    }: ButtonProps = props;

    return (
        <button
            style={{
                'backgroundColor': fillColor,
                'color': textColor,
                'width': width,
                'height': height,
                'cursor': disabled ? 'not-allowed' : 'pointer'
            }}
            className="btn"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};
