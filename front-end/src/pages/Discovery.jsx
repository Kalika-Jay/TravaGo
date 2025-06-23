
 import imageTitle from '../assets/background.jpg';
 import '../pages/Discovery.css';
 import sigiriya from '../assets/Sigiriya.jpg';
 import React,{useState,useEffect} from 'react';
 import { Link } from 'react-router-dom';
 import { Heart, MessageCircle, Share2, MapPin, Calendar, Users, DollarSign, Star, Verified, Plus, Filter, TrendingUp } from 'lucide-react' ;


 export default function Discovery(){
     const [budget, setBudget] = useState(500);
     const [selectedModes, setSelectedModes] = useState([]);
     const handleChange = (e) => {
         const { value, checked } = e.target;
         if (checked) {
             setSelectedModes([...selectedModes, value]);
         } else {
             setSelectedModes(selectedModes.filter((mode) => mode !== value));
         }
     };
     const [activeTab, setActiveTab] = useState('feed');
     return (

     <>
         <div className = "container-background-image" style={{
             backgroundImage: `url(${imageTitle})`,
         }}>
             <br/><br/><br/><br/><br/>
             <p className="discription-text">Our packages</p><br/>
             <h1 className="title-one">Search your Holiday</h1>

             <div className="search-bar">
                 <div className="input-group">
                     <label htmlFor="destination">Select your Destination :</label><br/>
                     <input type="text" id="travelDestination" className="input-textbox" placeholder="All Destinations"/>
                 </div>
                 <div className="input-group">
                     <label htmlFor="traveldate">Select your Date :</label><br/>
                     <input type="date" id="travelDate" className="input-textbox" />
                 </div>
                 <div className="input-group">
                     <label htmlFor="budget">Select your budget: ${budget}</label><br/>
                     <input
                         type="range"
                         id="budget"
                         min="0"
                         max="5000"
                         step="100"
                         value={budget}
                         onChange={(e) => setBudget(e.target.value)}
                     />
                 </div>
                 <div className="input-mode">
                     <label className="mode-label">Select your travel modes:</label>
                     <div className="checkbox-options">
                         <label>
                             <input
                                 type="checkbox"
                                 value="plane"
                                 checked={selectedModes.includes('plane')}
                                 onChange={handleChange}
                             />
                             Private vehicle
                         </label>
                         <label>
                             <input
                                 type="checkbox"
                                 value="train"
                                 checked={selectedModes.includes('train')}
                                 onChange={handleChange}
                             />
                             Train
                         </label>
                         <label>
                             <input
                                 type="checkbox"
                                 value="bus"
                                 checked={selectedModes.includes('bus')}
                                 onChange={handleChange}
                             />
                             Bus
                         </label>
                     </div>
                 </div>
             </div>
         </div>



         <h1 className="title">Discover the beauty of Sri Lanka</h1>
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
         <div className="class-container">
             <div className="card">
                 <img src={sigiriya} alt="Sigiriya" className="card-image"/>
                 <p className="card-location">Dambulla , Central Province , Sri Lanka</p>
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
                 </div>
                 <Link to="#"  className="view-btn"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Details > </Link>
             </div>
             <div className="card">
                 <img src={sigiriya} alt="Sigiriya" className="card-image"/>
                 <p className="card-location">Dambulla , Central Province , Sri Lanka</p>
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
                 </div>
                 <Link to="#"  className="view-btn"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Details > </Link>
             </div>
             <div className="card">
                 <img src={sigiriya} alt="Sigiriya" className="card-image"/>
                 <p className="card-location">Dambulla , Central Province , Sri Lanka</p>
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
                 </div>
                 <Link to="#"  className="view-btn"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Details > </Link>
             </div>
             <div className="card">
                 <img src={sigiriya} alt="Sigiriya" className="card-image"/>
                 <p className="card-location">Dambulla , Central Province , Sri Lanka</p>
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
                 </div>
                 <Link to="#"  className="view-btn"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Details > </Link>
             </div>
             <div className="card">
                 <img src={sigiriya} alt="Sigiriya" className="card-image"/>
                 <p className="card-location">Dambulla , Central Province , Sri Lanka</p>
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
                 </div>
                 <Link to="#"  className="view-btn"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Details > </Link>
             </div>
             <div className="card">
                 <img src={sigiriya} alt="Sigiriya" className="card-image"/>
                 <p className="card-location">Dambulla , Central Province , Sri Lanka</p>
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
                 </div>
                 <Link to="#"  className="view-btn"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Details > </Link>
             </div>

         </div>
         </>
    );
 }