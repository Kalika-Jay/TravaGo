import '../styles/UserProfile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUser from '../auth/useUser.jsx'; // Adjust import path as needed
import useToken from '../auth/useToken.jsx'; // Adjust import path as needed
const interestsList = ["Sports", "Music", "Reading", "Traveling", "Cooking"];


// --- MOCK USER DATA (This acts as our temporary database) ---
const userData = {
    firstName: 'Lasen',
    lastName: 'Dulsath',
    bio: 'Travel enthusiast based in Colombo, Sri Lanka.',
    profilePhotoUrl: 'https://i.pravatar.cc/150?img=12', // A placeholder image
    email: 'ldulsath@gmail.com',
    location: 'Colombo, Sri Lanka',
    languages: [
        { name: 'English', proficiency: 'Fluent', level: 'fluent' },
        { name: 'Spanish', proficiency: 'Intermediate', level: 'intermediate' },
        { name: 'German', proficiency: 'Beginner', level: 'beginner' }
    ],
};

// --- MAIN USER PROFILE COMPONENT ---
export default function UserProfile() {
    const [user] = useState(userData);
    const user1 = useUser();
    const [token, setToken] = useToken();
    const { id, email, info } = user1;

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
                ...info,
                name,
                age,
                interests,
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
        <div className="profile-container">
            <h1>welcome!</h1>
            <h2>1. User Profile/Dashboard</h2>

            <div className="profile-section">
                <h3>Basic User Data</h3>
                <div className="user-info">
                    <img src={user.profilePhotoUrl} alt="User Photo" className="profile-photo" />
                    <div className="details">
                        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Location:</strong> {user.location}</p>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h3>Language Proficiency</h3>
                <ul className="language-list">
                    {user.languages.map(lang => (
                        <li key={lang.name}>
                            {lang.name}
                            <span className={`proficiency-level ${lang.level}`}>
                {lang.proficiency}
              </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="profile-section">
                <h3>Personalised Calendar</h3>
                {/* You can add the calendar component we discussed before right here */}
                <div className="calendar-placeholder">Your calendar will go here.</div>
            </div>
            <div className="user-profile">
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
        </div>
    );
}