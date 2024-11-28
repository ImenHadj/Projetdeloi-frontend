import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        numeroProjet: '',
        typeDePropositionLegislative: '',
        versionInitiale: { version: '', pieceJointe: null },
        versionCommission: { version: '', pieceJointe: null },
        dateExpiration: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleVersionChange = (event, versionType) => {
        const selectedVersion = event.target.value;
        setFormData(prevState => ({
            ...prevState,
            [versionType]: {
                ...prevState[versionType],
                version: selectedVersion
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const { title, numeroProjet, typeDePropositionLegislative, versionInitiale, versionCommission, dateExpiration } = formData;
        if (!title || !numeroProjet || !typeDePropositionLegislative || !versionInitiale.version || !versionCommission.version || !dateExpiration) {
            setError('يرجى ملء جميع الحقول المطلوبة.');
            setLoading(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('numeroProjet', numeroProjet);
        form.append('typeDePropositionLegislative', typeDePropositionLegislative);
        form.append('dateExpiration', dateExpiration);

        form.append('versionInitiale.version', versionInitiale.version);
        if (versionInitiale.pieceJointe) {
            form.append('versionInitialePieceJointe', versionInitiale.pieceJointe);
        }

        form.append('versionCommission.version', versionCommission.version);
        if (versionCommission.pieceJointe) {
            form.append('versionCommissionPieceJointe', versionCommission.pieceJointe);
        }

        try {
            const response = await axios.post('http://localhost:9090/projects', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('تمت إضافة المشروع بنجاح!');
            console.log("تمت إضافة المشروع بنجاح!", response.data);
        } catch (error) {
            setError(`خطأ: ${error.response?.data?.message || 'تعذر إضافة المشروع'}`);
            console.error("حدث خطأ أثناء إضافة المشروع!", error.response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-light">
                <div className="card-header bg-dark text-white">
                    <h4 className="card-title">إضافة مشروع</h4>
                </div>
                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center">
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success d-flex align-items-center">
                            <span>{success}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">العنوان:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">رقم المشروع:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="numeroProjet"
                                value={formData.numeroProjet}
                                onChange={handleChange}
                                placeholder="e.g., 123/2024"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">نوع الاقتراح التشريعي:</label>
                            <select
                                className="form-select"
                                name="typeDePropositionLegislative"
                                value={formData.typeDePropositionLegislative}
                                onChange={handleChange}
                            >
                                <option value="">اختر النوع</option>
                                <option value="TYPE1">النوع 1</option>
                                <option value="TYPE2">النوع 2</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">الإصدار الأولي:</label>
                            <select
                                className="form-select"
                                name="versionInitiale.version"
                                value={formData.versionInitiale.version}
                                onChange={(e) => handleVersionChange(e, 'versionInitiale')}
                            >
                                <option value="">اختر الإصدار</option>
                                <option value="INITIALE">أولي</option>
                            </select>
                            <label className="form-label mt-2">المرفق للإصدار الأولي:</label>
                            <input
                                type="file"
                                className="form-control"
                                name="versionInitiale.pieceJointe"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">إصدار اللجنة:</label>
                            <select
                                className="form-select"
                                name="versionCommission.version"
                                value={formData.versionCommission.version}
                                onChange={(e) => handleVersionChange(e, 'versionCommission')}
                            >
                                <option value="">اختر الإصدار</option>
                                <option value="COMMISSION">لجنة</option>
                            </select>
                            <label className="form-label mt-2">المرفق لإصدار اللجنة:</label>
                            <input
                                type="file"
                                className="form-control"
                                name="versionCommission.pieceJointe"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">تاريخ الانتهاء:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dateExpiration"
                                value={formData.dateExpiration}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-secondary" disabled={loading}>
                            {loading ? 'جاري الإضافة...' : 'إضافة المشروع'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
