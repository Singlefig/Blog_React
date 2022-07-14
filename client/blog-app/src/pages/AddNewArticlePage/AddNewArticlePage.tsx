import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { EditArticleSection } from "../../components/EditArticleSection";

import './AddNewArticlePage.css';

const AddNewArticlePage = () => {
    const [articleData, setArticleData] = useState([]);
    const userInfo = useSelector((state: { data: any }) => state);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (userInfo && !userInfo.data.isLoggedIn) {
            navigate('/login');
        } else {
            const articleId = searchParams.get('articleId');
            if (articleId) {
                const getArticleContent = async () => {
                    const res = await axios.get(`http://localhost:4000/articles/${articleId}`);
                    setArticleData(res.data.content);
                };

                getArticleContent();
            }
        }
    }, []);

    return (
        <div className="add-new-article-page-container">
            <div className="article-container">
                {articleData ? articleData.map((el: { type: string, src: string, thumbnail?: string }) => <EditArticleSection data={el} />) : null}
            </div>
        </div>
        
    );
};

export default connect()(AddNewArticlePage);
