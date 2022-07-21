import React, { useState, useRef } from "react";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { Image } from "../Image";

import './EditArticleSection.css';

import pictureIcon from '../../assets/icons/image.svg';
import trashIcon from '../../assets/icons/trash-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';

export const EditArticleSection = ({ data, isEditMode, pushNewSection, setSelectedSection, deleteArticleSection, updateArticleSection }: { data: { type: string, src: string, thumbnail?: string, contentId: string }, isEditMode?: boolean, pushNewSection?: Function, setSelectedSection?: any, deleteArticleSection?: any, index?: number, updateArticleSection?: any }) => {

    const [quote, setQuote] = useState(data.src ? data.src : '');
    const [text, setText] = useState(data.src ? data.src : '');
    const [isEditInputDisplayed, setIsEditInputDisplayed] = useState(false);
    const inputSecondaryImageUploadRef = useRef<any>();
    const inputMainImageUploadRef = useRef<any>();
    const [image, setImage] = useState<any>(null);
    const [secondaryImage, setSecondaryImage] = useState<{
        imageName: string,
        thumbnail: string,
    }>({
        imageName: '',
        thumbnail: '',
    });
    const [isEditIconsDisplayed, setIsEditIconsDisplayed] = useState(false);

    const handleOnKeyPressSecondaryImage = (e: any, src: { imageName: string, thumbnail: string }) => {
        if (e.key === 'Enter' && pushNewSection) {
            if (!src.imageName && !src.thumbnail) {
                toast.warning('Please enter your thumbnail and upload an image!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                pushNewSection(data.type, src.imageName, src.thumbnail);
                setImage(null)
                toast.success('New section added!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else if (e.key === 'Escape' && setSelectedSection) {
            setSelectedSection('');
        }
    };


    const handleOnKeyPressImage = (e: any, src: File) => {
        if (e.key === 'Enter' && pushNewSection) {
            if (!src) {
                toast.warning('Please enter your text or upload an image!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                pushNewSection(data.type, src.name);
                setImage(null)
                toast.success('New section added!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else if (e.key === 'Escape' && setSelectedSection) {
            setSelectedSection('');
        }
    };

    const handleOnKeyPress = (e: any, src: string) => {
        if (e.key === 'Enter' && pushNewSection) {
            if (src.length === 0) {
                toast.warning('Please enter your text or upload an image!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                pushNewSection(data.type, src);
                setQuote('');
                setText('');
                toast.success('New section added!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else if (e.key === 'Escape' && setSelectedSection) {
            setSelectedSection('');
        }
    };

    const editTextSection = (e: any, src: string) => {
        if (e.key === 'Enter') {
            if (src.length === 0) {
                toast.warning('Please enter your text!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                updateArticleSection(data.contentId, src);
                setIsEditInputDisplayed(false);
                toast.success('Section updated!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else if (e.key === 'Escape') {
            setIsEditInputDisplayed(false);
        }
    };

    switch (data.type) {
        case 'main picture': {
            let component = null;
            isEditMode ? (
                component =
                <div className="add-secondary-image-container">
                    <div className="upload-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputMainImageUploadRef}
                            onChange={(e) => {
                                if (e.target.files) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                            onKeyDown={(e) => handleOnKeyPressImage(e, image)}
                        />
                    </div>
                    <div className="image-info">
                        <img
                            alt="upload"
                            src={pictureIcon}
                            onClick={() => {
                                inputMainImageUploadRef.current.click();
                            }}
                        />
                        <span>{image && image.name}</span>
                    </div>
                    <div className="buttons">
                        <Button
                            fillColor="#4ff06d"
                            textColor="#ffffff"
                            text="Create"
                            onClick={() => handleOnKeyPressImage({ key: 'Enter' }, image)}
                            width="108px"
                            height="36px"
                        />
                        <Button
                            fillColor="#d1194d"
                            textColor="#ffffff"
                            text="Cancel"
                            onClick={() => handleOnKeyPressImage({ key: 'Escape' }, image)}
                            width="108px"
                            height="36px"
                        />
                    </div>
                </div>
            ) : (
                component = (
                    <div
                        className="edit-section-hidden-icons-container-large"
                        onMouseOver={() => setIsEditIconsDisplayed(true)}
                        onMouseOut={() => setIsEditIconsDisplayed(false)}
                    >
                        <Image path={require('../../assets/images/' + data.src)} alt="Main article" width="100%" height="100%" />
                        <img
                            style={{ display: isEditIconsDisplayed ? 'block' : 'none' }}
                            className="icon trash-icon"
                            src={trashIcon}
                            width={32}
                            height={32}
                            alt="trash"
                            onClick={() => deleteArticleSection(data.contentId)}
                        />
                    </div>
                )
            )
            return component;
        }
        case 'picture': {
            let component = null;
            isEditMode ? (
                component =
                <div className="add-secondary-image-container">
                    <div className="upload-wrapper">
                        <input
                            ref={inputSecondaryImageUploadRef}
                            id="secondary-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setSecondaryImage({ ...secondaryImage, imageName: e.target.files[0].name });
                                }
                            }}
                            onKeyDown={(e) => handleOnKeyPressSecondaryImage(e, secondaryImage)}
                        />
                    </div>
                    <div className="image-info">
                        <img
                            alt="upload"
                            src={pictureIcon}
                            onClick={() => {
                                inputSecondaryImageUploadRef.current.click();
                            }}
                        />
                        <span>{secondaryImage.imageName}</span>
                    </div>
                    <input
                        value={secondaryImage.thumbnail}
                        type="text"
                        className="secondary-image-thumbnail-input"
                        placeholder="Enter your image thumbnail"
                        onChange={(e) => setSecondaryImage({ ...secondaryImage, thumbnail: e.target.value })}
                    />
                    <div className="buttons">
                        <Button
                            fillColor="#4ff06d"
                            textColor="#ffffff"
                            text="Create"
                            onClick={() => handleOnKeyPressSecondaryImage({ key: 'Enter' }, secondaryImage)}
                            width="108px"
                            height="36px"
                        />
                        <Button
                            fillColor="#d1194d"
                            textColor="#ffffff"
                            text="Cancel"
                            onClick={() => handleOnKeyPressSecondaryImage({ key: 'Escape' }, secondaryImage)}
                            width="108px"
                            height="36px"
                        />
                    </div>
                </div>
            ) : (
                component = (
                    <div
                        className="edit-section-hidden-icons-container"
                        onMouseOver={() => setIsEditIconsDisplayed(true)}
                        onMouseOut={() => setIsEditIconsDisplayed(false)}
                    >
                        <div className="secondary-image">
                            <Image path={require('../../assets/images/' + data.src)} alt="Secondary" width={780} height={490} />
                            <span className="image-thumbnail">{data.thumbnail}</span>
                        </div>
                        <img
                            style={{ display: isEditIconsDisplayed ? 'block' : 'none' }}
                            className="icon trash-icon"
                            src={trashIcon}
                            width={32}
                            height={32}
                            alt="trash"
                            onClick={() => deleteArticleSection(data.contentId)}
                        />
                    </div>
                )
            )

            return component;
        }
        case 'text': {
            return (
                <div className="paragraph">
                    {isEditMode ? (
                        <div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => handleOnKeyPress(e, text)}
                                placeholder="Enter your text here ..."
                            />
                            <div className="buttons">
                                <Button
                                    fillColor="#4ff06d"
                                    textColor="#ffffff"
                                    text="Create"
                                    onClick={() => handleOnKeyPress({ key: 'Enter' }, text)}
                                    width="108px"
                                    height="36px"
                                />
                                <Button
                                    fillColor="#d1194d"
                                    textColor="#ffffff"
                                    text="Cancel"
                                    onClick={() => handleOnKeyPress({ key: 'Escape' }, text)}
                                    width="108px"
                                    height="36px"
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="edit-section-hidden-icons-container-text"
                            onMouseOver={() => setIsEditIconsDisplayed(true)}
                            onMouseOut={() => setIsEditIconsDisplayed(false)}
                        >
                            {isEditInputDisplayed ? (
                                <div className="edit-input-section">
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyDown={(e) => handleOnKeyPress(e, text)}
                                    />
                                    <div className="buttons">
                                        <Button
                                            fillColor="#4ff06d"
                                            textColor="#ffffff"
                                            text="Update"
                                            onClick={() => editTextSection({ key: 'Enter' }, text)}
                                            width="108px"
                                            height="36px"
                                        />
                                        <Button
                                            fillColor="#d1194d"
                                            textColor="#ffffff"
                                            text="Cancel"
                                            onClick={() => editTextSection({ key: 'Escape' }, text)}
                                            width="108px"
                                            height="36px"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p>
                                    {data.src}
                                </p>
                            )}
                            <img
                                style={{ display: isEditIconsDisplayed ? 'block' : 'none' }}
                                className="icon trash-icon"
                                src={trashIcon}
                                width={32}
                                height={32}
                                alt="trash"
                                onClick={() => deleteArticleSection(data.contentId)}
                            />
                            <img
                                style={{ display: isEditIconsDisplayed ? 'block' : 'none' }}
                                className="icon edit-icon"
                                src={editIcon}
                                width={32}
                                height={32}
                                alt="edit"
                                onClick={() => setIsEditInputDisplayed(true)}
                            />
                        </div>
                    )}
                </div>
            );
        }
        case 'quote': {
            return (
                <div className="note">
                    {isEditMode ? (
                        <div>
                            <textarea
                                value={quote}
                                onChange={(e) => setQuote(e.target.value)}
                                className="note-input"
                                onKeyDown={(e) => handleOnKeyPress(e, quote)}
                            />
                            <div className="buttons">
                                <Button
                                    fillColor="#4ff06d"
                                    textColor="#ffffff"
                                    text="Create"
                                    onClick={() => handleOnKeyPress({ key: 'Enter' }, quote)}
                                    width="108px"
                                    height="36px"
                                />
                                <Button
                                    fillColor="#d1194d"
                                    textColor="#ffffff"
                                    text="Cancel"
                                    onClick={() => handleOnKeyPress({ key: 'Escape' }, quote)}
                                    width="108px"
                                    height="36px"
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="edit-section-hidden-icons-container"
                            onMouseOver={() => setIsEditIconsDisplayed(true)}
                            onMouseOut={() => setIsEditIconsDisplayed(false)}
                        >
                            {isEditInputDisplayed ? (
                                <div className="edit-input-section">
                                    <textarea
                                        value={quote}
                                        onChange={(e) => setQuote(e.target.value)}
                                        className="note-input"
                                        onKeyDown={(e) => handleOnKeyPress(e, quote)}
                                    />
                                    <div className="buttons">
                                        <Button
                                            fillColor="#4ff06d"
                                            textColor="#ffffff"
                                            text="Update"
                                            onClick={() => editTextSection({ key: 'Enter' }, quote)}
                                            width="108px"
                                            height="36px"
                                        />
                                        <Button
                                            fillColor="#d1194d"
                                            textColor="#ffffff"
                                            text="Cancel"
                                            onClick={() => editTextSection({ key: 'Escape' }, quote)}
                                            width="108px"
                                            height="36px"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p>
                                    {data.src}
                                </p>
                            )}
                            <img
                                style={{ display: isEditIconsDisplayed ? 'block' : 'none' }}
                                className="icon trash-icon"
                                src={trashIcon}
                                width={32}
                                height={32}
                                alt="trash"
                                onClick={() => deleteArticleSection(data.contentId)}
                            />
                            <img
                                style={{ display: isEditIconsDisplayed ? 'block' : 'none' }}
                                className="icon edit-icon"
                                src={editIcon}
                                width={32}
                                height={32}
                                alt="edit"
                                onClick={() => setIsEditInputDisplayed(true)}
                            />
                        </div>
                    )}
                </div>
            );
        }
        default: {
            return (
                <Circles
                    height="100"
                    width="100"
                    color='grey'
                    ariaLabel='loading'
                />
            );
        }
    }
};
