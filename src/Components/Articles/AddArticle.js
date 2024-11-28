import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaFileUpload, FaCalendarAlt, FaTags, FaBook, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

const AddArticle = () => {
  const [article, setArticle] = useState({
    number: '',
    title: '',
    dateCreation: '',
    version: 'INITIAL',
    projetDeLoiId: '',
    typeProposition: 'PERSONNEL',
  });

  const [pieceJointe, setPieceJointe] = useState(null);
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch projects for dropdown
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:9090/projects')
      .then(response => setProjets(response.data))
      .catch(() => setError('خطأ في جلب قائمة المشاريع'))
      .finally(() => setLoading(false));
  }, []);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setPieceJointe(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    if (!article.number || !article.title || !article.dateCreation || !article.projetDeLoiId) {
      setError('يرجى تعبئة جميع الحقول المطلوبة.');
      return;
    }

    const formData = new FormData();
    formData.append('number', article.number);
    formData.append('title', article.title);
    formData.append('dateCreation', article.dateCreation);
    formData.append('typeProposition', article.typeProposition);
    formData.append('version', article.version);
    formData.append('projetDeLoiId', article.projetDeLoiId);

    if (pieceJointe) {
      formData.append('pieceJointe', pieceJointe);
    }

    axios.post('http://localhost:9090/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("Server response:", response.data);
      navigate('/articles');
    })
    .catch(error => {
      console.error('Submission error:', error.response || error.message);
      setError('فشل إضافة المقال. يرجى المحاولة مرة أخرى.');
    });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
     


      </div>
      <div className="card shadow-lg custom-card">
        <div className="card-header custom-card-header text-end">
          <h4 className="card-title">
            <FaPlus className="ms-2" />
            إضافة مقال
          </h4>
        </div>
        <div className="card-body text-end">
          {error && (
            <div className="alert alert-danger d-flex align-items-center">
              <FaExclamationTriangle className="ms-2" />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">رقم المقال:</label>
              <input 
                type="text" 
                className="form-control" 
                name="number"
                value={article.number} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">عنوان المقال:</label>
              <input 
                type="text" 
                className="form-control" 
                name="title"
                value={article.title} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">تاريخ الإنشاء:</label>
              <input 
                type="date" 
                className="form-control" 
                name="dateCreation"
                value={article.dateCreation} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">الإصدار:</label>
              <select 
                className="form-select" 
                name="version"
                value={article.version} 
                onChange={handleChange}
              >
                <option value="INITIAL">الأولي</option>
                <option value="FINAL_COMMISSION">اللجنة النهائية</option>
                <option value="ADOPTED">المعتمد</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">مشروع القانون:</label>
              <select 
                className="form-select" 
                name="projetDeLoiId" 
                value={article.projetDeLoiId} 
                onChange={handleChange}
              >
                <option value="">اختر مشروع القانون</option>
                {projets.map(projet => (
                  <option key={projet.id} value={projet.id}>{projet.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">نوع الاقتراح:</label>
              <select 
                className="form-select" 
                name="typeProposition" 
                value={article.typeProposition} 
                onChange={handleChange}
              >
                <option value="PERSONNEL">شخصي</option>
                <option value="GROUPE">مجموعة</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">إرفاق ملف:</label>
              <input 
                type="file" 
                className="form-control" 
                onChange={handleFileChange} 
              />
            </div>
            <button type="submit" className="btn custom-btn" disabled={loading}>
              {loading ? 'جاري الإضافة...' : 'إضافة المقال'}
              <FaPlus className="ms-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
