import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUser from '../auth/useUser.jsx'; // Adjust import path as needed
import useToken from '../auth/useToken.jsx'; // Adjust import path as needed
const interestsList = ["Sports", "Music", "Reading", "Traveling", "Cooking"];
const UserProfile = () => {
    const user = useUser();
    const [token, setToken] = useToken();
    const { id, email, info } = user;

    const navigate = useNavigate();

    const [name, setname] = useState(info.name || '');
    const [age, setage] = useState(info.age || '');
    const [interests, setinterests] = useState(info.interests || []);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const handleCheckboxChange = (interest) => {
        if (interests.includes(interest)) {
            setinterests(interests.filter(i => i !== interest));
        } else {
            setinterests([...interests, interest]);
        }
    };

    const saveChanges = async () => {
        console.log({ name, age, interests });
        try {
            const response = await axios.put(`/api/users/${id}`, {
                name,
                age,
                interests
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    };

    const resetValues = () => {
        setname(info.name);
        setage(info.age);
        setinterests(info.interests || []);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <p>Email: {email}</p>

            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
            />

            <label>Age:</label>
            <input
                type="number"
                value={age}
                onChange={(e) => setage(e.target.value)}
            />
            <label>Interests:</label>
            {interestsList.map((interest) => (
                <div key={interest}>
                    <input
                        type="checkbox"
                        checked={interests.includes(interest)}
                        onChange={() => handleCheckboxChange(interest)}
                    />
                    {interest}
                </div>
            ))}

            <div>
                <button onClick={saveChanges}>Save Changes</button>
                <button onClick={resetValues}>Reset</button>
                <button onClick={logout}>Logout</button>
            </div>

            {showSuccessMessage && <p className="success-message">Profile updated successfully!</p>}
            {showErrorMessage && <p className="error-message">Error updating profile. Please try again.</p>}
        </div>
    );
};

export default UserProfile;
