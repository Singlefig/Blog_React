import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { EditArticleSection } from "../../components/EditArticleSection";

import './AddNewArticlePage.css';
import { CreateArticleSection } from "../../components/CreateArticleSection";

const AddNewArticlePage = () => {
    const [articleData, setArticleData] = useState<Array<{
        type: string;
        src: string;
        thumbnail: string | undefined;
    }>>([]);
    const [selectedSection, setSelectedSection] = useState('');
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

    const pushNewSection = (type: string, src: string, thumbnail?: string) => {
        const temp = [...articleData];
        const newSectionObj = { type: type, src: src, thumbnail: thumbnail };
        temp.push(newSectionObj);
        setArticleData([...temp]);
    };

    return (
        <div className="add-new-article-page-container">
            <div className="article-container">
                {articleData.length > 0 ? articleData.map((el: { type: string, src: string, thumbnail?: string }) => <EditArticleSection key={el.type + el.src} data={el} />) : null}
                    <div className="add-section-container">
                        {selectedSection ? (
                                <EditArticleSection
                                data={{ type: selectedSection, src: '' }}
                                isEditMode
                                pushNewSection={pushNewSection}
                                setSelectedSection={setSelectedSection}
                                />
                            ) : (
                                <CreateArticleSection setSelectedSection={setSelectedSection} />
                            )
                        }
                    </div>
            </div>
        </div>

    );
};

export default connect()(AddNewArticlePage);
