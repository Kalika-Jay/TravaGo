import '../styles/UserProfile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import useUser from '../auth/useUser.jsx'; // Adjust import path as needed
import useToken from '../auth/useToken.jsx';
import sigiriya from "../assets/Sigiriya.jpg";
import {Calendar, DollarSign, MapPin, Users} from "lucide-react"; // Adjust import path as needed
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
    const [interests, setinterests] = useState(info.interests || '');
    const [location, setLocation] = useState(info.location || '');
    const [language, setLanguage] = useState(info.language || '');
    const [trips, setTrips] = useState([]);

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
                location,
                language
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
    const editProfile = () => {
        navigate('/form');
    }
    const fetchTrips = async () => {
        try {
            const res = await axios.get(`/api/trips`);
            setTrips(res.data.trips);
        } catch (err) {
            console.error('Error fetching trips:', err);
        }
    };
    fetchTrips();
    const TripCard = ({trip}) => (
        <div className="class-container">
            <div className="card">
                <h2 className="card-title">{trip.tripTitle}</h2>
                <div className="trip-details">
                    <div className="trip-detail">
                        <MapPin size={16}/>
                        <span className="trip-destination">{trip.tripLocation}</span>
                    </div>
                    <div className="trip-detail">
                        <Calendar size={16}/>
                        <span className="trip-date">Date </span>
                        <span className="trip-duration">{trip.tripDate}</span>
                    </div>
                    <div className="trip-detail">
                        <Users size={16}/>
                        <span className="trip-members">{trip.tripGrpsize} People</span>
                    </div>
                    <div className="trip-detail">
                        <DollarSign size={16}/>
                        <span className="trip-budget">{trip.tripBudget}</span>
                    </div>
                </div>
                <Link to="#"
                      className="view-btn">View Details ---></Link>
            </div>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-section">
                <h3>Basic User Data</h3>
                <div className="user-info">
                    <img src={user.profilePhotoUrl} alt="User Photo" className="profile-photo" />
                    <div className="details">
                        <p><strong>Name:</strong>{user1.info.name}</p>
                        <p><strong>Age:</strong>{user1.info.age}</p>
                        <p><strong>Location:</strong> {user1.info.location}</p>
                        <p><strong>Language:</strong> {user1.info.language}</p>
                        <p><strong>Budget:</strong> {user1.info.budget}</p>
                    </div>
                    <button className='buttons' onClick={editProfile}>Edit Details</button>
                </div>
            </div>


            {/*<div className="profile-section">*/}
            {/*    <h3>Language Proficiency</h3>*/}
            {/*    <ul className="language-list">*/}
            {/*        {user.languages.map(lang => (*/}
            {/*            <li key={lang.name}>*/}
            {/*                {lang.name}*/}
            {/*                <span className={`proficiency-level ${lang.level}`}>*/}
            {/*    {lang.proficiency}*/}
            {/*  </span>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <div className='profile-section'>
            <div className='my-trips'>
                <h3>My trips</h3>
                {user1?.info?.createTrip?.length > 0 && (
                    <div className="trip-container">
                        {user1.info.createTrip.map((trip, index) => (
                            <TripCard key={index} trip={trip} />
                        ))}
                    </div>
                )}
            </div>
            </div>

            {/*<div className="profile-section">*/}
            {/*    <h3>Personalised Calendar</h3>*/}
            {/*    /!* You can add the calendar component we discussed before right here *!/*/}
            {/*    <div className="calendar-placeholder">Your calendar will go here.</div>*/}
            {/*</div>*/}
            <button className='buttons' onClick={logout}>Logout</button>
        {/*    <div className="user-profile">*/}
        {/*        <p>Email: {email}</p>*/}

        {/*        <label>Name:</label>*/}
        {/*        <input*/}
        {/*            type="text"*/}
        {/*            value={name}*/}
        {/*            onChange={(e) => setname(e.target.value)}*/}
        {/*        />*/}

        {/*        <label>Age:</label>*/}
        {/*        <input*/}
        {/*            type="number"*/}
        {/*            value={age}*/}
        {/*            onChange={(e) => setage(e.target.value)}*/}
        {/*        />*/}

        {/*        <select*/}
        {/*            value={interests}*/}
        {/*            onChange={(e) => setinterests(e.target.value)}*/}
        {/*            name="destination"*/}
        {/*        >*/}
        {/*            <option value="">What is your interest theses days....</option>*/}
        {/*            <option value="Hikes">Hikes</option>*/}
        {/*            <option value="Beaches">Beaches</option>*/}
        {/*            <option value="Temples">Temples</option>*/}
        {/*            <option value="Rivers">Rivers</option>*/}
        {/*            <option value="Camping">Camping</option>*/}
        {/*        </select>*/}
        {/*        <select*/}
        {/*            value={language}*/}
        {/*            onChange={(e) => setLanguage(e.target.value)}*/}
        {/*            name="language"*/}
        {/*        >*/}
        {/*            <option value="">Language</option>*/}
        {/*            <option value="Sinhala">Sinhala</option>*/}
        {/*            <option value="Tamil">Tamil</option>*/}
        {/*            <option value="English">English</option>*/}
        {/*        </select>*/}
        {/*        /!*<label>Interests:</label>*!/*/}
        {/*        /!*{interestsList.map((interest) => (*!/*/}
        {/*        /!*    <div key={interest}>*!/*/}
        {/*        /!*        <input*!/*/}
        {/*        /!*            type="checkbox"*!/*/}
        {/*        /!*            checked={interests.includes(interest)}*!/*/}
        {/*        /!*            onChange={() => handleCheckboxChange(interest)}*!/*/}
        {/*        /!*        />*!/*/}
        {/*        /!*        {interest}*!/*/}
        {/*        /!*    </div>*!/*/}
        {/*        /!*))}*!/*/}
        {/*        <select*/}
        {/*            value={location}*/}
        {/*            onChange={(e) => setLocation(e.target.value)}*/}
        {/*            name="destination"*/}
        {/*        >*/}
        {/*            <option value="">Select Province</option>*/}
        {/*            <option value="Western Province">Western Province</option>*/}
        {/*            <option value="Central Province">Central Province</option>*/}
        {/*            <option value="Southern Province">Southern Province</option>*/}
        {/*            <option value="Northern Province">Northern Province</option>*/}
        {/*            <option value="Eastern Province">Eastern Province</option>*/}
        {/*            <option value="North Western Province">North Western Province</option>*/}
        {/*            <option value="North Central Province">North Central Province</option>*/}
        {/*            <option value="Uva Province">Uva Province</option>*/}
        {/*            <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>*/}
        {/*        </select>*/}

        {/*        <div>*/}
        {/*            <button onClick={saveChanges}>Save Changes</button>*/}
        {/*            <button onClick={resetValues}>Reset</button>*/}
        {/*            <button onClick={logout}>Logout</button>*/}
        {/*        </div>*/}

        {/*        {showSuccessMessage && <p className="success-message">Profile updated successfully!</p>}*/}
        {/*        {showErrorMessage && <p className="error-message">Error updating profile. Please try again.</p>}*/}
        {/*    </div>*/}
        </div>
    );
}