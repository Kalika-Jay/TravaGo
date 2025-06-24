import React, { useState } from "react";
import "../styles/Contact.css";

const teamMembers = [
    {
        name: "Kalika Jayasinghe Arachchi",
        email: "kalika.jay2004@gmail.com",
        contact: "0778705895"
    },
    {
        name: "Theuni Ranwala",
        email: "theuni2002@gmail.com",
        contact: "0713071131"
    },
    {
        name: "Kevin Anjana",
        email: "kevinanjana771@gmail.com",
        contact: "0766471750"
    },
    {
        name: "Lasen Dulsath",
        email: "ldulsath@gmail.com",
        contact: "0704030876"
    },
    {
        name: "Nithika Nimlaka",
        email: "nithikanimlaka93@gmail.com",
        contact: "0764481810"
    }
];

export default function Contact() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [announcement, setAnnouncement] = useState("");
    const [announcements, setAnnouncements] = useState([]);

    const [selectedMember, setSelectedMember] = useState(teamMembers[0].email);
    const [messageType, setMessageType] = useState("group"); // "group" or "private"

    const sendMessage = () => {
        if (!message.trim()) return;

        if (messageType === "group") {
            setChat((prev) => [...prev, `(You to Group): ${message}`]);
        } else {
            setChat((prev) => [...prev, `(You to ${selectedMember}): ${message}`]);
        }

        setMessage("");
    };

    const sendAnnouncement = () => {
        if (announcement.trim()) {
            setAnnouncements((prev) => [...prev, announcement]);
            setAnnouncement("");
        }
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Meet your TravaGo Team</h1>

            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card">
                        <h3>{member.name}</h3>
                        <p>Email: {member.email}</p>
                        <p>Contact: {member.contact}</p>
                    </div>
                ))}
            </div>

            <div className="chat-section">
                <div className="chat-box">
                    <h2>Chat</h2>
                    <div className="chat-messages">
                        {chat.map((msg, i) => (
                            <p key={i}>{msg}</p>
                        ))}
                    </div>

                    <div className="chat-input">
                        <select value={messageType} onChange={(e) => setMessageType(e.target.value)}>
                            <option value="group">Group Chat</option>
                            <option value="private">Private Message</option>
                        </select>

                        {messageType === "private" && (
                            <select
                                value={selectedMember}
                                onChange={(e) => setSelectedMember(e.target.value)}
                            >
                                {teamMembers.map((member, i) => (
                                    <option key={i} value={member.email}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>

                <div className="announcement-box">
                    <h2>Trip Announcements</h2>
                    <div className="announcement-messages">
                        {announcements.map((ann, i) => (
                            <p key={i}>📢 {ann}</p>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Post an announcement..."
                            value={announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                        />
                        <button onClick={sendAnnouncement}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
