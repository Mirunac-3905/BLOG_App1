import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import { useNavigate } from "react-router-dom";
import '../CSS/ProfilePage.css';

const ProfilePage = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newBio, setNewBio] = useState(""); // State for new bio
    const [newTwitter, setNewTwitter] = useState(""); // State for new twitter URL
    const [newLinkedIn, setNewLinkedIn] = useState(""); // State for new LinkedIn URL
    const [newEmail, setNewEmail] = useState(""); // State for new email
    const [newProfilePicture, setNewProfilePicture] = useState(null); // State for new profile picture
    const [successMessage, setSuccessMessage] = useState(""); // State to show "Saved"
    const [deleteMessage, setDeleteMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userInfo?.username) {
                setError("Username is missing");
                return;
            }
            try {
                const response = await axios.get(
                    `http://localhost:4000/profile?username=${userInfo.username}`
                );
                setProfile(response.data);
                setNewBio(response.data.bio);
                setNewTwitter(response.data.twitter);
                setNewLinkedIn(response.data.linkedin);
                setNewEmail(response.data.email);
            } catch (err) {
                console.error("Error fetching profile", err);
                setError("Failed to load profile");
            }
        };
        fetchProfile();
    }, [userInfo]);

    const handleEditProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/edit-profile", {
                currentUsername: userInfo.username,
                newUsername: newUsername || userInfo.username,
                newPassword,
                newBio,
                newTwitter,
                newLinkedIn,
                newEmail,
                newProfilePicture,
            });
            setSuccessMessage("Saved");
            setIsEditing(false);
            if (newUsername) {
                setUserInfo({ ...userInfo, username: newUsername });
            }
        } catch (err) {
            console.error("Error updating profile", err);
           alert("Successfully profile saved");
           
        }
    };

    const handleDeleteProfile = async () => {
        try {
            const response = await axios.post("http://localhost:4000/delete-profile", {
                username: userInfo.username,
            });
            setDeleteMessage(response.data.message);
            setUserInfo(null);
            navigate("/");
        } catch (err) {
            console.error("Error deleting profile", err);
            setDeleteMessage("Failed to delete profile");
        }
    };

    const handleLogout = async () => {
        try {
            setUserInfo(null);
            navigate('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProfilePicture(reader.result); // Set the selected image as the new profile picture
            };
            reader.readAsDataURL(file);
        }
    };

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="profile-container">
            <h2 className="profile-heading">Profile</h2>
            {profile ? (
                <div className="profile-details">
                    {/* Profile Picture */}
                    <div className="profile-picture">
                        <label>Profile Picture:</label>
                        {/* Display profile picture (either the uploaded one or the existing one) */}
                        <div className="profile-picture-container">
                            <img 
                                src={newProfilePicture || profile.profilePicture || "/default-avatar.png"} 
                                alt="Profile" 
                                className="profile-img" 
                            />
                        </div>
                    </div>

                    {/* Upload New Profile Picture */}
                    <div className="upload-profile-picture">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleProfilePictureChange} 
                        />
                    </div>

                    {/* Bio */}
                    <div className="bio-section">
                        <label>Bio:</label>
                        <textarea
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)} // Allow editing of bio
                        />
                    </div>

                    {/* Social Media Links */}
                    <div className="social-media">
                        <label>Social Media Links:</label>
                        <input
                            type="url"
                            value={newTwitter}
                            onChange={(e) => setNewTwitter(e.target.value)} // Allow editing of Twitter URL
                            placeholder="Twitter URL"
                        />
                        <input
                            type="url"
                            value={newLinkedIn}
                            onChange={(e) => setNewLinkedIn(e.target.value)} // Allow editing of LinkedIn URL
                            placeholder="LinkedIn URL"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="email-section">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)} // Allow editing of email
                        />
                    </div>

                    {/* Username */}
                    <p><strong>Username:</strong> {profile.username}</p>

                    {/* Edit Profile Button */}
                    <button className="edit-profile-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    {isEditing && (
                        <div className="edit-profile-form">
                            <h3>Edit Profile</h3>
                            <form onSubmit={handleEditProfile}>
                                <div>
                                    <label>New Username:</label>
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        placeholder="Enter new username"
                                    />
                                </div>
                                <div>
                                    <label>New Password:</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <button type="submit">Save Changes</button>
                            </form>
                        </div>
                    )}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {deleteMessage && <p className="error-message">{deleteMessage}</p>}

                    {/* Save Profile Changes */}
                    <button className="save-profile-button" onClick={handleEditProfile}>Save Changes</button>

                    {/* Delete Profile and Logout Buttons */}
                    <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;
