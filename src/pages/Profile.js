import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        location: "",
        altMobile: "",
        hintName: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setFormData({
                name: storedUser.name || "",
                email: storedUser.email || "",
                mobile: storedUser.mobile || "",
                gender: storedUser.gender || "",
                dob: storedUser.dob || "",
                location: storedUser.location || "",
                altMobile: storedUser.altMobile || "",
                hintName: storedUser.hintName || ""
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        toast.success("Profile Details Updated successfully!");
    };

    const comingSoon = (feature) => {
        toast(feature + " functionality is coming soon!", { icon: "🚧" });
    };

    return (
        <div className="profile-page-container">
            <div className="profile-layout">

                {/* Sidebar */}
                <aside className="profile-sidebar">
                    <div className="sidebar-header">
                        <h3>Account</h3>
                        <p>{user ? user.name : "Guest User"}</p>
                    </div>

                    <div className="sidebar-section" style={{ paddingBottom: '0', borderBottom: 'none' }}>
                        <span className="section-title" style={{ color: '#282c3f', fontSize: '15px', textTransform: 'capitalize' }}>Overview</span>
                    </div>

                    <div className="sidebar-section">
                        <span className="section-title">ORDERS</span>
                        <ul className="section-list">
                            <li className="sidebar-item" onClick={() => navigate('/orders')}>Orders & Returns</li>
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <span className="section-title">CREDITS</span>
                        <ul className="section-list">
                            <li className="sidebar-item" onClick={() => comingSoon('Coupons')}>Coupons</li>
                            <li className="sidebar-item" onClick={() => comingSoon('Zen Credit')}>Zen Credit</li>
                            <li className="sidebar-item" onClick={() => comingSoon('ZenCash')}>ZenCash</li>
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <span className="section-title">ACCOUNT</span>
                        <ul className="section-list">
                            <li className="sidebar-item active-item" onClick={() => navigate('/profile')}>Profile</li>
                            <li className="sidebar-item" onClick={() => comingSoon('Saved Cards')}>Saved Cards</li>
                            <li className="sidebar-item" onClick={() => comingSoon('Saved UPI')}>Saved UPI</li>
                            <li className="sidebar-item" onClick={() => comingSoon('Saved Wallets/BNPL')}>Saved Wallets/BNPL</li>
                            <li className="sidebar-item" onClick={() => comingSoon('Addresses')}>Addresses</li>
                            <li className="sidebar-item" onClick={() => comingSoon('Zen Insider')}>Zen Insider</li>
                            <li className="sidebar-item" style={{ color: '#ff3f6c' }} onClick={() => {
                                localStorage.removeItem('user');
                                navigate('/login');
                            }}>Log Out / Delete Account</li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="profile-main-content">
                    <div className="profile-details-card">
                        <h2 className="profile-card-title">Profile Details</h2>
                        <hr className="profile-divider" />

                        <div className="profile-info-grid">
                            <div className="info-row">
                                <span className="info-label">Full Name</span>
                                {isEditing ? (
                                    <input className="profile-edit-input" type="text" name="name" value={formData.name} onChange={handleChange} />
                                ) : (
                                    <span className="info-value">{user && user.name ? user.name : "- not added -"}</span>
                                )}
                            </div>
                            <div className="info-row">
                                <span className="info-label">Mobile Number</span>
                                {isEditing ? (
                                    <input className="profile-edit-input" type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                                ) : (
                                    <span className="info-value">{user && user.mobile ? user.mobile : "- not added -"}</span>
                                )}
                            </div>
                            <div className="info-row">
                                <span className="info-label">Email ID</span>
                                {isEditing ? (
                                    <input className="profile-edit-input" type="email" name="email" value={formData.email} onChange={handleChange} />
                                ) : (
                                    <span className="info-value">{user && user.email ? user.email : "- not added -"}</span>
                                )}
                            </div>
                            <div className="info-row">
                                <span className="info-label">Gender</span>
                                {isEditing ? (
                                    <select className="profile-edit-input" name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <span className="info-value">{user && user.gender ? user.gender : "- not added -"}</span>
                                )}
                            </div>
                            <div className="info-row">
                                <span className="info-label">Date of Birth</span>
                                {isEditing ? (
                                    <input className="profile-edit-input" type="date" name="dob" value={formData.dob} onChange={handleChange} />
                                ) : (
                                    <span className="info-value">{user && user.dob ? user.dob : "- not added -"}</span>
                                )}
                            </div>
                            <div className="info-row">
                                <span className="info-label">Location</span>
                                {isEditing ? (
                                    <input className="profile-edit-input" type="text" name="location" value={formData.location} onChange={handleChange} />
                                ) : (
                                    <span className="info-value">{user && user.location ? user.location : "- not added -"}</span>
                                )}
                            </div>
                            <div className="info-row">
                                <span className="info-label">Alternate Mobile</span>
                                {isEditing ? (
                                    <input className="profile-edit-input" type="text" name="altMobile" value={formData.altMobile} onChange={handleChange} />
                                ) : (
                                    <span className="info-value">{user && user.altMobile ? user.altMobile : "- not added -"}</span>
                                )}
                            </div>
                            <div className="info-row">
                                <span className="info-label">Hint Name</span>
                                {isEditing ? (
                                    <input className="profile-edit-input" type="text" name="hintName" value={formData.hintName} onChange={handleChange} />
                                ) : (
                                    <span className="info-value">{user && user.hintName ? user.hintName : "- not added -"}</span>
                                )}
                            </div>
                        </div>

                        {isEditing ? (
                            <div className="profile-edit-action-btns">
                                <button className="profile-edit-btn save-btn" onClick={handleSave} style={{ backgroundColor: '#14958f' }}>SAVE</button>
                                <button className="profile-edit-btn cancel-btn" onClick={() => setIsEditing(false)} style={{ backgroundColor: '#777', marginTop: '10px' }}>CANCEL</button>
                            </div>
                        ) : (
                            <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>EDIT</button>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Profile;
