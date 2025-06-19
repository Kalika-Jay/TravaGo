import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Calendar, Users, DollarSign, Star, Verified, Plus, Filter, TrendingUp } from 'lucide-react';

const TripFeed = () => {
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
                    <h1>Trip Feed</h1>
                    <p>Discover amazing trips and connect with fellow travelers across Sri Lanka</p>
                </div>
                <button className="create-trip-button" onClick={handleCreateTrip}>
                    <Plus size={20} />
                    Create Trip
                </button>
            </div>

            <div className="feed-tabs">
                <button
                    className={`tab-button ${activeTab === 'feed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feed')}
                >
                    Activity Feed
                </button>
                <button
                    className={`tab-button ${activeTab === 'recommended' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recommended')}
                >
                    Recommended
                </button>
                <button
                    className={`tab-button ${activeTab === 'trending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trending')}
                >
                    Trending
                </button>
            </div>

            <div className="feed-filters">
                <div className="filter-group">
                    <Filter size={16} />
                    <select
                        value={filters.destination}
                        onChange={(e) => setFilters({...filters, destination: e.target.value})}
                    >
                        <option value="">All Destinations</option>
                        <option value="western">Western Province</option>
                        <option value="central">Central Province</option>
                        <option value="southern">Southern Province</option>
                    </select>
                </div>
                <div className="filter-group">
                    <select
                        value={filters.budget}
                        onChange={(e) => setFilters({...filters, budget: e.target.value})}
                    >
                        <option value="">Any Budget</option>
                        <option value="low">Under $100</option>
                        <option value="medium">$100-300</option>
                        <option value="high">$300+</option>
                    </select>
                </div>
                <div className="filter-group">
                    <select
                        value={filters.groupSize}
                        onChange={(e) => setFilters({...filters, groupSize: e.target.value})}
                    >
                        <option value="">Any Group Size</option>
                        <option value="small">2-4 people</option>
                        <option value="medium">5-7 people</option>
                        <option value="large">8+ people</option>
                    </select>
                </div>
            </div>

            <div className="trips-grid">
                {trips
                    .filter(trip => {
                        if (activeTab === 'recommended') return trip.isRecommended;
                        if (activeTab === 'trending') return trip.isTrending;
                        return true;
                    })
                    .map(trip => (
                        <TripCard key={trip.id} trip={trip} />
                    ))
                }
            </div>

            {showCreateTrip && <CreateTripModal />}

            <style jsx>{`
        .trip-feed-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-content h1 {
          margin: 0 0 5px 0;
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
        }

        .header-content p {
          margin: 0;
          color: #6b7280;
          font-size: 1rem;
        }

        .create-trip-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .create-trip-button:hover {
          background: #2563eb;
        }

        .feed-tabs {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 8px;
          width: fit-content;
        }

        .tab-button {
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s;
        }

        .tab-button.active {
          background: white;
          color: #1f2937;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .feed-filters {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 8px 12px;
        }

        .filter-group select {
          border: none;
          background: transparent;
          outline: none;
          cursor: pointer;
          color: #374151;
        }

        .trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }

        .trip-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .trip-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .trip-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .trip-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .recommended-badge, .trending-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .recommended-badge {
          background: rgba(34, 197, 94, 0.9);
        }

        .trending-badge {
          background: rgba(239, 68, 68, 0.9);
        }

        .trip-content {
          padding: 20px;
        }

        .trip-header {
          margin-bottom: 12px;
        }

        .creator-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .creator-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .creator-name {
          font-weight: 600;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .verified-icon {
          color: #3b82f6;
        }

        .creator-rating {
          display: flex;
          align-items: center;
          gap: 2px;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .star-icon {
          color: #fbbf24;
        }

        .trip-title {
          margin: 0 0 8px 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
        }

        .trip-description {
          margin: 0 0 12px 0;
          color: #4b5563;
          line-height: 1.5;
        }

        .trip-tags {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .trip-tag {
          background: #eff6ff;
          color: #3b82f6;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .trip-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }

        .trip-detail {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .trip-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background-color 0.2s;
          font-size: 0.875rem;
        }

        .action-button:hover {
          background: #f3f4f6;
        }

        .like-button:hover {
          color: #ef4444;
        }

        .join-button {
          margin-left: auto;
          background: #10b981;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .join-button:hover {
          background: #059669;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover {
          background: #f3f4f6;
        }

        .create-trip-form {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #374151;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .cancel-button {
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          background: white;
          color: #374151;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .cancel-button:hover {
          background: #f9fafb;
        }

        .create-button {
          padding: 8px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .create-button:hover {
          background: #2563eb;
        }

        @media (max-width: 768px) {
          .trip-feed-container {
            padding: 16px;
          }

          .feed-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .trips-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .feed-filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            justify-content: space-between;
          }
        }
      `}</style>
        </div>
    );
};

export default TripFeed;