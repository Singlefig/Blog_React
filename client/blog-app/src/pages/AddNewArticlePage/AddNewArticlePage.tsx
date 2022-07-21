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
import { toast } from "react-toastify";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const AddNewArticlePage = () => {
    const [articleData, setArticleData] = useState<Array<{
        contentId: string,
        type: string;
        src: string;
        thumbnail: string | undefined;
    }>>([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [articleCategory, setArticleCategory] = useState('');
    const [articleDate, setArticleDate] = useState('');
    const userInfo = useSelector((state: { data: any }) => state);
    const navigate = useNavigate();
    // eslint-disable-next-line
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
                    setArticleCategory(res.data.category);
                    setArticleDate(res.data.date);
                };

                getArticleContent();
            }
        }
        // eslint-disable-next-line
    }, []);

    const pushNewSection = (type: string, src: string, thumbnail?: string) => {
        const temp = [...articleData];
        const newSectionObj = { type: type, src: src, thumbnail: thumbnail, contentId: uniqueId() };
        temp.push(newSectionObj);
        setArticleData([...temp]);
    };

    const deleteArticleSection = (id: number) => {
        const newArtilcesData = articleData.filter((el: any) => el.contentId !== id);
        if (newArtilcesData.length !== articleData.length) {
            toast.success('Section deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        setArticleData([...newArtilcesData]);
    };

    const updateArticleSection = (id: number, newValue: string) => {
        const found = articleData.filter((el: { contentId: number | string, src: string }) => el.contentId === id);
        if (found) {
            found[0].src = newValue;
        }
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

    const saveArticle = async () => {
        const month = new Date().getMonth();
        const day = new Date().getDay();
        const year = new Date().getFullYear();
        const date = `${monthNames[month]} ${day}, ${year}`;
        const newArticleObject = {
            userId: userInfo.data[0].id,
            category: articleCategory,
            date: date,
            content: articleData,
        };

        const res = await axios.post('http://localhost:4000/articles', newArticleObject);
        if (res.status === 201) {
            toast.success('Success!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const updateArticle = async () => {
        const articleId = searchParams.get('articleId');
        const newArticleObject = {
            userId: userInfo.data[0].id,
            category: articleCategory,
            date: articleDate,
            content: articleData,
        };

        const res = await axios.patch(`http://localhost:4000/articles/${articleId}`, newArticleObject);
        if (res.status === 200) {
            toast.success('Success!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
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
                            onClick={() => toast.success('Category added!', {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            })}
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
                                {articleData.length > 0 ? articleData.map((el: { contentId: string, type: string, src: string, thumbnail?: string }, index) => (
                                    <Draggable key={el.contentId} draggableId={el.contentId} index={index}>
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
                                                <EditArticleSection
                                                    index={index}
                                                    key={el.type + el.src}
                                                    data={el}
                                                    deleteArticleSection={deleteArticleSection}
                                                    updateArticleSection={updateArticleSection}
                                                />
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
                                data={{ type: selectedSection, src: '', contentId: uniqueId() }}
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
            {articleData.length > 0 ? (
                <div className="save-article">
                    <Button
                        fillColor="#3a4362"
                        textColor="#ffffff"
                        text={searchParams.get('articleId') ? "Update" : "Create"}
                        onClick={searchParams.get('articleId') ? updateArticle : saveArticle}
                        disabled={articleData.length === 0 || articleCategory.length === 0}
                        width="140px"
                        height="60px"
                    />
                </div>
            ) : null}
        </div>

    );
};

export default connect()(AddNewArticlePage);
