import React, { useState } from 'react';
import api from '../utils/api';

const AddContent = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'text',
    contentText: '',
    videoURL: '',
    quizQuestions: [],
    timeRequired: '',
    xpReward: 0, // New field added
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addQuizQuestion = () => {
    setFormData({
      ...formData,
      quizQuestions: [...formData.quizQuestions, newQuestion]
    });
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/content', formData);
      alert('Content added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add content');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Learning Content</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <select name="type" value={formData.type} onChange={handleChange} style={styles.input}>
        <option value="text">Text</option>
        <option value="video">Video</option>
        <option value="quiz">Quiz</option>
      </select>

      {formData.type === 'text' && (
        <textarea
          name="contentText"
          placeholder="Enter blog or text content"
          value={formData.contentText}
          onChange={handleChange}
          style={styles.textarea}
        />
      )}

      {formData.type === 'video' && (
        <input
          type="text"
          name="videoURL"
          placeholder="Video URL"
          value={formData.videoURL}
          onChange={handleChange}
          style={styles.input}
        />
      )}

      {formData.type === 'quiz' && (
        <div>
          <input
            type="text"
            placeholder="Question"
            value={newQuestion.question}
            onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })}
            style={styles.input}
          />
          {newQuestion.options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={e => handleOptionChange(idx, e.target.value)}
              style={styles.input}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={newQuestion.correctAnswer}
            onChange={e => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
            style={styles.input}
          />
          <button type="button" onClick={addQuizQuestion} style={styles.button}>
            Add Question
          </button>

          <ul>
            {formData.quizQuestions.map((q, i) => (
              <li key={i}>{q.question}</li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="number"
        name="timeRequired"
        placeholder="Time Required (minutes)"
        value={formData.timeRequired}
        onChange={handleChange}
        required
        style={styles.input}
      />

      {formData.type === 'quiz' && (
        <input
          type="number"
          name="xpReward"
          placeholder="XP Reward"
          value={formData.xpReward}
          onChange={handleChange}
          required
          style={styles.input}
        />
      )}

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '50px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    height: '100px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default AddContent;
