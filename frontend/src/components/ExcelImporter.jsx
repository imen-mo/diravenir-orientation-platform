import React, { useState, useRef } from 'react';
import {
  FaFileExcel,
  FaUpload,
  FaDownload,
  FaCheck,
  FaExclamationTriangle,
  FaTimes,
  FaSpinner,
  FaInfoCircle,
  FaEye,
  FaTrash
} from 'react-icons/fa';
import adminApiService from '../services/adminApiService';

const ExcelImporter = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const fileInputRef = useRef(null);

  // Gestion du drag & drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    // Vérifier le type de fichier
    if (!selectedFile.name.toLowerCase().endsWith('.xlsx')) {
      alert('Veuillez sélectionner un fichier Excel (.xlsx)');
      return;
    }

    // Vérifier la taille (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('Le fichier est trop volumineux (max 10MB)');
      return;
    }

    setFile(selectedFile);
    setImportResult(null);
    
    // Prévisualiser le fichier
    previewFile(selectedFile);
  };

  const previewFile = (file) => {
    // Simulation de prévisualisation avec support multi-feuilles
    const mockPreview = [
      { nom: "Master Informatique", universite: "Université de Paris", destination: "France", duree: "2 ans", prix: "5000", feuille: "Nouveau Format" },
      { nom: "Bachelor Business", universite: "London Business School", destination: "Royaume-Uni", duree: "3 ans", prix: "15000", feuille: "Nouveau Format" },
      { nom: "PhD Engineering", universite: "MIT", destination: "États-Unis", duree: "4 ans", prix: "25000", feuille: "Nouveau Format" },
      { nom: "Master Informatique", universite: "Université de Pékin", destination: "Chine", duree: "2 ans", prix: "5000", feuille: "Chine" },
      { nom: "Bachelor Business", universite: "Université Fudan", destination: "Chine", duree: "4 ans", prix: "8000", feuille: "Chine" },
      { nom: "Master Engineering", universite: "Université de Chypre", destination: "Chypre", duree: "2 ans", prix: "3000", feuille: "Chypre" }
    ];
    
    setPreviewData(mockPreview);
    setShowPreview(true);
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await adminApiService.importProgramsFromExcel(formData);
      setImportResult(result);
      
      if (result.success) {
        onImportComplete && onImportComplete(result);
      }
    } catch (error) {
      console.error('Erreur import:', error);
      setImportResult({
        success: false,
        error: 'Erreur lors de l\'import: ' + error.message
      });
    } finally {
      setImporting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await adminApiService.downloadExcelTemplate();
      const blob = new Blob([response], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'template_programmes.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur téléchargement template:', error);
      alert('Erreur lors du téléchargement du template');
    }
  };

  const resetImport = () => {
    setFile(null);
    setImportResult(null);
    setShowPreview(false);
    setPreviewData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="excel-importer-container">
      {/* En-tête */}
      <div className="importer-header">
        <h2 className="importer-title">
          <FaFileExcel /> Import de Programmes Excel
        </h2>
        <p className="importer-description">
          Importez vos programmes depuis un fichier Excel (.xlsx)
        </p>
      </div>

      {/* Zone d'upload */}
      <div className="upload-zone">
        <div 
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
            style={{ display: 'none' }}
          />
          
          {!file ? (
            <div className="upload-placeholder">
              <FaUpload className="upload-icon" />
              <h4>Glissez-déposez votre fichier Excel ici</h4>
              <p>ou cliquez pour sélectionner un fichier</p>
              <div className="supported-formats">
                <span>Format supporté: .xlsx</span>
                <span>Taille max: 10MB</span>
              </div>
            </div>
          ) : (
            <div className="file-selected">
              <FaFileExcel className="file-icon" />
              <div className="file-info">
                <h4>{file.name}</h4>
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                className="remove-file-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  resetImport();
                }}
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section template */}
      <div className="template-section">
        <button 
          className="template-btn"
          onClick={handleDownloadTemplate}
        >
          <FaDownload /> Télécharger le Template
        </button>
        <div className="template-info">
          <FaInfoCircle />
          <span>Utilisez le template pour garantir le bon format</span>
        </div>
      </div>

      {/* Prévisualisation */}
      {showPreview && previewData.length > 0 && (
        <div className="preview-section">
          <h3 className="preview-title">
            <FaEye /> Aperçu des données
          </h3>
          <div className="preview-stats">
            <div className="stat-item">
              <span className="stat-label">Lignes détectées</span>
              <span className="stat-value">{previewData.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Feuilles</span>
              <span className="stat-value">{new Set(previewData.map(item => item.feuille)).size}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Formats</span>
              <span className="stat-value">Multi-support</span>
            </div>
          </div>
          
          <div className="sample-data">
            <h5>Exemples de données:</h5>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Université</th>
                    <th>Destination</th>
                    <th>Durée</th>
                    <th>Prix</th>
                    <th>Feuille</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(0, 6).map((row, index) => (
                    <tr key={index}>
                      <td>{row.nom}</td>
                      <td>{row.universite}</td>
                      <td>{row.destination}</td>
                      <td>{row.duree}</td>
                      <td>{row.prix}</td>
                      <td><span className="feuille-badge">{row.feuille}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Résultats d'import */}
      {importResult && (
        <div className={`import-results ${importResult.success ? 'success' : 'error'}`}>
          <div className="results-header">
            {importResult.success ? (
              <>
                <FaCheck className="success-icon" />
                <h4>Import réussi!</h4>
              </>
            ) : (
              <>
                <FaExclamationTriangle className="error-icon" />
                <h4>Erreur d'import</h4>
              </>
            )}
          </div>
          
          <div className="results-stats">
            <div className="stat-item success">
              <span>Succès: {importResult.successCount || 0}</span>
            </div>
            <div className="stat-item error">
              <span>Erreurs: {importResult.errorCount || 0}</span>
            </div>
            {importResult.warningCount > 0 && (
              <div className="stat-item warning">
                <span>Avertissements: {importResult.warningCount}</span>
              </div>
            )}
          </div>

          {/* Erreurs détaillées */}
          {importResult.errors && importResult.errors.length > 0 && (
            <div className="errors-section">
              <h4 className="errors-title">
                <FaExclamationTriangle /> Erreurs détaillées
              </h4>
              <div className="errors-list">
                {importResult.errors.map((error, index) => (
                  <div key={index} className="error-item">
                    <FaTimes className="error-icon" />
                    <span>{error}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Avertissements */}
          {importResult.warnings && importResult.warnings.length > 0 && (
            <div className="warnings-section">
              <h4 className="warnings-title">
                <FaExclamationTriangle /> Avertissements
              </h4>
              <div className="warnings-list">
                {importResult.warnings.map((warning, index) => (
                  <div key={index} className="warning-item">
                    <FaExclamationTriangle className="warning-icon" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="importer-actions">
        {file && !importResult && (
          <button 
            className="import-btn"
            onClick={handleImport}
            disabled={importing}
          >
            {importing ? (
              <>
                <FaSpinner className="spinning" />
                Import en cours...
              </>
            ) : (
              <>
                <FaUpload />
                Importer les Programmes
              </>
            )}
          </button>
        )}
        
        {(file || importResult) && (
          <button 
            className="reset-btn"
            onClick={resetImport}
          >
            <FaTrash />
            Nouvel Import
          </button>
        )}
      </div>
    </div>
  );
};

export default ExcelImporter;
