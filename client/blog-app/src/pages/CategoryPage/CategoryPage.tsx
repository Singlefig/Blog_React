import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { SubscribePanel } from "../../components/SubscribePanel";
import './CategoryPage.css';

export const CategoryPage = () => {
    const [articles, setArticles] = useState([]);
    const [pageTitle, setPageTitle] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const id = searchParams.get('id');
        const getArticles = async () => {
            const res = await axios.get(`http://localhost:4000/sections/${id}`);
            setArticles(res.data?.posts);
            setPageTitle(res.data?.title);
        };

        getArticles();
    }, []);

    return (
        <div className="category-page-container">
            <Section title={pageTitle} items={articles} />
            <Button
                fillColor="#EBF2FE"
                textColor="#232E52"
                text="More articles"
                disabled={false}
                onClick={() => alert('Loading!')}
                width="fit-content"
                height="fit-content"
            />
            <SubscribePanel />
        </div>
    );
};
