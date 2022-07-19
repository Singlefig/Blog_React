import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { uniqueId } from 'lodash';
import { EditArticleSection } from "../../components/EditArticleSection";
import { Input } from "../../components/Input";
import { reorder } from "../../utils/reorder";

import './AddNewArticlePage.css';
import { CreateArticleSection } from "../../components/CreateArticleSection";
import { Button } from "../../components/Button";

const AddNewArticlePage = () => {
    const [articleData, setArticleData] = useState<Array<{
        contentId: string | number,
        type: string;
        src: string;
        thumbnail: string | undefined;
    }>>([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [articleCategory, setArticleCategory] = useState('');
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
        const newSectionObj = { type: type, src: src, thumbnail: thumbnail, contentId: uniqueId() };
        temp.push(newSectionObj);
        setArticleData([...temp]);
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            articleData,
            result.source.index,
            result.destination.index
        );

        setArticleData([...items]);
    };

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "white",
        borderRadius: 10,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    });

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        userSelect: "none",
        padding: 8 * 2,
        margin: `0 0 ${8}px 0`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDragging ? "#b2d6bc" : "white",
        ...draggableStyle
    });

    return (
        <div className="add-new-article-page-container">
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className="article-container">
                    <div className="article-category-container">
                        <label htmlFor="category">Article category</label>
                        <Input
                            type="text"
                            placeholder="Enter a category"
                            value={articleCategory}
                            onChange={(e) => setArticleCategory(e.target.value)}
                            name="category"
                        />
                        <Button
                            fillColor="#3a4362"
                            textColor="#ffffff"
                            text="Add"
                            onClick={() => console.log(articleCategory)}
                            width="108px"
                            height="60px"
                        />
                    </div>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {articleData.length > 0 ? articleData.map((el: { contentId: string | number, type: string, src: string, thumbnail?: string }, index) => (
                                    <Draggable key={el.contentId} draggableId={el.src} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <EditArticleSection key={el.type + el.src} data={el} />
                                            </div>
                                        )}
                                    </Draggable>
                                )) : null}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
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
            </DragDropContext>
        </div>

    );
};

export default connect()(AddNewArticlePage);
