import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from '../../assets/images/logo.png';
import { Image } from "../Image";
import { Button } from "../Button";

export const Header = () => {
    return (
        <header>
            <div className="top-content-header">
                <Image path={logo} alt="logo" width={100} height={18} />
                <div className="navigation">
                    <a className="anchor" href="#design-tools">Design Tools</a>
                    <a className="anchor" href="#weekly-updates">Weekly Updates</a>
                    <a className="anchor" href="#tutorials">Tutorials</a>
                    <Link className="anchor" to="/library">Library</Link>
                </div>
                <Button
                    fillColor="#3a4362"
                    textColor="#ffffff"
                    text="Subscribe"
                    onClick={() => alert('Suscribed!')}
                    disabled={false}
                    width="108px"
                    height="36px"
                />
            </div>
            <div className="bottom-content-header">
                <span>👋 HELLO</span>
                <h2>Insights about my personal and work life, <br />and the in-betweens</h2>
            </div>
        </header>
    );
};
