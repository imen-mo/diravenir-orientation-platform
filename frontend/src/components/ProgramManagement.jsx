import React, { useState, useEffect } from 'react';
import ExcelUploader from './ExcelUploader';
import './ProgramManagement.css';

const ProgramManagement = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [activeTab, setActiveTab] = useState('list');

    // ===== ÉTATS DU FORMULAIRE =====
    const [formData, setFormData] = useState({
        campusCity: '',
        universities: '',
        program: '',
        category: '',
        degreeType: '',
        description: '',
        status: 'OPENED'
    });

    // ===== CHARGEMENT DES PROGRAMMES =====
    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/programs');
            if (response.ok) {
                const data = await response.json();
                setPrograms(data);
            } else {
                console.warn('⚠️ Erreur API:', response.status, response.statusText);
                // Données de test en mode développement
                if (process.env.NODE_ENV === 'development') {
                    setPrograms([
                        {
                            id: 1,
                            campusCity: 'Beijing',
                            universities: 'Beijing University',
                            program: 'Computer Science',
                            category: 'Technology',
                            degreeType: 'Bachelor',
                            status: 'OPENED',
                            createdAt: new Date().toISOString()
                        },
                        {
                            id: 2,
                            campusCity: 'Shanghai',
                            universities: 'Shanghai University',
                            program: 'Business Administration',
                            category: 'Business',
                            degreeType: 'Master',
                            status: 'OPENED',
                            createdAt: new Date().toISOString()
                        }
                    ]);
                }
            }
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des programmes:', error);
            // Données de test en cas d'erreur
            if (process.env.NODE_ENV === 'development') {
                setPrograms([
                    {
                        id: 1,
                        campusCity: 'Test City',
                        universities: 'Test University',
                        program: 'Test Program',
                        category: 'Test Category',
                        degreeType: 'Test Degree',
                        status: 'OPENED',
                        createdAt: new Date().toISOString()
                    }
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    // ===== FILTRAGE ET RECHERCHE =====
    const filteredPrograms = programs.filter(program => {
        const matchesStatus = filterStatus === 'ALL' || program.status === filterStatus;
        const matchesSearch =
            program.campusCity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.universities?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.program?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.category?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    // ===== GESTION DES ACTIONS =====
    const handleCreateProgram = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/programs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newProgram = await response.json();
                setPrograms([...programs, newProgram]);
                setShowCreateModal(false);
                setFormData({
                    campusCity: '',
                    universities: '',
                    program: '',
                    category: '',
                    degreeType: '',
                    description: '',
                    status: 'OPENED'
                });
                alert('✅ Programme créé avec succès !');
            } else {
                throw new Error('Erreur lors de la création');
            }
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('❌ Erreur lors de la création du programme: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProgram = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`/api/programs/${selectedProgram.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedProgram = await response.json();
                setPrograms(programs.map(program => program.id === selectedProgram.id ? updatedProgram : program));
                setShowEditModal(false);
                setSelectedProgram(null);
                alert('✅ Programme mis à jour avec succès !');
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('❌ Erreur lors de la mise à jour: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProgram = async (programId) => {
        if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer ce programme ?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/programs/${programId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setPrograms(programs.filter(program => program.id !== programId));
                alert('✅ Programme supprimé avec succès !');
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('❌ Erreur lors de la suppression: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditProgram = (program) => {
        setSelectedProgram(program);
        setFormData({
            campusCity: program.campusCity || '',
            universities: program.universities || '',
            program: program.program || '',
            category: program.category || '',
            degreeType: program.degreeType || '',
            description: program.description || '',
            status: program.status || 'OPENED'
        });
        setShowEditModal(true);
    };

    // ===== RENDU DES STATUTS =====
    const renderStatus = (status) => {
        const statusConfig = {
            'OPENED': { label: '✅ Ouvert', color: '#28a745', bgColor: '#e8f5e8' },
            'COMING_SOON': { label: '🕒 Bientôt', color: '#ffc107', bgColor: '#fff8e1' },
            'CLOSED': { label: '❌ Fermé', color: '#dc3545', bgColor: '#ffebee' }
        };

        const config = statusConfig[status] || { label: status, color: '#6c757d', bgColor: '#f8f9fa' };

        return (
            <span
                className="status-badge"
                style={{
                    color: config.color,
                    backgroundColor: config.bgColor,
                    border: `1px solid ${config.color}`
                }}
            >
                {config.label}
            </span>
        );
    };

    if (loading && programs.length === 0) {
        return (
            <div className="program-management">
            <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Chargement des programmes...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="program-management">
            {/* Header */}
            <div className="program-management-header">
                <div className="header-content">
                    <h2>🎓 Gestion des Programmes</h2>
                    <p>Gérez les programmes d'études et importez depuis Excel</p>
                </div>
                <div className="header-actions">
                    <button
                        className="btn-create"
                        onClick={() => setShowCreateModal(true)}
                    >
                        ➕ Nouveau Programme
                    </button>
                    <button
                        className="btn-refresh"
                        onClick={fetchPrograms}
                        disabled={loading}
                    >
                        {loading ? '🔄' : '🔄'} Actualiser
                    </button>
                </div>
            </div>

            {/* Navigation par onglets */}
            <div className="program-tabs">
                        <button
                    className={`program-tab ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                        >
                    📋 Liste des Programmes
                        </button>
                        <button
                    className={`program-tab ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                >
                    📊 Import Excel
                        </button>
                    </div>

            {/* Contenu selon l'onglet actif */}
            {activeTab === 'list' ? (
                <>
            {/* Filtres et recherche */}
            <div className="filters-section">
                <div className="filter-group">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="ALL">Tous les statuts</option>
                                <option value="OPENED">Ouvert</option>
                                <option value="COMING_SOON">Bientôt</option>
                                <option value="CLOSED">Fermé</option>
                    </select>
                </div>

                <div className="search-group">
                    <input
                        type="text"
                                placeholder="Rechercher par ville, université, programme..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Tableau des programmes */}
            <div className="programs-table-container">
                {filteredPrograms.length > 0 ? (
                    <table className="programs-table">
                        <thead>
                            <tr>
                                        <th>ID</th>
                                        <th>Ville</th>
                                        <th>Université</th>
                                <th>Programme</th>
                                <th>Catégorie</th>
                                        <th>Type</th>
                                <th>Statut</th>
                                        <th>Date création</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPrograms.map((program) => (
                                <tr key={program.id} className="program-row">
                                            <td className="program-id">
                                                <strong>#{program.id}</strong>
                                            </td>
                                            
                                            <td className="program-city">
                                                {program.campusCity}
                                    </td>

                                            <td className="program-university">
                                                {program.universities}
                                    </td>

                                            <td className="program-name">
                                                {program.program}
                                    </td>

                                            <td className="program-category">
                                        {program.category}
                                    </td>

                                            <td className="program-degree">
                                                {program.degreeType}
                                    </td>

                                            <td className="program-status">
                                        {renderStatus(program.status)}
                                    </td>

                                            <td className="program-date">
                                                {program.createdAt ? new Date(program.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            
                                            <td className="program-actions">
                                            <button
                                                    className="btn-edit"
                                                    onClick={() => handleEditProgram(program)}
                                                title="Modifier"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                    className="btn-delete"
                                                onClick={() => handleDeleteProgram(program.id)}
                                                title="Supprimer"
                                            >
                                                🗑️
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-programs">
                                <h3>📭 Aucun programme trouvé</h3>
                        <p>
                            {searchTerm || filterStatus !== 'ALL'
                                ? 'Essayez de modifier vos critères de recherche ou de filtrage.'
                                : 'Aucun programme n\'a encore été créé.'
                            }
                        </p>
                    </div>
                )}
            </div>
                </>
            ) : (
                <div className="upload-section">
                    <ExcelUploader onUploadSuccess={fetchPrograms} />
                </div>
            )}

            {/* Modal de création */}
            {showCreateModal && (
        <div className="modal-overlay">
                    <div className="modal-content">
                <div className="modal-header">
                            <h3>➕ Créer un Programme</h3>
                            <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
                </div>
                        <form onSubmit={handleCreateProgram} className="modal-body">
                            <div className="form-group">
                                <label>Ville du campus *</label>
                                <input
                                    type="text"
                                    value={formData.campusCity}
                                    onChange={(e) => setFormData({...formData, campusCity: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Université *</label>
                                <input
                                    type="text"
                                    value={formData.universities}
                                    onChange={(e) => setFormData({...formData, universities: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Programme *</label>
                                <input
                                    type="text"
                                    value={formData.program}
                                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                                    required
                                />
                        </div>
                            <div className="form-group">
                                <label>Catégorie *</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Type de diplôme *</label>
                                <select
                                    value={formData.degreeType}
                                    onChange={(e) => setFormData({...formData, degreeType: e.target.value})}
                                    required
                                >
                                    <option value="">Sélectionner...</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="PhD">PhD</option>
                                    <option value="Diploma">Diploma</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Statut *</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    required
                                >
                                    <option value="OPENED">Ouvert</option>
                                    <option value="COMING_SOON">Bientôt</option>
                                    <option value="CLOSED">Fermé</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowCreateModal(false)}>
                                    Annuler
                                </button>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Création...' : 'Créer'}
                                </button>
                            </div>
                        </form>
                            </div>
                        </div>
            )}

            {/* Modal de modification */}
            {showEditModal && selectedProgram && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>✏️ Modifier le Programme</h3>
                            <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleUpdateProgram} className="modal-body">
                            <div className="form-group">
                                <label>Ville du campus *</label>
                                <input
                                    type="text"
                                    value={formData.campusCity}
                                    onChange={(e) => setFormData({...formData, campusCity: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Université *</label>
                                <input
                                    type="text"
                                    value={formData.universities}
                                    onChange={(e) => setFormData({...formData, universities: e.target.value})}
                                    required
                                />
                        </div>
                        <div className="form-group">
                                <label>Programme *</label>
                            <input
                                type="text"
                                    value={formData.program}
                                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                                    required
                            />
                        </div>
                        <div className="form-group">
                                <label>Catégorie *</label>
                            <input
                                type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    required
                            />
                        </div>
                            <div className="form-group">
                                <label>Type de diplôme *</label>
                                <select
                                    value={formData.degreeType}
                                    onChange={(e) => setFormData({...formData, degreeType: e.target.value})}
                                    required
                                >
                                    <option value="">Sélectionner...</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="PhD">PhD</option>
                                    <option value="Diploma">Diploma</option>
                                </select>
                            </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="3"
                            />
                        </div>
                        <div className="form-group">
                                <label>Statut *</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                required
                                >
                                    <option value="OPENED">Ouvert</option>
                                    <option value="COMING_SOON">Bientôt</option>
                                    <option value="CLOSED">Fermé</option>
                                </select>
                            </div>
                        <div className="modal-actions">
                                <button type="button" onClick={() => setShowEditModal(false)}>
                                Annuler
                            </button>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Mise à jour...' : 'Mettre à jour'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
};

export default ProgramManagement;
