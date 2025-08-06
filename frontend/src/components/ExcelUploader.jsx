import React, { useState } from 'react';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import './ExcelUploader.css';

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check if file is Excel
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
        toast.error('Veuillez sélectionner un fichier Excel (.xlsx ou .xls)');
        return;
      }
      setFile(selectedFile);
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
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await programService.uploadExcel(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success(`Import réussi! ${response.message || 'Programmes importés avec succès'}`);
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('excel-file-input');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      toast.error(`Erreur lors de l'import: ${error.message || 'Une erreur est survenue'}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileExtension = droppedFile.name.split('.').pop().toLowerCase();
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        setFile(droppedFile);
      } else {
        toast.error('Veuillez déposer un fichier Excel (.xlsx ou .xls)');
      }
    }
  };

  return (
    <div className="excel-uploader">
      <div className="uploader-header">
        <h2>Import de Programmes</h2>
        <p>Importez vos programmes depuis un fichier Excel</p>
      </div>

      <div 
        className={`upload-area ${file ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="upload-text">
          {file ? (
            <>
              <h3>Fichier sélectionné</h3>
              <p className="file-name">{file.name}</p>
              <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </>
          ) : (
            <>
              <h3>Glissez-déposez votre fichier Excel ici</h3>
              <p>ou cliquez pour sélectionner un fichier</p>
              <p className="file-types">Formats acceptés: .xlsx, .xls</p>
            </>
          )}
        </div>

        <input
          id="excel-file-input"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      {file && (
        <div className="upload-actions">
          <button 
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Import en cours...' : 'Importer les Programmes'}
          </button>
          
          <button 
            className="cancel-btn"
            onClick={() => {
              setFile(null);
              const fileInput = document.getElementById('excel-file-input');
              if (fileInput) {
                fileInput.value = '';
              }
            }}
            disabled={uploading}
          >
            Annuler
          </button>
        </div>
      )}

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="progress-text">{uploadProgress}% terminé</p>
        </div>
      )}

      <div className="upload-info">
        <h4>Instructions pour l'import:</h4>
        <ul>
          <li>Le fichier Excel doit contenir les colonnes suivantes:</li>
          <li><strong>majorName</strong> - Nom du programme/major</li>
          <li><strong>universityName</strong> - Nom de l'université</li>
          <li><strong>description</strong> - Description du programme</li>
          <li><strong>degreeType</strong> - Type de diplôme (Bachelor, Master, etc.)</li>
          <li><strong>location</strong> - Localisation</li>
          <li><strong>campusCity</strong> - Ville du campus</li>
          <li><strong>duration</strong> - Durée en mois</li>
          <li><strong>language</strong> - Langue d'enseignement</li>
          <li><strong>universityRanking</strong> - Classement de l'université</li>
          <li><strong>programRanking</strong> - Classement du programme</li>
          <li><strong>scholarshipAvailable</strong> - Bourse disponible (true/false)</li>
          <li><strong>tuitionFees</strong> - Frais de scolarité</li>
          <li><strong>applyBefore</strong> - Date limite de candidature</li>
          <li><strong>status</strong> - Statut (OPENED, COMING_SOON, CLOSED)</li>
          <li><strong>programImage</strong> - URL de l'image du programme</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelUploader; 