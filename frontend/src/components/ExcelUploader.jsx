import React, { useState } from 'react';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import './ExcelUploader.css';

const ExcelUploader = ({ onUploadSuccess }) => {
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

      console.log('🚀 Début de l\'upload du fichier:', file.name);
      const response = await programService.uploadExcel(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      console.log('✅ Upload réussi:', response);
      toast.success(`Import réussi! ${response.message || 'Programmes importés avec succès'}`);
      
      // Notifier le parent du succès
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('excel-file-input');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'upload:', error);
      toast.error(`Erreur lors de l'import: ${error.message || 'Une erreur est survenue'}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const downloadTemplate = () => {
    // Créer un template Excel simple avec les colonnes requises
    const templateData = [
      ['campus city', 'universities', 'university ranking', 'apply before', 'category', 'program', 'degree type', 'tuition fees', 'duration', 'language', 'scholarship', 'description', 'about this program', 'why this program', 'about the university', 'status'],
      ['Nicosia', 'Near East University', 'N/A', '31st July', 'Medical and Health Sciences', 'Medicine', 'Bachelor', '€10,923.00', '6', 'English', 'Available for eligible students', 'Program description here', 'About this program details', 'Why choose this program', 'About the university', 'OPENED'],
      ['Nicosia', 'Near East University', 'N/A', '31st July', 'Medical and Health Sciences', 'Dentistry', 'Bachelor', '€10,923.00', '5', 'English', 'Available for eligible students', 'Program description here', 'About this program details', 'Why choose this program', 'About the university', 'OPENED']
    ];

    // Créer le contenu CSV
    const csvContent = templateData.map(row => row.join(',')).join('\n');
    
    // Créer et télécharger le fichier
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_programmes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.info('Template téléchargé! Renommez-le en .xlsx et ajoutez vos données');
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
        
        <div className="template-section">
          <button 
            onClick={downloadTemplate}
            className="template-btn"
            type="button"
          >
            📥 Télécharger le Template Excel
          </button>
          <p className="template-info">
            Utilisez ce template pour vous assurer que votre fichier Excel a la bonne structure
          </p>
        </div>
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
          <li><strong>campus city</strong> - Ville du campus (ex: Nicosia)</li>
          <li><strong>universities</strong> - Nom de l'université (ex: Near East University)</li>
          <li><strong>university ranking</strong> - Classement de l'université (ex: N/A, Top 2%)</li>
          <li><strong>apply before</strong> - Date limite d'inscription (ex: 31st July)</li>
          <li><strong>category</strong> - Catégorie (ex: Medical and Health Sciences)</li>
          <li><strong>program</strong> - Nom du programme (ex: Medicine, Dentistry)</li>
          <li><strong>degree type</strong> - Type de diplôme (ex: Bachelor, Master)</li>
          <li><strong>tuition fees</strong> - Frais de scolarité (ex: €10,923.00)</li>
          <li><strong>duration</strong> - Durée en années (ex: 6)</li>
          <li><strong>language</strong> - Langue d'enseignement (ex: English)</li>
          <li><strong>scholarship</strong> - Bourse disponible (ex: Available for eligible students)</li>
          <li><strong>description</strong> - Description générale du programme</li>
          <li><strong>about this program</strong> - À propos de ce programme</li>
          <li><strong>why this program</strong> - Pourquoi ce programme</li>
          <li><strong>about the university</strong> - À propos de l'université</li>
          <li><strong>status</strong> - Statut (OPENED, COMING_SOON, CLOSED)</li>
        </ul>
        
        <div className="example-section">
          <h5>Exemple de données:</h5>
          <div className="example-data">
            <p><strong>campus city:</strong> Nicosia</p>
            <p><strong>universities:</strong> Near East University</p>
            <p><strong>university ranking:</strong> N/A</p>
            <p><strong>apply before:</strong> 31st July</p>
            <p><strong>category:</strong> Medical and Health Sciences</p>
            <p><strong>program:</strong> Medicine</p>
            <p><strong>degree type:</strong> Bachelor</p>
            <p><strong>tuition fees:</strong> €10,923.00</p>
            <p><strong>duration:</strong> 6</p>
            <p><strong>language:</strong> English</p>
            <p><strong>scholarship:</strong> Available for eligible international students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelUploader; 