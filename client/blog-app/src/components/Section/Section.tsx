import React from "react";
import { Image } from "../Image";
import './Section.css';

export const Section = ({ title, items, id }: { title: string, items: Array<{ category: string, date: string, title: string, description: string, image: string}>, id: string }) => {
    return (
        <section id={id} className="section">
            <p className="section-title">{title}</p>
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
                                <p className="section-item-title">{el.title}</p>
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
