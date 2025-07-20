import { useState } from 'react';
import '../styles/Feedback.css'
import Fbackground from '../assets/Fbackground.jpg';
import Feedback_1 from '../assets/Feedback_1.jpg';
import Feedback_2 from '../assets/Feedback_2.jpg';
import Feedback_3 from '../assets/Feedback_3.jpg';

export default function Feedback(){
    const [ formData, setFormData] = useState({
        tripname: '',
        tripDate: '',
        location: '',
        experience: '',
        leastExperience: '',
        rating: '',
        files: [],
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, files: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        // You can log or send the data to backend here if needed
        console.log("Submitted Data:", formData);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === "files") {
                for (let file of formData.files) {
                    data.append("files", file);
                }
            } else {
                data.append(key, formData[key]);
            }
        });
    };

    return (
        <>
            <div className='background-image' style={{ backgroundImage: `url(${Fbackground})` }} alt='feedback-background'>
                <br/><br/><br/><br/><br/><br/>
                <form className="trip-form" onSubmit={handleSubmit}>
                    <h1>Feedback Form</h1>
                    <hr style={{margin: '30px 0'}}/>

                    <p><b>Trip</b></p>
                    <div className="form-group grid-3">
                        <label>Trip Name <input type="text" name="tripname" value={formData.tripname} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="form-group grid-2">
                        <label>Trip Date <input type="date" name="tripDate" value={formData.tripDate} onChange={handleChange}/>
                        </label>
                        <label>Trip Location <input type="text" name="location" value={formData.location} onChange={handleChange}/>
                        </label>
                    </div>

                    <hr style={{margin: '10px 0'}}/>
                    <h2>Tour Evaluation</h2>
                    <table>
                        <tr>
                            <td></td>
                            <th>Poor</th>
                            <th>Fair</th>
                            <th>Good</th>
                            <th>Excellent</th>
                        </tr>
                        <tr>
                            <th>Transportation</th>
                            <td><input type="radio" name="transport"/></td>
                            <td><input type="radio" name="transport"/></td>
                            <td><input type="radio" name="transport"/></td>
                            <td><input type="radio" name="transport"/></td>
                        </tr>
                        <tr>
                            <th>Accommodation</th>
                            <td><input type="radio" name="accommodation"/></td>
                            <td><input type="radio" name="accommodation"/></td>
                            <td><input type="radio" name="accommodation"/></td>
                            <td><input type="radio" name="accommodation"/></td>
                        </tr>
                        <tr>
                            <th>Camp sites</th>
                            <td><input type="radio" name="campsites"/></td>
                            <td><input type="radio" name="campsites"/></td>
                            <td><input type="radio" name="campsites"/></td>
                            <td><input type="radio" name="campsites"/></td>
                        </tr>
                        <tr>
                            <th>Environmental/cultural impact</th>
                            <td><input type="radio" name="environmental"/></td>
                            <td><input type="radio" name="environmental"/></td>
                            <td><input type="radio" name="environmental"/></td>
                            <td><input type="radio" name="environmental"/></td>
                        </tr>
                    </table>

                    <h2>Service Evaluation</h2>
                    <table>
                        <tr>
                            <td></td>
                            <th>Poor</th>
                            <th>Good</th>
                            <th>Excellent</th>
                        </tr>
                        <tr>
                            <th>Guide Service</th>
                            <td><input type="radio" name="guide"/></td>
                            <td><input type="radio" name="guide"/></td>
                            <td><input type="radio" name="guide"/></td>
                        </tr>
                        <tr>
                            <th>Hotel Service</th>
                            <td><input type="radio" name="hotel"/></td>
                            <td><input type="radio" name="hotel"/></td>
                            <td><input type="radio" name="hotel"/></td>
                        </tr>
                    </table>
                    <hr style={{margin: '10px 0'}}/>
                    <label>
                        What places and experiences did you enjoy the most?
                        <textarea rows="4" name="experience" placeholder='Type here...' value={formData.experience} onChange={handleChange}></textarea>
                    </label>

                    <div className="form-group">
                        <label>
                            Upload photo
                            <div className="file-drop">
                                <p><strong>Browse Files</strong></p>
                                <p>Drag and drop files here</p>
                                <input type="file" name="files" multiple onChange={handleFileChange}/>
                            </div>
                        </label>
                    </div>


                    <div className="rating-block">
                        <label>
                            <p>On a scale of 1 to 5, please let us know how your trip met expectations.</p>
                            <div className="star-rating">
                                <input type="radio" id="rate-5" name="rating" value="⭐⭐⭐⭐⭐" onChange={handleChange}/><label htmlFor="rate-5"
                                                                                                                            title="5 stars"></label>
                                <input type="radio" id="rate-4" name="rating" value="⭐⭐⭐⭐" onChange={handleChange}/><label htmlFor="rate-4"
                                                                                                                           title="4 stars"></label>
                                <input type="radio" id="rate-3" name="rating" value="⭐⭐⭐" onChange={handleChange}/><label htmlFor="rate-3"
                                                                                                                          title="3 stars"></label>
                                <input type="radio" id="rate-2" name="rating" value="⭐⭐" onChange={handleChange}/><label htmlFor="rate-2"
                                                                                                                         title="2 stars"></label>
                                <input type="radio" id="rate-1" name="rating" value="⭐" onChange={handleChange}/><label htmlFor="rate-1"
                                                                                                                        title="1 stars"></label>
                            </div>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="reviews-section">
                <h2 className="review-title">Traveler Reviews</h2>

                <div className="review-card">
                    <img src={Feedback_1} alt="Feedback_1" className="review-image"/>

                    <div className="review-details">
                        <h3>
                            Ella <span className="stars">⭐⭐⭐⭐⭐</span>
                        </h3>
                        <p className="location"><strong>Location :-</strong> Nine Arch Bridge</p>
                        <p>
                            "My trip to Ella was absolutely magical! The Nine Arch Bridge is like something out of a postcard surrounded
                            by lush greenery and so peaceful. I went early in the morning and watched the train go by, which was such
                            a surreal experience. If you're visiting Sri Lanka, this place should be on your list. It’s one of the
                            most beautiful spots I’ve ever seen!"
                        </p>
                    </div>
                </div>
                <div className="review-card">
                    <img src={Feedback_2} alt="Feedback_2" className="review-image"/>

                    <div className="review-details">
                        <h3>
                            Dambulla <span className="stars">⭐⭐⭐⭐</span>
                        </h3>
                        <p className="location"><strong>Location :-</strong> Sigiriya</p>
                        <p>
                            "Climbing Sigiriya Rock was the highlight of my trip to Dambulla. The view from
                            the top is just stunning, and learning about the ancient fortress was fascinating.
                            The history, the gardens, the art it all came together in such a powerful way. It’s
                            a bit of a hike, but totally worth it. I left feeling inspired and amazed by how
                            well-preserved everything is."
                        </p>
                    </div>
                </div>
                <div className="review-card">
                    <img src={Feedback_3} alt="Feedback_3" className="review-image"/>

                    <div className="review-details">
                        <h3>
                            Kandy <span className="stars">⭐⭐⭐⭐⭐</span>
                        </h3>
                        <p className="location"><strong>Location :-</strong> Sri Dalada Maligawa</p>
                        <p>
                            "Kandy stole my heart, especially the Temple of the Tooth. It’s not just a beautiful
                            place it’s spiritually powerful. The architecture is incredible, and the whole
                            experience was calming and memorable. I went during a ceremony and was moved by the
                            atmosphere and the devotion of the locals. Truly one of the most meaningful places
                            I’ve visited."
                        </p>
                    </div>
                </div>
            </div>



            {submitted && (
                <div className="review-card">
                    <img src={formData.files} alt="photo" className="review-image"/>
                    <div className="review-details">
                        <h3>
                            {formData.tripname} <span className="stars">{formData.rating}</span>
                        </h3>
                        <p className="location"><strong>Location :</strong> {formData.location}</p>
                        <p>
                            “{formData.experience}”
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}