import React, { FormEvent, useState } from "react";
import { connect, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import axios from "axios";
import { Input } from "../../components/Input";

import './AccountPage.css';

const AccountPage = () => {
    const userInfo = useSelector((state: { data: Array<{ name: string, surname: string, email: string, id: string | number }> }) => state);
    const [firstName, setFirstName] = useState(userInfo.data[0].name);
    const [lastName, setLastName] = useState(userInfo.data[0].surname);
    const [email, setEmail] = useState(userInfo.data[0].email);

    const saveNewInfo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await axios.patch(`http://localhost:4000/profiles/${userInfo.data[0].id}`, {
            name: firstName,
            surname: lastName,
            email: email,
        });
        if (result.status === 200) {
            toast.success('Updated!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            toast.error('Something went wrong! Please, try again', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="account-page-container">
            <form onSubmit={saveNewInfo}>
                <fieldset>
                    <legend>Your information</legend>
                    <div className="field">
                        <label htmlFor="first-name">First Name:</label>
                        <Input
                            type="text"
                            name="first-name"
                            value={firstName}
                            isRequired
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="last-name">Last Name:</label>
                        <Input
                            type="text"
                            name="last-name"
                            value={lastName}
                            isRequired
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email:</label>
                        <Input
                            type="text"
                            name="email"
                            value={email}
                            isRequired
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