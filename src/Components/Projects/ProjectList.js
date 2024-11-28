import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaTrashAlt, FaPlus } from 'react-icons/fa'; // استيراد الأيقونات

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    // تحميل المشاريع عند التهيئة
    useEffect(() => {
        fetchProjects();
    }, []);

    // وظيفة لجلب المشاريع
    const fetchProjects = () => {
        axios.get('http://localhost:9090/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("حدث خطأ أثناء جلب المشاريع!", error);
            });
    };

    // وظيفة لحذف مشروع
    const handleDelete = (projectId) => {
        axios.delete(`http://localhost:9090/projects/${projectId}`)
            .then(() => {
                // تحديث قائمة المشاريع بعد الحذف
                setProjects(projects.filter(project => project.id !== projectId));
            })
            .catch(error => {
                console.error("حدث خطأ أثناء حذف المشروع!", error);
            });
    };

    // وظيفة لفتح مرفق
    const openAttachment = (base64String) => {
        try {
            // فك تشفير النص المشفر بـ Base64
            const decodedData = atob(base64String);
            const byteNumbers = new Array(decodedData.length);
            for (let i = 0; i < decodedData.length; i++) {
                byteNumbers[i] = decodedData.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            // فتح الملف في نافذة جديدة
            window.open(url, '_blank');
        } catch (error) {
            console.error('فشل في فك تشفير النص المشفر بـ Base64:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {projects.map(project => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={project.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{project.title}</h5>
                                <p className="card-text">رقم المشروع: {project.numeroProjet}</p>
                                <p className="card-text">نوع الاقتراح: {project.typeDePropositionLegislative}</p>
                                <p className="card-text">تاريخ الانتهاء: {project.dateExpiration}</p>
                                
                                {/* عرض وإدارة المرفقات */}
                                <div>
                                    {project.versionInitiale?.pieceJointe && (
                                        <button
                                            onClick={() => openAttachment(project.versionInitiale.pieceJointe)}
                                            className="btn btn-info mr-2"
                                        >
                                            <FaFilePdf className="mr-2" />
                                            المرفق - النسخة الأولية
                                        </button>
                                    )}
                                    {project.versionCommission?.pieceJointe && (
                                        <button
                                            onClick={() => openAttachment(project.versionCommission.pieceJointe)}
                                            className="btn btn-info"
                                        >
                                            <FaFilePdf className="mr-2" />
                                            المرفق - نسخة اللجنة
                                        </button>
                                    )}
                                </div>
                                
                                <button 
                                    onClick={() => handleDelete(project.id)} 
                                    className="btn btn-danger mt-2"
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
                <Link to="/projects/add" className="btn btn-success">
                    <FaPlus className="mr-2" />
                    إضافة مشروع
                </Link>
            </div>
        </div>
    );
};

export default ProjectList;
