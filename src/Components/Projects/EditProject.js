// src/Components/Projects/EditProject.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProject = () => {
  const [project, setProject] = useState({ title: '', status: '', version: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9090/projects/${id}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the project!', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:9090/projects/${id}`, project)
      .then(response => {
        navigate(`/projects/${id}`);
      })
      .catch(error => {
        console.error('There was an error updating the project!', error);
      });
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={project.title} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={project.status} onChange={handleChange} />
        </div>
        <div>
          <label>Version:</label>
          <input type="text" name="version" value={project.version} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProject;
