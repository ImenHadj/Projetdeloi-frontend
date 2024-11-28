import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { id } = useParams(); // Récupérer l'ID du projet à partir des paramètres d'URL
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!id) {
                setError('Project ID is undefined');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:9090/projects/${id}`);
                setProject(response.data);
                setLoading(false); // Mettre à jour l'état de chargement
            } catch (err) {
                setError(`Erreur lors de la récupération du projet: ${err.message}`);
                setLoading(false);
                console.error("Erreur de requête:", err.response ? err.response.data : err.message);
            }
        };

        fetchProjectDetails();

    }, [id]);

    // Affichage en fonction des états
    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!project) {
        return <div>Aucun projet trouvé.</div>;
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <p>Date Apparition: {project.dateApparition}</p>
            <p>Date Expiration: {project.dateExpiration}</p>
            <p>Numéro Projet: {project.numeroProjet}</p>
            <p>Type de Proposition Législative: {project.typeDePropositionLegislative}</p>
            <p>Version Initiale: {project.versionInitiale && project.versionInitiale.version}</p>
            <p>Version Commission: {project.versionCommission && project.versionCommission.version}</p>
        </div>
    );
};

export default ProjectDetail;
