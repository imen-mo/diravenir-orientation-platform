import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { programService } from '../services/api';
import './ExcelUploader.css';

const ExcelUploader = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Vérifier le type de fichier
            if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                selectedFile.type === 'application/vnd.ms-excel') {
                setFile(selectedFile);
                toast.success('Fichier Excel sélectionné avec succès');
            } else {
                toast.error('Veuillez sélectionner un fichier Excel (.xlsx ou .xls)');
                setFile(null);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Veuillez sélectionner un fichier Excel');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Simuler la progression
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const response = await programService.uploadExcel(formData);
            
            clearInterval(progressInterval);
            setUploadProgress(100);

            if (response.success) {
                toast.success(`✅ ${response.message} - ${response.programsCount} programmes importés`);
                setFile(null);
                // Réinitialiser le champ de fichier
                const fileInput = document.getElementById('excel-file-input');
                if (fileInput) fileInput.value = '';
            } else {
                toast.error(`❌ Erreur lors de l'import: ${response.message}`);
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            toast.error('❌ Erreur lors de l\'upload du fichier Excel');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            if (droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                droppedFile.type === 'application/vnd.ms-excel') {
                setFile(droppedFile);
                toast.success('Fichier Excel déposé avec succès');
            } else {
                toast.error('Veuillez déposer un fichier Excel (.xlsx ou .xls)');
            }
        }
    };

    return (
        <div className="excel-uploader">
            <div className="uploader-header">
                <h3>📊 Import de Programmes via Excel</h3>
                <p>Importez vos programmes depuis un fichier Excel (.xlsx ou .xls)</p>
            </div>

            <div className="uploader-content">
                {/* Zone de glisser-déposer */}
                <div 
                    className="drop-zone"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="drop-zone-content">
                        <div className="drop-zone-icon">📁</div>
                        <p className="drop-zone-text">
                            Glissez-déposez votre fichier Excel ici
                        </p>
                        <p className="drop-zone-subtext">ou</p>
                        <label htmlFor="excel-file-input" className="file-input-label">
                            Sélectionner un fichier
                        </label>
                        <input
                            id="excel-file-input"
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </div>
                </div>

                {/* Fichier sélectionné */}
                {file && (
                    <div className="selected-file">
                        <div className="file-info">
                            <span className="file-icon">📄</span>
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                        </div>
                        <button 
                            onClick={() => setFile(null)}
                            className="remove-file-btn"
                        >
                            ❌
                        </button>
                    </div>
                )}

                {/* Barre de progression */}
                {uploading && (
                    <div className="upload-progress">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <span className="progress-text">{uploadProgress}%</span>
                    </div>
                )}

                {/* Bouton d'upload */}
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`upload-btn ${!file || uploading ? 'disabled' : ''}`}
                >
                    {uploading ? (
                        <>
                            <span className="spinner">⏳</span>
                            Import en cours...
                        </>
                    ) : (
                        <>
                            <span className="upload-icon">📤</span>
                            Importer les Programmes
                        </>
                    )}
                </button>
            </div>

            {/* Instructions */}
            <div className="uploader-instructions">
                <h4>📋 Instructions d'import :</h4>
                <ul>
                    <li>Format de fichier : Excel (.xlsx ou .xls)</li>
                    <li>Structure attendue : Colonnes pour nom, description, statut, etc.</li>
                    <li>Taille maximale : 10 MB</li>
                    <li>Les programmes existants seront mis à jour</li>
                </ul>
            </div>
        </div>
    );
};

export default ExcelUploader;
