import React, { useState, useEffect } from 'react';
import './Settings.css';
import { useAuth } from '../components/AuthContext';

const Settings = () => {
    const { user, updateUser, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Profile State
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || ''
    });

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || ''
            });
        }
    }, [user]);

    // Password State
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const tabs = [
        { id: 'profile', label: 'Profile', icon: 'bi-person' },
        { id: 'preferences', label: 'Preferences', icon: 'bi-sliders' },
        { id: 'security', label: 'Security', icon: 'bi-shield-lock' },
    ];

    // Handlers
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            await updateUser({
                name: profile.name,
                email: profile.email,
                bio: profile.bio
            });
            alert("Success! Your profile has been updated.");
        } catch (error) {
            alert("Failed to update profile: " + (error.response?.data?.detail || error.message));
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("Error: New passwords do not match.");
            return;
        }
        if (passwords.new.length < 6) {
            alert("Error: Password must be at least 6 characters.");
            return;
        }
        // Simulate API call
        alert("Success! Your password has been changed.");
        setIsChangingPassword(false);
        setPasswords({ current: '', new: '', confirm: '' });
    };

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("CRITICAL WARNING: This will permanently delete your account and all portfolio data.\n\nAre you absolutely sure?");
        if (confirmDelete) {
            const finalConfirm = window.prompt("Type 'DELETE' to confirm account deletion:");
            if (finalConfirm === 'DELETE') {
                alert("Account deleted. Redirecting to home...");
                window.location.href = "/";
            }
        }
    };

    return (
        <div className="settings-page">
            <h1 className="settings-title">Settings</h1>

            <div className="settings-container">
                <div className="settings-sidebar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <i className={`bi ${tab.icon}`}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-section fade-in">
                            <h2 className="section-header">Public Profile</h2>
                            <div className="profile-header">
                                <div className="profile-avatar-large">
                                    <span>{profile.name.charAt(0)}</span>
                                </div>
                                <div className="profile-info-edit">
                                    <h3>{profile.name}</h3>
                                    <p>Pro Trader</p>
                                </div>
                                <button className="btn-secondary" onClick={() => alert('Avatar upload feature coming soon!')}>Change Avatar</button>
                            </div>

                            <form className="settings-form" onSubmit={handleSaveProfile}>
                                <div className="form-group">
                                    <label>Display Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                    />
                                    <span className="input-hint">You can now update your email address.</span>
                                </div>
                                <div className="form-group">
                                    <label>Bio</label>
                                    <textarea
                                        rows="3"
                                        name="bio"
                                        value={profile.bio}
                                        onChange={handleProfileChange}
                                    ></textarea>
                                </div>
                                <button className="btn-primary" type="submit">Save Changes</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="settings-section fade-in">
                            <h2 className="section-header">App Preferences</h2>
                            {/* Static toggles for visual demo */}
                            <div className="preference-item">
                                <div className="pref-info">
                                    <h4>Dark Mode</h4>
                                    <p>Use dark theme for the application interface</p>
                                </div>
                                <div className="toggle-switch checked" onClick={(e) => e.target.classList.toggle('checked')}></div>
                            </div>
                            <div className="preference-item">
                                <div className="pref-info">
                                    <h4>Market Notifications</h4>
                                    <p>Get alerts when market opens/closes</p>
                                </div>
                                <div className="toggle-switch checked" onClick={(e) => e.target.classList.toggle('checked')}></div>
                            </div>
                            <div className="preference-item">
                                <div className="pref-info">
                                    <h4>Price Alerts</h4>
                                    <p>Receive push notifications for price targets</p>
                                </div>
                                <div className="toggle-switch" onClick={(e) => e.target.classList.toggle('checked')}></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section fade-in">
                            <h2 className="section-header">Security</h2>

                            {!isChangingPassword ? (
                                <>
                                    <button className="btn-outline" onClick={() => setIsChangingPassword(true)}>Change Password</button>
                                </>
                            ) : (
                                <form className="settings-form password-form" onSubmit={handleSubmitPassword}>
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} required />
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn-primary" type="submit">Update Password</button>
                                        <button className="btn-secondary" type="button" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                                    </div>
                                </form>
                            )}

                            <hr className="divider" />
                            <div className="danger-zone">
                                <h4>Danger Zone</h4>
                                <p>Once you delete your account, there is no going back. Please be certain.</p>
                                <button className="btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
