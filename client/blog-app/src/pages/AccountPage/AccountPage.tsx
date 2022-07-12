import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Input } from "../../components/Input";

import './AccountPage.css';

const AccountPage = () => {
    const userInfo = useSelector((state: { data: Array<{ name: string, surname: string, email: string }> }) => state);
    const [firstName, setFirstName] = useState(userInfo.data[0].name);
    const [lastName, setLastName] = useState(userInfo.data[0].surname);
    const [email, setEmail] = useState(userInfo.data[0].email);

    return (
        <div className="account-page-container">
            <form>
                <fieldset>
                    <legend>Your information</legend>
                    <div className="field">
                        <label htmlFor="first-name">First Name:</label>
                        <Input
                            type="text"
                            name="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="last-name">Last Name:</label>
                        <Input
                            type="text"
                            name="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email:</label>
                        <Input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                </fieldset>
            </form>
        </div>
    );
};

export default connect()(AccountPage);