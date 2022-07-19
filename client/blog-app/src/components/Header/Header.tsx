import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import './Header.css';
import logo from '../../assets/images/logo.png';
import { Image } from "../Image";
import { Button } from "../Button";
import { UserInfo } from "../LoginInfo/UserInfo";


const Header = () => {
    const { data: { isLoggedIn } } = useSelector((state: { data: { isLoggedIn: boolean } }) => state);
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [headerTitle, setHeaderTitle] = useState('👋 HELLO');
    const [headerDate, setHeaderDate] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const handleOnSubscribeButtonClick = () => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
    const handleOnLoginButtonClick = () => document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        const id = searchParams.get('id');

        const getCategoryHeaderTitle = async () => {
            const res = await axios.get(`http://localhost:4000/sections/${id}`);
            setHeaderTitle(res.data.headerDisplay.label);
        };

        const getArticleHeaderTitle = async () => {
            const res = await axios.get(`http://localhost:4000/articles/${id}`);
            setHeaderTitle(res.data.category);
            setHeaderDate(res.data.date);
        };

        if (location.pathname.includes('category')) {
            getCategoryHeaderTitle();
        } else if (location.pathname.includes('article')) {
            getArticleHeaderTitle();
        } else {
            setHeaderTitle('👋 HELLO');
            setHeaderDate('');
        }
    }, [searchParams, location.pathname, headerDate]);

    const handleOnArrowBackClick = () => {
        setHeaderDate('');
        navigate(-1);
    };


    return (
        <header className={`${location.pathname.includes('my') || location.pathname.includes('add') ? 'minimal-header' : ''}`}>
            <div className="top-content-header">
                <Link to="/">
                    <Image path={logo} alt="logo" width={100} height={18} />
                </Link>
                <div className="navigation">
                    <a className="anchor" href="#1">Design Tools</a>
                    <a className="anchor" href="#2">Weekly Updates</a>
                    <a className="anchor" href="#3">Tutorials</a>
                    <Link className="anchor" to="/library">Library</Link>
                </div>
                <div className="header-buttons">
                    {isLoggedIn ? (
                       <UserInfo isOriginalHeader={location.pathname.includes('my') || location.pathname.includes('add')} />
                    ) : (
                        <Link to='/login'>
                            <Button
                                fillColor="#3a4362"
                                textColor="#ffffff"
                                text="Login"
                                onClick={handleOnLoginButtonClick}
                                width="108px"
                                height="36px"
                            />
                        </Link>
                    )}
                    <Button
                        fillColor="#3a4362"
                        textColor="#ffffff"
                        text="Subscribe"
                        onClick={handleOnSubscribeButtonClick}
                        disabled={false}
                        width="108px"
                        height="36px"
                    />
                </div>
            </div>
            {!location.pathname.includes('my') && !location.pathname.includes('add') ? (
                <div className="bottom-content-header">
                    {location.pathname.includes('article') ? (
                        <div className="controls">
                            <div className="arrow-back" onClick={handleOnArrowBackClick}>
                                <img src={require("../../assets/images/arrow-back.png")} alt="arrow back" width={24} height={24} />
                            </div>
                            <div className="header-title">
                                <span className="article-category">{headerTitle}</span>
                                <span className="article-date">
                                    <span className="article-date-text">
                                        {headerDate}
                                    </span>
                                </span>
                            </div>
                        </div>

                    ) : <span className="category-title">{headerTitle}</span>}
                    <h2>Insights about my personal and work life, <br />and the in-betweens</h2>
                </div>
            ) : null}
        </header>
    );
};

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.isLoggedIn,
    };
};

export default connect(mapStateToProps)(Header);
