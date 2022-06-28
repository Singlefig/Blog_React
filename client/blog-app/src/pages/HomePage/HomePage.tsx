import React, { useEffect, useState } from "react";
import { Section } from "../../components/Section";
import { SubscribePanel } from "../../components/SubscribePanel";
import axios from "axios";
import './HomePage.css';

export const HomePage = () => {
    const [sections, setSections] = useState<Array<{ title: string, posts: Array<{ category: string, date: string, title: string, description: string, image: string }>, id: string}>>([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get('http://localhost:4000/sections');
            setSections(res.data);
        };

        getPosts();
    }, []);

    return (
        <div className="home-page-container">
            {sections.map(el => <Section key={el.title} title={el.title} items={el.posts} id={el.id} />)}
            <SubscribePanel />
        </div>
    );
};
