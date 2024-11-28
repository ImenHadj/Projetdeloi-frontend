import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import ProjectList from './Components/Projects/ProjectList';
import ProjectDetail from './Components/Projects/ProjectDetail';
import AddProject from './Components/Projects/AddProject';
import EditProject from './Components/Projects/EditProject';
import ArticleList from './Components/Articles/ArticleList';
import ArticleDetail from './Components/Articles/ArticleDetail';
import AddArticle from './Components/Articles/AddArticle';
import EditArticle from './Components/Articles/EditArticle';
import MainLayout from './Components/MainLayout';

// Composant pour protéger les routes privées
const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    setIsAuthenticated(true);
  };

  const handleLoginFailure = () => {
    console.log('Login failed');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Route pour le login */}
        <Route 
          path="/login" 
          element={<Login onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />} 
        />

        {/* Routes protégées avec MainLayout */}
        <Route element={<MainLayout />}>
          <Route 
            path="/projects" 
            element={<PrivateRoute element={ProjectList} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/projects/add" 
            element={<PrivateRoute element={AddProject} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/projects/edit/:id" 
            element={<PrivateRoute element={EditProject} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/projects/:projectId" 
            element={<PrivateRoute element={ProjectDetail} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/projects/:projectId/articles" 
            element={<PrivateRoute element={ArticleList} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/projects/:projectId/articles/add" 
            element={<PrivateRoute element={AddArticle} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/projects/:projectId/articles/edit/:articleId" 
            element={<PrivateRoute element={EditArticle} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/projects/:projectId/articles/:articleId" 
            element={<PrivateRoute element={ArticleDetail} isAuthenticated={isAuthenticated} />} 
          />
          {/* Routes pour les articles */}
          <Route 
            path="/articles" 
            element={<PrivateRoute element={ArticleList} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/articles/add" 
            element={<PrivateRoute element={AddArticle} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/articles/edit/:articleId" 
            element={<PrivateRoute element={EditArticle} isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/articles/:articleId" 
            element={<PrivateRoute element={ArticleDetail} isAuthenticated={isAuthenticated} />} 
          />
        </Route>

        {/* Redirection par défaut vers la page de login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
