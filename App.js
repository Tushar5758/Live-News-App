import React, { useState, useEffect } from 'react';
import News from './News';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const apiKey = 'cae04a1b72f04ba5ad379eb7690546d3'; // Replace with your actual API key
    let apiUrl;

    if (category === '') {
      // Show top headlines if no search term
      apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
    } else {
      // Show search-related news
      apiUrl = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((news) => {
        setArticles(news.articles || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [category]);

  return (
    <div>
      <header className='head'>
        <h1>India News</h1>
        <input
          type='text'
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          placeholder='Search News'
        ></input>
      </header>
      <section className='news-div'>
        {articles.length !== 0 ? (
          articles.map((article, index) => {
            return <News key={index} article={article} />;
          })
        ) : (
          <h3>No News Found</h3>
        )}
      </section>
    </div>
  );
}

export default App;
