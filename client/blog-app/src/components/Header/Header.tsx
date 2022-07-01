import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import './Header.css';
import logo from '../../assets/images/logo.png';
import accountLogo from '../../assets/icons/account.svg';
import { Image } from "../Image";
import { Button } from "../Button";


const Header = () => {
    const { isLoggedIn } = useSelector((state: { isLoggedIn: boolean }) => state);
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
        <header>
            <div className="top-content-header">
                <Link to="/">
                    <Image path={logo} alt="logo" width={100} height={18} />
                </Link>
                <div className="navigation">
                    <a className="anchor" href="#design-tools">Design Tools</a>
                    <a className="anchor" href="#weekly-updates">Weekly Updates</a>
                    <a className="anchor" href="#tutorials">Tutorials</a>
                    <Link className="anchor" to="/library">Library</Link>
                </div>
                <div className="header-buttons">
                    {isLoggedIn ? (
                        <img className="account-logo" src={accountLogo} width={36} height={36} alt="account" />
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
        </header>
    );
};

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.isLoggedIn,
    };
};

export default connect()(Header);
