export default function Feedback(){
    return (
        <>
            <div className="form-container">
                <form className="trip-form">
                    <h1>Feedback Form</h1>
                    <hr style={{margin: '30px 0'}}/>

                    <p><b>Name</b></p>
                    <div className="form-group grid-2">
                        <label><input type="text"/>
                            <span className="small-note">First Name</span>
                        </label>
                        <label><input type="text"/>
                            <span className="small-note">Last Name</span>
                        </label>
                        <label>Email <input type="email"/>
                            <span className="small-note">example@example.com</span>
                        </label>
                        <label>Phone <input type="tel" placeholder="(000) 000-0000"/>
                            <span className="small-note">Please enter a valid phone number.</span>
                        </label>
                    </div>
                    <p><b>Address</b></p>
                    <div className="form-group grid-3">
                        <label><input type="text"/>
                            <span className="small-note">Street Address</span>
                        </label>
                        <label><input type="text"/>
                            <span className="small-note">Street Address Line 2</span>
                        </label>
                    </div>
                    <div className="form-group grid-2">
                        <label><input type="text"/>
                            <span className="small-note">City</span>
                        </label>
                        <label><input type="text"/>
                            <span className="small-note">State / Province</span>
                        </label>
                    </div>
                    <div className="form-group grid-3">
                        <label><input type="text"/>
                            <span className="small-note">Postal/Zip Code</span>
                        </label>
                    </div>
                    <div className="form-group grid-2">
                        <label>Trip Date <input type="date"/>
                            <span className="small-note">Date</span>
                        </label>
                        <label>Trip Location <input type="text"/></label>
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
                    </table>
                    <hr style={{margin: '10px 0'}}/>
                    <label>
                        What places and experiences did you enjoy the most?
                        <textarea rows="4" placeholder='Type here...'></textarea>
                    </label>

                    <label>
                        What places and experiences did you enjoy the least?
                        <textarea rows="4" placeholder='Type here...'></textarea>
                    </label>

                    <div className="form-group">
                        <label>
                            Upload photo
                            <div className="file-drop">
                                <p><strong>Browse Files</strong></p>
                                <p>Drag and drop files here</p>
                                <input type="file" multiple/>
                            </div>
                        </label>
                    </div>


                    <div className="rating-block">
                        <label>
                            <p>On a scale of 1 to 5, please let us know how your trip met expectations.</p>
                            <div className="star-rating">
                                <input type="radio" id="rate-5" name="rating" value="5"/><label htmlFor="rate-5"
                                                                                                title="5 stars"></label>
                                <input type="radio" id="rate-4" name="rating" value="4"/><label htmlFor="rate-4"
                                                                                                title="4 stars"></label>
                                <input type="radio" id="rate-3" name="rating" value="3"/><label htmlFor="rate-3"
                                                                                                title="3 stars"></label>
                                <input type="radio" id="rate-2" name="rating" value="2"/><label htmlFor="rate-2"
                                                                                                title="2 stars"></label>
                                <input type="radio" id="rate-1" name="rating" value="1"/><label htmlFor="rate-1"
                                                                                                title="1 stars"></label>
                            </div>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}