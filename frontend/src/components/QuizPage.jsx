import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const QuizPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await api.get(`/content/${id}`);
                setQuiz(response.data);
            } catch (err) {
                console.error('Error fetching quiz:', err);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleOptionChange = (questionIndex, selectedOption) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    const handleSubmit = () => {
        if (!quiz || !quiz.quizQuestions) return;

        let correct = 0;
        quiz.quizQuestions.forEach((q, i) => {
            if (userAnswers[i] === q.correctAnswer) {
                correct++;
            }
        });

        setResult({
            score: correct,
            total: quiz.quizQuestions.length
        });
    };

    if (!quiz) return <p>Loading quiz...</p>;

    return (
        <div style={styles.container}>
            <h2>{quiz.title}</h2>
            {quiz.quizQuestions.map((q, i) => (
                <div key={i} style={styles.questionCard}>
                    <p><strong>{i + 1}. {q.question}</strong></p>
                    {q.options.map((opt, idx) => (
                        <label key={idx} style={styles.option}>
                            <input
                                type="radio"
                                name={`question-${i}`}
                                value={opt}
                                checked={userAnswers[i] === opt}
                                onChange={() => handleOptionChange(i, opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit} style={styles.button}>Submit</button>

            {result && (
                <div style={styles.result}>
                    <p>You scored {result.score} out of {result.total}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '2rem',
    },
    questionCard: {
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    option: {
        display: 'block',
        marginBottom: '0.5rem',
        fontSize: '16px',
    },
    button: {
        marginTop: '1rem',
        padding: '0.6rem 1.2rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    result: {
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#e2f0cb',
        borderRadius: '6px',
    },
};

export default QuizPage;
