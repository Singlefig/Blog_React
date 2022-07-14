import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ArticleSection } from "../../components/ArticleSection";
import { Circles } from "react-loader-spinner";
import './ArticlePage.css';
import { Section } from "../../components/Section";
import { SubscribePanel } from "../../components/SubscribePanel";

export const ArticlePage = () => {
    const [articleContent, setArticleContent] = useState<Array<{ type: string, src: string, thumbnail?: string }>>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [additionalSection, setAdditionalSection] = useState({
        title: '',
        posts: [],
    });

    useEffect(() => {
        const id = searchParams.get('id');
        const getArticleContent = async () => {
            const res = await axios.get(`http://localhost:4000/articles/${id}`);
            setArticleContent(res.data.content);
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
            <div className="article-container">
                {articleContent.map((el: { type: string, src: string, thumbnail?: string }) => <ArticleSection data={el} />)}
            </div>
            <Section title="Other interesting posts" items={additionalSection.posts} />
            <SubscribePanel />
        </div>
    );
};
