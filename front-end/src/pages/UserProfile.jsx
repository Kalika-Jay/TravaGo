import React, { useState } from 'react';
import '../styles/UserProfile.css';

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
        </div>
    );
}