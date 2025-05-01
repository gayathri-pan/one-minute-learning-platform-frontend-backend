import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { getUser } from '../auth';
import { FaBook, FaVideo, FaQuestionCircle } from 'react-icons/fa';

const CompletedCourses = () => {
    const [completedCourses, setCompletedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedCourses = async () => {
            const user = getUser();
            if (!user) {
                setError('User not found');
                setLoading(false);
                return;
            }
            try {
                const response = await api.get(`/content/completed/${user.id}`);
                setCompletedCourses(response.data);
            } catch (err) {
                console.error('Failed to fetch completed courses:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCompletedCourses();
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'text':
                return <FaBook style={{ color: '#6c63ff', marginRight: '0.5rem' }} />;
            case 'video':
                return <FaVideo style={{ color: '#ff6347', marginRight: '0.5rem' }} />;
            case 'quiz':
                return <FaQuestionCircle style={{ color: '#28a745', marginRight: '0.5rem' }} />;
            default:
                return null;
        }
    };

    const getBorderColor = (type) => {
        switch (type) {
            case 'text':
                return '#6c63ff';
            case 'video':
                return '#ff6347';
            case 'quiz':
                return '#28a745';
            default:
                return '#ccc';
        }
    };

    const renderContent = (course) => {
        switch (course.type) {
            case 'text':
                return <p style={styles.description}>{course.contentText}</p>;
            case 'video':
                return (
                    <a
                        href={course.videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                    >
                        Watch Video
                    </a>
                );
            case 'quiz':
                return (
                    <p style={styles.description}>
                        Completed a quiz with {course.quizQuestions.length} questions
                    </p>
                );
            default:
                return null;
        }
    };

    if (loading) return <div style={styles.loader}>Loading...</div>;

    return (
        <div style={styles.container}>
            {completedCourses.length === 0 ? (
                <p style={styles.message}>You haven't completed any content yet.</p>
            ) : (
                <div style={styles.cardGrid}>
                    {completedCourses.map((course) => (
                        <div
                            key={course._id}
                            style={{
                                ...styles.card,
                                borderLeft: `6px solid ${getBorderColor(course.type)}`,
                            }}
                        >
                            <h3 style={styles.title}>
                                {getIcon(course.type)}
                                {course.title}
                            </h3>
                            {renderContent(course)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1100px',
        margin: 'auto',
    },
    message: {
        fontSize: '1rem',
        color: '#666',
        textAlign: 'center',
        marginTop: '1.5rem',
    },
    loader: {
        textAlign: 'center',
        fontSize: '1.2rem',
        marginTop: '2rem',
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        alignItems: 'stretch',
    },
    card: {
        padding: '1.2rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100px',
    },
    title: {
        fontSize: '1.1rem',
        marginBottom: '0.6rem',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
    },
    description: {
        fontSize: '0.95rem',
        color: '#555',
        lineHeight: '1.4',
        wordWrap: 'break-word',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: '500',
        marginTop: '0.3rem',
        display: 'inline-block',
    },
};

export default CompletedCourses;
