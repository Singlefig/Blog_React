import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { getToast } from "../../utils/toast";

import './MyArticlesPage.css';
import { Button } from "../../components/Button";
import { PreviewArticle } from "../../components/PreviewArticle";

const MyArticlesPage = () => {
    const [articles, setArticles] = useState<Array<{ id: string, userId: string, category: string, date: string }>>([]);
    const userInfo = useSelector((state: { data: any }) => state);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userInfo && !userInfo.data.isLoggedIn) {
            navigate('/login');
        } else {
            const getArticlesByUserId = async () => {
                const res = await axios.get(`http://localhost:4000/articles/?userId=${userInfo.data[0].id}`);
                setArticles(res.data);
            };
    
            getArticlesByUserId();
        }
    }, []);

    const deleteArticle = async (articleId: string | number) => {
        const res = await axios.delete(`http://localhost:4000/articles/${articleId}`);
        if (res.status === 200) {
            const articlesRes = await axios.get(`http://localhost:4000/articles/?userId=${userInfo.data[0].id}`);
            setArticles(articlesRes.data);
            getToast('success', 'Deleted!');
        }
    };

    return (
        <div className="my-articles-page-container">
            <div className="content">
                <div className="content-info">
                    <p className="content-title">Your Articles</p>
                </div>
                <div className="articles">
                    {articles.map((el) => <PreviewArticle deleteArticle={() => deleteArticle(el.id)} key={el.id} id={el.id} category={el.category} date={el.date} />)}
                </div>
                <div className="add-article-container">
                        <Button
                            fillColor="#232E52"
                            textColor="#ffffff"
                            text="Add Article"
                            onClick={() => navigate('/add-new-article')}
                            width="302px"
                            height="60px"
                        />
                    </div>
            </div>


        </div>
    );
};

export default connect()(MyArticlesPage);