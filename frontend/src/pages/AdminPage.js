// src/pages/AdminPage.js
import React from 'react';
import AddContent from '../components/AddContent';

const AdminPage = () => {
  return (
    <div style={styles.container}>
      <h1>Admin Panel</h1>
      <AddContent />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
};

export default AdminPage;
