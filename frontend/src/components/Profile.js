import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { getUser } from '../auth';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const user = getUser();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/user/profile');
                console.log('Profile data:', res.data);
                setProfile(res.data);
            } catch (error) {
                console.error('Error loading profile', error);
            }
        };

        const updateXP = async () => {
            try {
                // If you want XP to increase automatically, update it here
                const xpEarned = 10;  // For example, you can increase it by a fixed value or some dynamic logic
                const res = await api.patch('/user/xp', { xpEarned });
                console.log('XP and badges updated:', res.data);
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    xp: res.data.xp,
                    badges: res.data.badges
                }));
            } catch (error) {
                console.error('Error updating XP:', error);
            }
        };

        // Automatically trigger update on profile load or when component mounts
        fetchProfile();
        updateXP();  // Update XP and badges automatically

    }, []);

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{user.username}'s Profile</h2>
            <div style={styles.card}>
                <p><strong>XP:</strong> {profile.xp}</p>
                <p>
                    <strong>Badges:</strong>{' '}
                    {profile.badges.length > 0 ? profile.badges.join(', ') : 'None'}
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '500px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px'
    },
    card: {
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        border: '1px solid #ddd'
    }
};

export default Profile;
