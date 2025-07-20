import React, { useState, useEffect } from "react";
import "../styles/Contact.css";
import image1 from '../assets/back-contact.jpg';

const teamMembers = [
    {
        name: "Kalika Jayasinghe Arachchi",
        email: "kalika.jay2004@gmail.com",
        contact: "0778705895",
    },
    {
        name: "Theuni Ranwala",
        email: "theuni2002@gmail.com",
        contact: "0713071131",
    },
    {
        name: "Kevin Anjana",
        email: "kevinanjana771@gmail.com",
        contact: "0766471750",
    },
    {
        name: "Lasen Dulsath",
        email: "ldulsath@gmail.com",
        contact: "0704030876",
    },
    {
        name: "Nithika Nimlaka",
        email: "nithikanimlaka93@gmail.com",
        contact: "0764481810",
    },
];

export default function Contact() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [announcement, setAnnouncement] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [selectedMember, setSelectedMember] = useState(teamMembers[0].email);
    const [messageType, setMessageType] = useState("group");
    const [fullscreen, setFullscreen] = useState(null); // "chat", "announcement", or null

    // Handle escape key to exit fullscreen
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && fullscreen) {
                exitFullscreen();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [fullscreen]);

    // Prevent body scroll when fullscreen is active
    useEffect(() => {
        if (fullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [fullscreen]);

    const sendMessage = () => {
        if (!message.trim()) return;
        const newMessage =
            messageType === "group"
                ? `You to Group: ${message}`
                : `You to ${selectedMember}: ${message}`;
        setChat((prev) => [...prev, newMessage]);
        setMessage("");
    };

    const sendAnnouncement = () => {
        if (announcement.trim()) {
            setAnnouncements((prev) => [...prev, announcement]);
            setAnnouncement("");
        }
    };

    const handleFullscreen = (type) => {
        if (fullscreen === null) {
            setFullscreen(type);
        }
    };

    const exitFullscreen = () => {
        setFullscreen(null);
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('fullscreen-backdrop')) {
            exitFullscreen();
        }
    };

    const handleKeyPress = (e, action) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            action();
        }
    };

    return (
        <div className="contact-page">
            {/* Header image with text on top */}
            <div className="header-wrapper">
                <div className="header-overlay-text">
                    <div className="line">
                        <span className="word">Chat</span>
                        <span className="word">Room</span>
                    </div>
                    <div className="line">
                        <span className="word">& </span>
                        <span className="word">Announcements</span>
                    </div>
                </div>
            </div>

            {/* Chat and Announcements */}
            <div className={`chat-section ${fullscreen ? "blurred" : ""}`}>
                {/* Chat Box */}
                <div
                    className={`chat-box ${fullscreen === "chat" ? "fullscreen" : ""}`}
                    onClick={() => handleFullscreen("chat")}
                >
                    <div className="chat-header">
                        <h2>Chat</h2>
                        {fullscreen === "chat" && (
                            <button
                                className="close-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    exitFullscreen();
                                }}
                                aria-label="Close fullscreen"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="chat-messages">
                        {chat.map((msg, i) => (
                            <p key={i}>{msg}</p>
                        ))}
                        {chat.length === 0 && (
                            <p className="placeholder-message">No messages yet. Start a conversation!</p>
                        )}
                    </div>

                    <div className="chat-input" onClick={(e) => e.stopPropagation()}>
                        <select
                            value={messageType}
                            onChange={(e) => setMessageType(e.target.value)}
                        >
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
                            onKeyPress={(e) => handleKeyPress(e, sendMessage)}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>

                {/* Announcements */}
                <div
                    className={`announcement-box ${fullscreen === "announcement" ? "fullscreen" : ""}`}
                    onClick={() => handleFullscreen("announcement")}
                >
                    <div className="chat-header">
                        <h2>Trip Announcements</h2>
                        {fullscreen === "announcement" && (
                            <button
                                className="close-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    exitFullscreen();
                                }}
                                aria-label="Close fullscreen"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="announcement-messages">
                        {announcements.map((ann, i) => (
                            <p key={i}>📢 {ann}</p>
                        ))}
                        {announcements.length === 0 && (
                            <p className="placeholder-message">No announcements yet. Post the first one!</p>
                        )}
                    </div>

                    <div className="chat-input" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            placeholder="Post an announcement..."
                            value={announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, sendAnnouncement)}
                        />
                        <button onClick={sendAnnouncement}>Post</button>
                    </div>
                </div>
            </div>


            {/* Team Members */}
            <div className={`team-grid ${fullscreen ? "blurred" : ""}`}>
                <p className="word">Meet our team</p>
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card">
                        <h3>{member.name}</h3>
                        <p>Email: {member.email}</p>
                        <p>Contact: {member.contact}</p>
                    </div>
                ))}
            </div>

            {/* Fullscreen Backdrop */}
            {fullscreen && (
                <div
                    className="fullscreen-backdrop"
                    onClick={handleBackdropClick}
                />
            )}
        </div>
    );
}