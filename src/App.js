import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]);
    } catch (error) {
      console.error('Error fetching the quote', error);
    }
  };

  const saveQuote = () => {
    setSavedQuotes([...savedQuotes, quote]);
  };

  const removeQuote = (index) => {
    setSavedQuotes(savedQuotes.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <div className="quote-card">
        <p>{quote}</p>
        <button onClick={fetchQuote}>Get New Quote</button>
        <button onClick={saveQuote}>Save Quote</button>
      </div>
      <div className="saved-quotes">
        <h2>Saved Quotes</h2>
        {savedQuotes.map((q, index) => (
          <div key={index} className="quote-card">
            <p>{q}</p>
            <button className="remove-button" onClick={() => removeQuote(index)}>✖</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
