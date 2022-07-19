import React from "react";

import textIcon from '../../assets/icons/article.svg';
import pictureIcon from '../../assets/icons/image.svg';
import quoteIcon from '../../assets/icons/quotes.svg';

import './CreateArticleSection.css';

export const CreateArticleSection = ({ setSelectedSection }: { setSelectedSection: any }) => {
    return (
        <div className="create-section-container">
            <div className="section-drop">
                <p>Choose a section and drop it anywhere on the page ...</p>
            </div>
            <div className="create-section-list">
                <div
                    className='create-section-list-item'
                    onClick={() => setSelectedSection('text')}
                >
                    <img src={textIcon} width={32} height={32} alt="text" />
                    <span>Text</span>
                </div>
                <div
                    className='create-section-list-item'
                    onClick={() => setSelectedSection('main picture')}
                >
                    <img src={pictureIcon} width={32} height={32} alt="picture" />
                    <span>Main Picture</span>
                </div>
                <div
                    className='create-section-list-item'
                    onClick={() => setSelectedSection('picture')}
                >
                    <img src={pictureIcon} width={32} height={32} alt="picture" />
                    <span>Picture</span>
                </div>
                <div
                    className='create-section-list-item'
                    onClick={() => setSelectedSection('quote')}
                >
                    <img src={quoteIcon} width={32} height={32} alt="quote" />
                    <span>Quote</span>
                </div>
            </div>
        </div>
    );
};
