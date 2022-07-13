import React from "react";
import dateIcon from '../../assets/icons/date.svg';
import moreIcon from '../../assets/icons/more-vertical.svg';
import categoryIcon from '../../assets/icons/category.svg';

import './PreviewArticle.css';

export const PreviewArticle = ({ category, date }: { category: string, date: string }) => {
    return (
        <div className="preview-article-container">
            <div className="article-info">
                <div className="date-info">
                    <img src={dateIcon} alt="date" width={24} height={24} />
                    <span>{date}</span>
                </div>
                <div className="category-info">
                    <img src={categoryIcon} alt="category" width={24} height={24} />
                    <span>{category}</span>
                </div>
            </div>
                <img src={moreIcon} className="more-icon" alt="more" width={24} height={24} />
        </div>
    );
};
