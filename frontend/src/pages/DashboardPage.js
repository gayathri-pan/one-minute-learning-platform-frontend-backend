import React from 'react';
import Profile from '../components/Profile';
import OngoingCourses from '../components/OngoingCourses';
import CompletedCourses from '../components/CompletedCourses';

const DashboardPage = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Your Dashboard</h2>
            <div style={styles.section}>
                <Profile/>
            </div>
            <div style={styles.split}>
                <div style={styles.column}>
                    <h3>Ongoing Courses</h3>
                    <OngoingCourses/>
                </div>
                <div style={styles.column}>
                    <h3>Completed Courses</h3>
                    <CompletedCourses/>
                </div>

            </div>

        </div>
    );
};


const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '28px'
    },
    section: {
      marginBottom: '2rem'
    },
    split: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    column: {
      flex: '1 1 45%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
  };
  
  export default DashboardPage;