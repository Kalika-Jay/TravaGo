import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import axios from 'axios';
import '../styles/form.css'
import backgroundImage from '../assets/background.jpg'

export default function Form(){
    const [token, setToken] = useToken();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const user = useUser();
    const {id,username,info} = user;


    const [name, setname] = useState(info.name || '');
    const [age, setage] = useState(info.age || '');
    const [interests, setinterests] = useState(info.interests || '');
    const [location, setLocation] = useState(info.location || '');
    const [language, setLanguage] = useState(info.language || '');
    const [budget, setBudget] = useState(info.budget||'');

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


    const saveChanges = async () => {
        console.log({ name, age, interests });
        try {
            const response = await axios.put(`/api/users/${id}`, {
                ...info,
                name,
                age,
                budget,
                interests,
                location,
                language
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
            navigate('/');
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
        <div             className="form-background"
                         style={{
                             backgroundImage: `url(${backgroundImage})`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             backgroundAttachment: 'fixed',
                             minHeight: '100vh'
                         }}>
        <div className="user-profile">
            <p>Hi!!! {username}</p>

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
            <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                name="language"
            >
                <option value="">Select your budget type</option>
                <option value="Backpacker">Backpacker</option>
                <option value='Explorer'>Explorer</option>
                <option value="Comfort">Comfort Cruiser</option>
                <option value="Firstclass">Firstclass</option>
            </select>

            <select
                value={interests}
                onChange={(e) => setinterests(e.target.value)}
                name="destination"
            >
                <option value="">What is your interest these days....</option>
                <option value="Surfing">Surfing</option>
                <option value="Camping">Camping</option>
                <option value="Diving">Diving</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Culture">Culture</option>
                <option value="History">History</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Adventure">Adventure</option>
                <option value="Photography">Photography</option>
                <option value="Roadtrips">Roadtrips</option>
                <option value="Nature">Nature</option>
                <option value="Snorkeling">Snorkeling</option>
                <option value="Meditation">Meditation</option>
                <option value="Sailing">Sailing</option>
                <option value="Climbing">Climbing</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Art">Art</option>
                <option value="Beaches">Beaches</option>
            </select>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                name="language"
            >
                <option value="">Language</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
            </select>
            {/*<label>Interests:</label>*/}
            {/*{interestsList.map((interest) => (*/}
            {/*    <div key={interest}>*/}
            {/*        <input*/}
            {/*            type="checkbox"*/}
            {/*            checked={interests.includes(interest)}*/}
            {/*            onChange={() => handleCheckboxChange(interest)}*/}
            {/*        />*/}
            {/*        {interest}*/}
            {/*    </div>*/}
            {/*))}*/}
            <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                name="destination"
            >
                <option value="">Residence</option>
                <option value="Ampara">Ampara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Badulla">Badulla</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Mannar">Mannar</option>
                <option value="Matale">Matale</option>
                <option value="Matara">Matara</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Vavuniya">Vavuniya</option>
            </select>

            <div>
                <button onClick={saveChanges}>Save Changes</button>
                <button onClick={resetValues}>Reset</button>
                <button onClick={logout}>Logout</button>
            </div>

            {showSuccessMessage && <p className="success-message">Profile updated successfully!</p>}
            {showErrorMessage && <p className="error-message">Error updating profile. Please try again.</p>}
        </div>
        </div>
    )
}