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

const TripFeed = () => {
    const user = useUsers();
    if (user){
        var {username}= user;
    }
    const [activeTab, setActiveTab] = useState('feed');
    const [trips, setTrips] = useState([]);
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const [filters, setFilters] = useState({
        destination: '',
        dateRange: '',
        budget: '',
        groupSize: ''
    });

    // Sample trip data
    const sampleTrips = [
        {
            id: 1,
            title: "Explore Ancient Sigiriya & Dambulla",
            creator: {
                name: "Amara Silva",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=50&h=50&fit=crop&crop=face",
                isVerified: true,
                rating: 4.8
            },
            destination: "Central Province",
            date: "2025-07-15",
            duration: "3 days",
            groupSize: "4-6 people",
            currentMembers: 3,
            budget: "$150-200",
            tags: ["Culture", "History", "Photography"],
            description: "Join me for an incredible journey through Sri Lanka's cultural triangle. We'll climb Sigiriya Rock Fortress at sunrise and explore the ancient cave temples of Dambulla.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
            likes: 24,
            comments: 8,
            isRecommended: true,
            isTrending: false
        },
        {
            id: 2,
            title: "Whale Watching in Mirissa",
            creator: {
                name: "James Wilson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
                isVerified: false,
                rating: 4.5
            },
            destination: "Southern Province",
            date: "2025-07-22",
            duration: "2 days",
            groupSize: "6-8 people",
            currentMembers: 5,
            budget: "$100-150",
            tags: ["Wildlife", "Ocean", "Adventure"],
            description: "Early morning whale watching expedition followed by beach relaxation and local seafood experiences in beautiful Mirissa.",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
            likes: 18,
            comments: 12,
            isRecommended: false,
            isTrending: true
        },
        {
            id: 3,
            title: "Tea Country Adventure - Ella & Nuwara Eliya",
            creator: {
                name: "Priya Perera",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
                isVerified: true,
                rating: 4.9
            },
            destination: "Central Province",
            date: "2025-08-05",
            duration: "4 days",
            groupSize: "3-5 people",
            currentMembers: 2,
            budget: "$200-300",
            tags: ["Nature", "Tea", "Hiking", "Photography"],
            description: "Experience the misty hills of Sri Lanka's tea country. Train rides, tea plantation tours, hiking to Little Adam's Peak, and exploring the charming town of Ella.",
            image: "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=250&fit=crop",
            likes: 31,
            comments: 15,
            isRecommended: true,
            isTrending: true
        }
    ];

    useEffect(() => {
        setTrips(sampleTrips);
    }, []);

    const handleCreateTrip = () => {
        setShowCreateTrip(true);
    };

    const handleLike = (tripId) => {
        setTrips(trips.map(trip =>
            trip.id === tripId
                ? { ...trip, likes: trip.likes + 1 }
                : trip
        ));
    };

    const TripCard = ({ trip }) => (
        <div className="trip-card">
            <div className="trip-image-container">
                <img src={trip.image} alt={trip.title} className="trip-image" />
                {trip.isRecommended && (
                    <div className="recommended-badge">
                        <Star size={12} />
                        Recommended for you
                    </div>
                )}
                {trip.isTrending && (
                    <div className="trending-badge">
                        <TrendingUp size={12} />
                        Trending
                    </div>
                )}
            </div>

            <div className="trip-content">
                <div className="trip-header">
                    <div className="creator-info">
                        <img src={trip.creator.avatar} alt={trip.creator.name} className="creator-avatar" />
                        <div className="creator-details">
                            <div className="creator-name">
                                {trip.creator.name}
                                {trip.creator.isVerified && <Verified size={14} className="verified-icon" />}
                            </div>
                            <div className="creator-rating">
                                <Star size={12} className="star-icon" />
                                {trip.creator.rating}
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="trip-title">{trip.title}</h3>
                <p className="trip-description">{trip.description}</p>

                <div className="trip-tags">
                    {trip.tags.map((tag, index) => (
                        <span key={index} className="trip-tag">{tag}</span>
                    ))}
                </div>

                <div className="trip-details">
                    <div className="trip-detail">
                        <MapPin size={16} />
                        <span>{trip.destination}</span>
                    </div>
                    <div className="trip-detail">
                        <Calendar size={16} />
                        <span>{trip.date} • {trip.duration}</span>
                    </div>
                    <div className="trip-detail">
                        <Users size={16} />
                        <span>{trip.currentMembers}/{trip.groupSize.split('-')[1].replace(' people', '')} joined</span>
                    </div>
                    <div className="trip-detail">
                        <DollarSign size={16} />
                        <span>{trip.budget}</span>
                    </div>
                </div>

                <div className="trip-actions">
                    <button
                        className="action-button like-button"
                        onClick={() => handleLike(trip.id)}
                    >
                        <Heart size={18} />
                        <span>{trip.likes}</span>
                    </button>
                    <button className="action-button">
                        <MessageCircle size={18} />
                        <span>{trip.comments}</span>
                    </button>
                    <button className="action-button">
                        <Share2 size={18} />
                        <span>Share</span>
                    </button>
                    <button className="join-button">Join Trip</button>
                </div>
            </div>
        </div>
    );

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
                        <input type="text" placeholder="Enter trip title" />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Destination</label>
                            <select>
                                <option>Select Province</option>
                                <option>Western Province</option>
                                <option>Central Province</option>
                                <option>Southern Province</option>
                                <option>Northern Province</option>
                                <option>Eastern Province</option>
                                <option>North Western Province</option>
                                <option>North Central Province</option>
                                <option>Uva Province</option>
                                <option>Sabaragamuwa Province</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Duration</label>
                            <select>
                                <option>1 day</option>
                                <option>2 days</option>
                                <option>3 days</option>
                                <option>4-7 days</option>
                                <option>1+ week</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Group Size</label>
                            <select>
                                <option>2-3 people</option>
                                <option>4-6 people</option>
                                <option>6-8 people</option>
                                <option>8+ people</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Budget Range</label>
                        <select>
                            <option>Under $50</option>
                            <option>$50-100</option>
                            <option>$100-200</option>
                            <option>$200-500</option>
                            <option>$500+</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Describe your trip plans, what you'll do, and what kind of travel companions you're looking for..." rows="4"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <input type="text" placeholder="Adventure, Culture, Food, Nature..." />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={() => setShowCreateTrip(false)}>Cancel</button>
                        <button type="button" className="create-button">Create Trip</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="trip-feed-container">
            <div className="feed-header">
                <div className="header-content">
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
            <section className="hero-section">
                <div className="container">
                    <h2 className="hero-title">Ready for Your Next Adventure?</h2>
                    <p className="hero-description">Join millions of travelers who trust Travago for their dream
                        vacations</p>
                    <Link to='/signup'><button className="cta-button">
                        Start Tripping
                    </button></Link>
                </div>
            </section>

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