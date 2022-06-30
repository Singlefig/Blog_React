import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Article } from "../../components/Article";
import { Circles } from "react-loader-spinner";
import './ArticlePage.css';
import { Section } from "../../components/Section";
import { SubscribePanel } from "../../components/SubscribePanel";

export const ArticlePage = () => {
    const [article, setArticle] = useState<{ mainImage: string, paragraphs: Array<{ text: string }>, secondaryImage: { image: string, thumbnail: string } }>({
        mainImage: '',
        paragraphs: [
            {
                text: '',
            },
        ],
        secondaryImage: {
            image: '',
            thumbnail: '',
        },
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const [additionalSection, setAdditionalSection] = useState({
        title: '',
        posts: [],
    });

    useEffect(() => {
        const id = searchParams.get('id');
        const getArticleContent = async () => {
            const res = await axios.get(`http://localhost:4000/articles/${id}`);
            setArticle(res.data);
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
            {article.mainImage ?
                <Article data={article} /> :
                <Circles
                    height="100"
                    width="100"
                    color='grey'
                    ariaLabel='loading'
                />}
            <Section title="Other interesting posts" items={additionalSection.posts} />
            <SubscribePanel />
        </div>
    );
};
