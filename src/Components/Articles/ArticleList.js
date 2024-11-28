import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaTrashAlt, FaPlus } from 'react-icons/fa'; // استيراد الأيقونات

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // حالة لنص البحث

    useEffect(() => {
        fetchArticles();
    }, []);

    // وظيفة لجلب المقالات
    const fetchArticles = () => {
        axios.get('http://localhost:9090/articles')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error("حدث خطأ أثناء جلب المقالات!", error);
            });
    };

    // وظيفة لحذف مقال
    const handleDelete = (articleId) => {
        axios.delete(`http://localhost:9090/articles/${articleId}`)
            .then(() => {
                setArticles(articles.filter(article => article.id !== articleId));
            })
            .catch(error => {
                console.error("حدث خطأ أثناء حذف المقال!", error);
            });
    };

    // وظيفة لفتح المرفق
    const openAttachment = (base64String) => {
        try {
            const decodedData = atob(base64String);
            const byteNumbers = new Array(decodedData.length);
            for (let i = 0; i < decodedData.length; i++) {
                byteNumbers[i] = decodedData.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            window.open(url, '_blank');
        } catch (error) {
            console.error('فشل فك تشفير سلسلة Base64:', error);
        }
    };

    // وظيفة لتغيير نص البحث
    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
    };

    // تصفية المقالات بناءً على نص البحث
    const filteredArticles = articles.filter(article =>
        article.projetDeLoi && 
        article.projetDeLoi.title.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="searchInput">البحث حسب مشروع القانون:</label>
                    <input
                        type="text"
                        id="searchInput"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="أدخل عنوان مشروع القانون..."
                    />
                </div>
            </div>

            <div className="row">
                {filteredArticles.map(article => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={article.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">الرقم: {article.number}</p>
                                <p className="card-text">نوع الاقتراح: {article.typeProposition}</p> {/* عرض نوع الاقتراح */}
                                <p className="card-text">
                                    مشروع القانون: {article.projetDeLoi ? article.projetDeLoi.title : 'غير مرتبط'}
                                </p>
                                
                                {/* عرض وإدارة المرفقات */}
                                {article.pieceJointe && (
                                    <button
                                        onClick={() => openAttachment(article.pieceJointe)}
                                        className="btn btn-info mr-2"
                                    >
                                        <FaFilePdf className="mr-2" />
                                        عرض المرفق
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className="btn btn-danger"
                                >
                                    <FaTrashAlt className="mr-2" />
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <Link to="/articles/add" className="btn btn-success">
                    <FaPlus className="mr-2" />
                    إضافة مقال
                </Link>
            </div>
        </div>
    );
};

export default ArticleList;
