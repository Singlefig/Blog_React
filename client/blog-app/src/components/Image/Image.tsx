import React from "react";

export const Image = ({ path, alt, width, height } : { path: string, alt: string, width: string | number, height: string | number  }) => {
    return (
        <img src={path} alt={alt} width={width} height={height} />
    );
};
