import React from "react";
import { Link } from "react-router-dom";
import { Image } from "../Image";
import './Section.css';

export const Section = ({ title, items, id, headerDisplay }: { title: string, items: Array<{ category: string, date: string, title: string, description: string, image: string, id: string}>, id?: string, headerDisplay?: { name: string, label: string } }) => {
    return (
        <section id={id} className="section">
            <Link className="hover-link" to={`/category?id=${id}`}>
                <p className="section-title">{title}</p>
            </Link>
            <div className="divider" />
            {items.length > 0 ? items.map((el, index) => {
                return (
                    <div key={el.title + index} className="section-item">
                        <div className="section-content">
                            <div className="section-item-info">
                                <div className="section-item-upper-info">
                                    <p className="section-item-category">{el.category}</p>
                                    <p className="section-item-date">{el.date}</p>
                                </div>
                                <Link className="hover-article-title-link" to={`/article?id=${el.id}`}>
                                    <p className="section-item-title">{el.title}</p>
                                </Link>
                                <p className="section-item-description">{el.description}</p>
                            </div>
                            <div className="section-item-image">
                                <Image path={require('../../assets/images/' + el.image)} alt="article" width={300} height={210} />
                            </div>
                        </div>
                        <div className="divider" />
                    </div>
                );
            }) : <div>No data to display...</div>}
        </section>
    );
};
