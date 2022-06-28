import React, { useState } from "react";
import { Button } from "../Button";
import subImg from '../../assets/images/Subtract.png';
import './SubscribePanel.css';

export const SubscribePanel = () => {
    const [email, setEmail] = useState('');
    return (
        <div className="subscribe-panel-container">
            <img src={subImg} alt="sub" width={105} height={102} />
            <p className="subscribe-title">
                Subscribe to my blog.
            </p>
            <p className="subscribe-info">
                I post fresh content every week.
            </p>
            <div>
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                />
                <Button
                    fillColor="#8CEEAD"
                    textColor="#232E52"
                    text="SUBSCRIBE"
                    onClick={() => alert('Suscribed!')}
                    disabled={email.length === 0}
                    width={140}
                    height={50}
                />
            </div>
        </div>
    );
};