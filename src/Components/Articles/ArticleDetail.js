import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ArticleDetail = () => {
  const { projectId, articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!projectId || !articleId) {
          throw new Error('Project ID or Article ID is missing');
        }
        const response = await fetch(`http://localhost:9090/articles/${articleId}`);
        setArticle(response.data);
      } catch (error) {
        setError('There was an error fetching the article!');
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [projectId, articleId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>No article found</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>Article Number: {article.number}</p>
      <p>Text: {article.text}</p>
      <p>Date of Creation: {new Date(article.dateCreation).toLocaleDateString()}</p>
      <p>Type of Proposition: {article.typeProposition}</p>
      <p>Version: {article.version}</p>

      <Link to={`/projects/${projectId}/articles/edit/${article.id}`}>Edit Article</Link>
    </div>
  );
};

export default ArticleDetail;
