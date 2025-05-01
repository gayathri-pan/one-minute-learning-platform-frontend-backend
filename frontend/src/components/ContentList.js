import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { getUser } from '../auth';

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolledContent, setEnrolledContent] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    completed: false,
  });

  const user = getUser();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/content');
        setContentList(response.data);
      } catch (err) {
        console.error('Failed to fetch content:', err);
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleEnroll = async (contentId) => {
    try {
      const response = await api.post(`/content/enroll/${user.id}/${contentId}`);
      //setEnrolledContent((prev) => [...prev, contentId]);
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Enrollment failed:', error.response?.data || error.message);
      alert(`Failed to enroll: ${error.response?.data?.message || 'Unknown error. Kindly Log In!'}`);
    }
  };

  const completeNonQuizContent = async (content) => {
    try {
      await api.post(`/content/complete/${user.id}/${content._id}`, {
        xpEarned: content.xpReward || 0,
      });
      alert(`Marked as completed! You earned ${content.xpReward || 0} XP.`);
    } catch (err) {
      console.error('Failed to mark content as completed:', err);
      alert('Error completing the content.');
    }
  };

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setQuizState({
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      completed: false,
    });
  };

  const handleAnswer = (answer) => {
    const currentQ = activeQuiz.quizQuestions[quizState.currentQuestionIndex];
    const isCorrect = currentQ.correctAnswer === answer;
    const nextIndex = quizState.currentQuestionIndex + 1;

    setQuizState((prev) => ({
      currentQuestionIndex: nextIndex,
      userAnswers: [...prev.userAnswers, answer],
      score: prev.score + (isCorrect ? 1 : 0),
      completed: nextIndex === activeQuiz.quizQuestions.length,
    }));
  };

  const completeQuiz = async () => {
    const earnedXP = (activeQuiz.xpReward || 0) * (quizState.score / activeQuiz.quizQuestions.length);
    try {
      await api.post(`/content/complete/${user.id}/${activeQuiz._id}`, {
        xpEarned: earnedXP,
      });
      alert(`Quiz completed! You scored ${quizState.score} and earned ${earnedXP} XP.`);
      setActiveQuiz(null);
    } catch (err) {
      console.error('Failed to mark as completed:', err);
      alert('Error completing the quiz.');
    }
  };

  const renderQuiz = () => {
    const { currentQuestionIndex } = quizState;
    const currentQ = activeQuiz.quizQuestions[currentQuestionIndex];

    if (quizState.completed) {
      return (
        <div style={styles.quizBox}>
          <p>Quiz Completed!</p>
          <p>
            Score: {quizState.score}/{activeQuiz.quizQuestions.length}
          </p>
          <button onClick={completeQuiz} style={styles.button}>
            Mark as Completed
          </button>
        </div>
      );
    }

    return (
      <div style={styles.quizBox}>
        <h4>Question {currentQuestionIndex + 1}</h4>
        <p>{currentQ.question}</p>
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            style={{ ...styles.button, margin: '5px 0' }}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };

  const renderContentItem = (item) => {
    if (item.type === 'quiz') {
      return (
        <>
          <p>Quiz with {item.quizQuestions?.length || 0} questions</p>
          <div style={styles.actions}>
            {enrolledContent.includes(item._id) ? (
              <button onClick={() => startQuiz(item)} style={styles.button}>
                Start Quiz
              </button>
            ) : (
              <button onClick={() => handleEnroll(item._id)} style={styles.button}>
                Enroll
              </button>
            )}
          </div>
        </>
      );
    }

    if (item.type === 'text') {
      return (
        <>
          <p>{item.contentText}</p>
          <div style={styles.actions}>
            {enrolledContent.includes(item._id) ? (
              <button onClick={() => completeNonQuizContent(item)} style={styles.button}>
                Mark as Completed
              </button>
            ) : (
              <button onClick={() => handleEnroll(item._id)} style={styles.button}>
                Enroll
              </button>
            )}
          </div>
        </>
      );
    }

    if (item.type === 'video') {
      return (
        <>
          <a href={item.videoURL} target="_blank" rel="noopener noreferrer" style={styles.link}>
            Watch Video
          </a>
          <div style={styles.actions}>
            {enrolledContent.includes(item._id) ? (
              <button onClick={() => completeNonQuizContent(item)} style={styles.button}>
                Mark as Completed
              </button>
            ) : (
              <button onClick={() => handleEnroll(item._id)} style={styles.button}>
                Enroll
              </button>
            )}
          </div>
        </>
      );
    }

    return <p>Unknown content type</p>;
  };

  if (loading) return <p style={styles.center}>Loading content...</p>;
  if (error) return <p style={styles.center}>{error}</p>;

  if (activeQuiz) return renderQuiz();

  return (
    <div style={styles.container}>
      {contentList.length === 0 ? (
        <p>No content available.</p>
      ) : (
        contentList.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3>{item.title}</h3>
            {renderContentItem(item)}
            <p>
              <strong>Time Required:</strong> {item.timeRequired} minutes
            </p>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: 'auto',
  },
  card: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1rem',
    backgroundColor: '#fefefe',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
  },
  quizBox: {
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    textAlign: 'center',
  },
};

export default ContentList;
