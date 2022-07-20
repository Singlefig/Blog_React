import React from "react";
import { Circles } from "react-loader-spinner";
import { Image } from "../Image";
import './ArticleSection.css';

export const ArticleSection = ({ data }: { data: { type: string, src: string, thumbnail?: string } }) => {
    switch (data.type) {
        case 'main picture': {
            return <Image path={require('../../assets/images/' + data.src)} alt="Main article" width="100%" height="100%" />
        }
        case 'picture': {
            return (
                <div className="secondary-image">
                    <Image path={require('../../assets/images/' + data.src)} alt="Secondary" width={780} height={490} />
                    <span className="image-thumbnail">{data.thumbnail}</span>
                </div>
            );
        }
        case 'text': {
            return (
                <div className="paragraph">
                    <p>
                        {data.src}
                    </p>
                </div>
            );
        }
        case 'quote': {
            return (
                <div className="note">
                    <p>
                        {data.src}
                    </p>
                </div>
            );
        }
        default: {
            return (
                <Circles
                    height="100"
                    width="100"
                    color='grey'
                    ariaLabel='loading'
                />
            );
        }
    }
};
