import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Axios instance
import { getUser } from '../auth'; // A helper to get the user data from localStorage

const OngoingCourses = () => {
    const [ongoingCourses, setOngoingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOngoingCourses = async () => {
            const user = getUser();
            if (!user) {
                setError('User not found');
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/content/ongoing/${user.id}`);
                setOngoingCourses(response.data);
            } catch (err) {
                setError('Error fetching ongoing courses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOngoingCourses();
    }, []);

    const handleComplete = async (contentId) => {
        const user = getUser();
        try {
            await api.post(`/content/complete/${user.id}/${contentId}`);
            setOngoingCourses(prev => prev.filter(course => course._id !== contentId));
            alert('Course marked as completed!');
        } catch (err) {
            console.error('Failed to complete course:', err);
            alert('Failed to mark course as completed.');
        }
    };

    const renderCourseDetails = (course) => {
        switch (course.type) {
            case 'text':
                return <p>{course.contentText}</p>;
            case 'video':
                return (
                    <div>
                        <a href={course.videoURL} target="_blank" rel="noopener noreferrer">
                            Watch Video
                        </a>
                    </div>
                );
            case 'quiz':
                return (
                    <div>
                        <p><strong>Quiz:</strong> {course.quizQuestions.length} questions</p>
                        <button
                            style={styles.quizButton}
                            onClick={() => navigate(`/quiz/${course._id}`)}
                        >
                            Start Quiz
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                {ongoingCourses.length > 0 ? (
                    ongoingCourses.map(course => (
                        <div key={course._id} style={styles.card}>
                            <h3>{course.title}</h3>
                            {renderCourseDetails(course)}
                            <p><strong>Duration:</strong> {course.timeRequired} mins</p>
                            <button onClick={() => handleComplete(course._id)} style={styles.button}>
                                Mark as Completed
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No ongoing courses found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '960px',
        margin: 'auto',
    },
    heading: {
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: '600',
        marginBottom: '2rem',
    },
    card: {
        borderLeft: '6px solid #17a2b8',
        padding: '1.2rem',
        marginBottom: '1.2rem',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    button: {
        marginTop: '1rem',
        padding: '0.6rem 1.2rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'background-color 0.2s',
    },
    quizButton: {
        marginTop: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default OngoingCourses;
