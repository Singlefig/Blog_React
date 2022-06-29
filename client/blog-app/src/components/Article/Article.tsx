import React from "react";
import { Image } from "../Image";
import './Article.css';

export const Article = ({ data }: { data: { mainImage: string, paragraphs: Array<{ text: string }>, secondaryImage: { image: string, thumbnail: string } } }) => {
    return (
        <div className="article-container">
            <Image path={require('../../assets/images/' + data.mainImage)} alt="Main article" width="100%" height="100%" />
            <div className="article">
                <div className="paragraph">
                    <p>
                        {data.paragraphs[0].text}
                    </p>
                </div>
                <div className="secondary-image">
                    <Image path={require('../../assets/images/' + data.secondaryImage.image)} alt="Secondary" width={780} height={490} />
                    <span className="image-thumbnail">{data.secondaryImage.thumbnail}</span>
                </div>
                <div className="paragraph">
                    <p>
                        {data.paragraphs[1].text}
                    </p>
                </div>
                <div className="note">
                    <p>
                        {data.paragraphs[2].text}
                    </p>
                </div>
                <div className="paragraph">
                    <p>
                        {data.paragraphs[3].text}
                    </p>
                </div>
            </div>
        </div>

    );
};
