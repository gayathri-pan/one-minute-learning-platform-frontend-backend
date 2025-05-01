import React, { useEffect, useState } from 'react';
import ContentList from '../components/ContentList';
import api from '../utils/api';

const HomePage = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading]= useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/content');
                setContents(response.data);
            } catch(error) {
                console.error('Error fetching content: ', error);
            } finally{
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    return (
        <div>
          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Available Courses</h2>
          {loading ? <p style={{ textAlign: 'center' }}>Loading ...</p> : <ContentList contents={contents} />}
        </div>
      );
};

export default HomePage;