import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import axios from "axios";

import './MyArticlesPage.css';
import { Button } from "../../components/Button";
import { PreviewArticle } from "../../components/PreviewArticle";

const MyArticlesPage = () => {
    const [articles, setArticles] = useState<Array<{ id: string, userId: string, category: string, date: string }>>([]);
    const userInfo = useSelector((state: { data: Array<{ id: string | number }> }) => state);
    useEffect(() => {
        const getArticlesByUserId = async () => {
            const res = await axios.get(`http://localhost:4000/articles/?userId=${userInfo.data[0].id}`);
            setArticles(res.data);
        };

        getArticlesByUserId();
    }, []);

    return (
        <div className="my-articles-page-container">
            <div className="content">
                <div className="content-info">
                    <p className="content-title">Your Articles</p>
                    <div className="add-article-container">
                        <Button
                            fillColor="#3a4362"
                            textColor="#ffffff"
                            text="Add Article"
                            onClick={() => alert('TBD')}
                            width="140px"
                            height="40px"
                        />
                    </div>
                </div>
                <div className="articles">
                    {articles.map((el) => <PreviewArticle key={el.id} category={el.category} date={el.date} />)}
                </div>
            </div>


        </div>
    );
};

export default connect()(MyArticlesPage);