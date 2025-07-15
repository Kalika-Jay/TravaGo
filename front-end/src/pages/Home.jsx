import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Calendar, Users, DollarSign, Star, Verified, Plus, Filter,ArrowRight, TrendingUp,TentTree} from 'lucide-react';
import useUsers from '../auth/useUser.jsx';
import '../styles/Home.css'
import {Link} from 'react-router-dom'
import fadeindes from '../assets/fadeindes.jsx'
import {Navigate} from "react-router-dom";
import temple from '../assets/places_images/Temple_of_tooth_relic.jpg'
import mountain from '../assets/places_images/shutterstock_562419604_20191120103528.png'
import beach from '../assets/places_images/mirissa-beach-banner.webp'
import axios from "axios";
import useToken from "../auth/useToken.jsx";
import {info} from "autoprefixer";
import sigiriya from "../assets/Sigiriya.jpg";

const TripFeed = () => {
    const user = useUsers(); // Assuming this hook returns the user object
    const [token, setToken] = useToken();
    const [tripTitle, setTripTitle] = useState('');
    const [tripLocation, setTripLocation] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [tripDuration, setTripDuration] = useState('');
    const [activeTab, setActiveTab] = useState('feed');
    const [trips, setTrips] = useState([]);
    const [filters, setFilters] = useState({
        destination: '',
        dateRange: '',
        budget: '',
        groupSize: ''
    });
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [createTrip, setCreateTrip] = useState([]);

    // Destructure user safely using optional chaining
    const id = user?.id;
    const username = user?.username;
    const info = user?.info;

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage, showErrorMessage]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await axios.get(`/api/users/${id}/trips`);
                setTrips(res.data.trips);
            } catch (err) {
                console.error('Error fetching trips:', err);
            }
        };

        fetchTrips();
    }, [id]);


    const addTrip = async () => {
        if (!tripTitle || !tripLocation || !tripDate) {
            setShowErrorMessage(true);
            return;
        }
        const new_trip = {tripTitle, tripLocation, tripDate};
        const updatedTrips = [...(info?.createTrip || []), new_trip];

        try {
            const response = await axios.put(
                `/api/users/${id}`,
                { ...info, createTrip: updatedTrips },
                {headers: {Authorization: `Bearer ${token}`}}
            );


            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
            setShowCreateTrip(false);
            setTripTitle('');
            setTripLocation('');
            setTripDate('');
        } catch (error) {
            console.error("Error creating trip:", error);
            setShowErrorMessage(true);
        }
        const newTrip = {
            tripTitle,
            tripLocation,
            tripDate,
            userId: id
        };

        try {
            const response1 = await axios.post('/api/trips', newTrip, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setShowSuccessMessage(true);
            setShowCreateTrip(false);
            setTripTitle('');
            setTripLocation('');
            setTripDate('');
        } catch (error) {
            console.error("Error creating trip:", error);
            setShowErrorMessage(true);
        }
    }


        const handleInputChange = (e) => {
            const {name, value} = e.target;
            setFilters((prev) => ({...prev, [name]: value}));
        };
        const CreateTripModal = () => (
            <div className="modal-overlay" onClick={() => setShowCreateTrip(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Create New Trip</h2>
                        <button onClick={() => setShowCreateTrip(false)} className="close-button">×</button>
                    </div>
                    <div className="create-trip-form">
                        <div className="form-group">
                            <label>Trip Title</label>
                            <input
                                type="text"
                                placeholder="Enter trip title"
                                value={tripTitle}
                                onChange={(e) => setTripTitle(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Destination</label>
                                <select
                                    value={tripLocation}
                                    onChange={(e) => setTripLocation(e.target.value)}
                                    name="destination"
                                >
                                    <option value="">Select Province</option>
                                    <option value="Western Province">Western Province</option>
                                    <option value="Central Province">Central Province</option>
                                    <option value="Southern Province">Southern Province</option>
                                    <option value="Northern Province">Northern Province</option>
                                    <option value="Eastern Province">Eastern Province</option>
                                    <option value="North Western Province">North Western Province</option>
                                    <option value="North Central Province">North Central Province</option>
                                    <option value="Uva Province">Uva Province</option>
                                    <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={tripDate}
                                    onChange={(e) => setTripDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Duration</label>
                                <select
                                    name="duration"
                                value={tripDuration}
                                onChange={(e) => {setTripDuration(e.target.value)}}>
                                    <option>1 day</option>
                                    <option>2 days</option>
                                    <option>3 days</option>
                                    <option>4-7 days</option>
                                    <option>1+ week</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Group Size</label>
                                <input type='number' min='1' max='20' placeholder='1-20'></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Budget Range</label>
                            <select name="budget">
                                <option>Under Rs.1000</option>
                                <option>Rs.1000 - Rs.2000</option>
                                <option>Rs.2000 - Rs.5000</option>
                                <option>Rs.5000 - Rs.10000</option>
                                <option>Rs.1000+</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                placeholder="Describe your trip plans, what you'll do, and what kind of travel companions you're looking for..."
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Tags</label>
                            <input
                                type="text"
                                placeholder="Adventure, Culture, Food, Nature..."
                            />
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="cancel-button"
                                    onClick={() => setShowCreateTrip(false)}>Cancel
                            </button>
                            <button type="button" className="create-button" onClick={addTrip}>Create Trip</button>
                        </div>
                    </div>
                </div>
            </div>
        );

        const handleCreateTrip = () => {
            setShowCreateTrip(true);
        };

        // const handleLike = (tripId) => {
        //     setTrips(trips.map(trip =>
        //         trip.id === tripId
        //             ? {...trip, likes: trip.likes + 1}
        //             : trip
        //     ));
        // };

    const TripCard = ({trip}) => (
        <div className="class-container">
            <div className="card">
                <img src={sigiriya} alt="Sigiriya" className="card-image"/>
                <p className="card-location">{trip.tripLocation}</p>
                <h2 className="card-title">Sigiriya</h2>
                <div className="trip-details">
                    <div className="trip-detail">
                        <MapPin size={16} />
                        <span className="trip-destination">destination</span>
                    </div>
                    <div className="trip-detail">
                        <Calendar size={16} />
                        <span className="trip-date">Date </span>
                        <span className="trip-duration">2 days ago </span>
                    </div>
                    <div className="trip-detail">
                        <Users size={16} />
                        <span className="trip-members">5/8 joined</span>
                    </div>
                    <div className="trip-detail">
                        <DollarSign size={16} />
                        <span className="trip-budget">$200</span>
                    </div>
                    {/*<div className="trip-detail">*/}
                    {/*    <span className="trip-creator">Created by {trip.username}</span>*/}
                    {/*</div>*/}
                </div>
                <Link to="#"  className="view-btn"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Details > </Link>
            </div>
        </div>
    );


    return (
        <div className="trip-feed-container">
            <div className="feed-header">
                <div className="header-content-home">
                    {user && <p className='hi'>Hi</p>}
                    {user && <p className='name'>{username}</p>}
                    {!user && <p className='hi'>Looking for a Trip?</p>}
                    <p className='description'>Discover amazing trips and connect with fellow travelers across Sri
                        Lanka</p>
                </div>

            <div className='image-row'>
                <img className='back_images' src={mountain}></img>
                <img className='back_images' src={temple}></img>
                <img className='back_images' src={beach}></img>
            </div>
            </div>
            {}
            {/*{user &&<div><br/><br/><br/><br/></div>}*/}
            {user && <div className="join_create_trips">
                <div className='join-trip'>
                    <p>Join an existing trip</p>
                    <Link to='/discovery'>
                        <button className='join'>Join trip</button>
                    </Link>
                </div>
                <div className='create-trip'>
                    <p>Create a new trip</p>
                    <button className="create-button" onClick={handleCreateTrip}>
                        Create Trip
                    </button>
                </div>
            </div>}
            {/*{!user && <div><br/><br/><br/><br/><br/><br/><br/></div>}*/}
            <div className='my-trips'>
            <h2>My trips</h2>
            {user?.info?.createTrip?.length > 0 && (
                <div className="trip-container">
                    {user.info.createTrip.map((trip, index) => (
                        <TripCard key={index} trip={trip} />
                    ))}
                </div>
            )}
            </div>

            <section className="section-container">
                <div className="section-wrapper">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Travago?</h2>
                        <p className="section-subtitle">Your perfect travel companion</p>
                    </div>

                    <div className="feature-grid">
                        <div className="feature-item">
                            <div className="feature-icon-container bg-location">
                                <TentTree className="text-white" size={24}/>
                            </div>
                            <h3 className="feature-title">Fast Trip Creation</h3>
                            <p className="feature-description">
                                You can create your own trip based on your preferences.
                            </p>
                        </div>

                        <div className="feature-item" style={{animationDelay: '0.5s'}}>
                            <div className="feature-icon-container bg-booking">
                                <Calendar className="text-white" size={24}/>
                            </div>
                            <h3 className="feature-title">Easy Joining</h3>
                            <p className="feature-description">
                                With just a few clicks, can join a trip.
                            </p>
                        </div>

                        <div className="feature-item" style={{animationDelay: '1s'}}>
                            <div className="feature-icon-container bg-support">
                                <Users className="text-white" size={24}/>
                            </div>
                            <h3 className="feature-title">24/7 Support</h3>
                            <p className="feature-description">
                                Our dedicated team is always ready to help you have the best travel experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <br/>
            {!user && <section className="hero-section">
                <div className="container">
                    <h2 className="hero-title">Ready for Your Next Adventure?</h2>
                    <p className="hero-description">Join millions of travelers who trust Travago for their dream
                        vacations</p>
                    <Link to='/signup'><button className="cta-button">
                        Start Tripping
                    </button></Link>
                </div>
            </section>}

            {/*<div className="feed-tabs">*/}
            {/*    <button*/}
            {/*        className={`tab-button ${activeTab === 'feed' ? 'active' : ''}`}*/}
            {/*        onClick={() => setActiveTab('feed')}*/}
            {/*    >*/}
            {/*        Activity Feed*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        className={`tab-button ${activeTab === 'recommended' ? 'active' : ''}`}*/}
            {/*        onClick={() => setActiveTab('recommended')}*/}
            {/*    >*/}
            {/*        Recommended*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        className={`tab-button ${activeTab === 'trending' ? 'active' : ''}`}*/}
            {/*        onClick={() => setActiveTab('trending')}*/}
            {/*    >*/}
            {/*        Trending*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*<div className="feed-filters">*/}
            {/*    <div className="filter-group">*/}
            {/*        <Filter size={16} />*/}
            {/*        <select*/}
            {/*            value={filters.destination}*/}
            {/*            onChange={(e) => setFilters({...filters, destination: e.target.value})}*/}
            {/*        >*/}
            {/*            <option value="">All Destinations</option>*/}
            {/*            <option value="western">Western Province</option>*/}
            {/*            <option value="central">Central Province</option>*/}
            {/*            <option value="southern">Southern Province</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*    <div className="filter-group">*/}
            {/*        <select*/}
            {/*            value={filters.budget}*/}
            {/*            onChange={(e) => setFilters({...filters, budget: e.target.value})}*/}
            {/*        >*/}
            {/*            <option value="">Any Budget</option>*/}
            {/*            <option value="low">Under $100</option>*/}
            {/*            <option value="medium">$100-300</option>*/}
            {/*            <option value="high">$300+</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*    <div className="filter-group">*/}
            {/*        <select*/}
            {/*            value={filters.groupSize}*/}
            {/*            onChange={(e) => setFilters({...filters, groupSize: e.target.value})}*/}
            {/*        >*/}
            {/*            <option value="">Any Group Size</option>*/}
            {/*            <option value="small">2-4 people</option>*/}
            {/*            <option value="medium">5-7 people</option>*/}
            {/*            <option value="large">8+ people</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="trips-grid">*/}
            {/*    {trips*/}
            {/*        .filter(trip => {*/}
            {/*            if (activeTab === 'recommended') return trip.isRecommended;*/}
            {/*            if (activeTab === 'trending') return trip.isTrending;*/}
            {/*            return true;*/}
            {/*        })*/}
            {/*        .map(trip => (*/}
            {/*            <TripCard key={trip.id} trip={trip} />*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</div>*/}
            {showCreateTrip && <CreateTripModal/>}
        </div>
    );
};

export default TripFeed;