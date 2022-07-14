import React, { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router";
import dateIcon from '../../assets/icons/date.svg';
import moreIcon from '../../assets/icons/more-vertical.svg';
import categoryIcon from '../../assets/icons/category.svg';

import './PreviewArticle.css';

export const PreviewArticle = ({ deleteArticle, category, date, id }: { deleteArticle: MouseEventHandler<HTMLParagraphElement>, category: string, date: string, id: string }) => {
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
    const navigate = useNavigate();

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
            <div className="more-container">
                <img
                    src={moreIcon}
                    className="more-icon"
                    alt="more"
                    width={24}
                    height={24}
                    onClick={() => setIsMenuDisplayed(!isMenuDisplayed)}
                />
                {isMenuDisplayed ? (
                    <div className="more-menu">
                        <p
                        className="more-menu-item"
                        onClick={() => navigate(`/add-new-article?articleId=${id}`)}
                        >
                            Edit
                        </p>
                        <p
                            className="more-menu-item"
                            onClick={deleteArticle}
                        >
                            Delete
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
