import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { ArticleSection } from "../../components/ArticleSection";
import { Section } from "../../components/Section";
import { SubscribePanel } from "../../components/SubscribePanel";

import './ArticlePage.css';
import { Button } from "../../components/Button";

const ArticlePage = () => {
    const [articleContent, setArticleContent] = useState<Array<{ type: string, src: string, thumbnail?: string }>>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [articleUserId, setArticleUserId] = useState('');
    const userInfo = useSelector((state: { data: any }) => state);
    const navigate = useNavigate();
    const [additionalSection, setAdditionalSection] = useState({
        title: '',
        posts: [],
    });

    useEffect(() => {
        const id = searchParams.get('id');
        const getArticleContent = async () => {
            const res = await axios.get(`http://localhost:4000/articles/${id}`);
            setArticleContent(res.data.content);
            setArticleUserId(res.data.userId);
        };

        const getAdditionalSection = async () => {
            const res = await axios.get('http://localhost:4000/sections/2');
            setAdditionalSection(res.data);
        };

        getArticleContent();
        getAdditionalSection();
    }, []);

    return (
        <div className="article-page-container">
            {userInfo.data[0].id === articleUserId ? (
                <div className="move-to-edit-article-section">
                    <p>You are owner of current article. If you want to edit this article click on "Edit" button. This message shows only to you</p>
                    <Button
                        fillColor="#3a4362"
                        textColor="#ffffff"
                        text="Edit"
                        onClick={() => navigate(`/add-new-article?articleId=${searchParams.get('id')}`)}
                        width="108px"
                        height="60px"
                    />
                </div>
            ) : null}
            <div className="article-container">
                {articleContent.map((el: { type: string, src: string, thumbnail?: string }) => <ArticleSection data={el} />)}
            </div>
            <Section title="Other interesting posts" items={additionalSection.posts} />
            <SubscribePanel />
        </div>
    );
};

export default connect()(ArticlePage);