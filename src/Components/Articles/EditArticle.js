// src/Components/Articles/EditArticle.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
  const [article, setArticle] = useState({
    number: '',
    title: '',
    text: '',
    version: 'VERSION_COMM'
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the article ID from the URL

  useEffect(() => {
    // Fetch the article details when the component mounts
    axios.get(`http://localhost:9090/articles/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the article!', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:9090/articles/${id}`, article)
      .then(response => {
        navigate('/articles');  // Redirect to the articles list or detail page
      })
      .catch(error => {
        console.error('There was an error updating the article!', error);
      });
  };

  return (
    <div>
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Number:</label>
          <input type="text" name="number" value={article.number} onChange={handleChange} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={article.title} onChange={handleChange} />
        </div>
        <div>
          <label>Text:</label>
          <textarea name="text" value={article.text} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Version:</label>
          <select name="version" value={article.version} onChange={handleChange}>
            <option value="VERSION_INIT">Initial</option>
            <option value="VERSION_COMM">Commission</option>
            <option value="VERSION_PLEN">Plenary</option>
          </select>
        </div>
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
};

export default EditArticle;
