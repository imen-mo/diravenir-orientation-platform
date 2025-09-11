import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { applicationService } from '../services/applicationService';
import { toast } from 'react-toastify';
import GlobalLayout from '../components/GlobalLayout';
import './ApplicationSuccess.css';

const ApplicationSuccess = () => {
  const { getText } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [generatingReceipt, setGeneratingReceipt] = useState(false);

  useEffect(() => {
    // Récupérer les données de l'application depuis l'état de navigation ou localStorage
    const appData = location.state?.applicationData || 
                   JSON.parse(localStorage.getItem('lastSubmittedApplication') || 'null');
    
    if (appData) {
      setApplicationData(appData);
    } else {
      // Si pas de données, rediriger vers le dashboard
      toast.error('No application data found');
      navigate('/dashboard');
    }
    
    setLoading(false);
  }, [location.state, navigate]);

  const handleDownloadReceipt = async () => {
    if (!applicationData) return;
    
    try {
      setGeneratingReceipt(true);
      
      // Générer le reçu de paiement
      const receiptData = {
        applicationId: applicationData.applicationId || applicationData.id,
        studentName: `${applicationData.firstName} ${applicationData.lastName}`,
        programName: applicationData.programName || 'Program',
        universityName: applicationData.universityName || 'University',
        applicationFee: applicationData.applicationFees || 4000,
        serviceFee: applicationData.serviceFees || 11000,
        totalAmount: (parseInt(applicationData.applicationFees || 4000) + parseInt(applicationData.serviceFees || 11000)),
        paymentDate: new Date().toLocaleDateString(),
        paymentStatus: 'COMPLETED'
      };
      
      // Appeler l'API pour générer le reçu
      const response = await applicationService.generateReceipt(receiptData);
      
      // Télécharger le reçu
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt_${receiptData.applicationId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Receipt downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating receipt:', error);
      toast.error('Failed to generate receipt. Please try again.');
    } finally {
      setGeneratingReceipt(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!applicationData) return;
    
    try {
      setGeneratingPDF(true);
      
      // Générer le PDF complet de l'application
      const response = await applicationService.generateApplicationPDF(applicationData.applicationId || applicationData.id);
      
      // Télécharger le PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `application_${applicationData.applicationId || applicationData.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Application PDF downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleViewApplications = () => {
    navigate('/dashboard?section=applications');
  };

  if (loading) {
    return (
      <GlobalLayout activePage="success">
        <div className="success-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading application details...</p>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  if (!applicationData) {
    return (
      <GlobalLayout activePage="success">
        <div className="success-container">
          <div className="error-message">
            <h2>No Application Data Found</h2>
            <p>We couldn't find your application data. Please try again.</p>
            <button onClick={handleGoToDashboard} className="btn-primary">
              Go to Dashboard
            </button>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout activePage="success">
      <div className="success-container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4CAF50" stroke="#4CAF50" strokeWidth="2"/>
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="success-title">Application Submitted Successfully!</h1>
          <p className="success-subtitle">
            Your application for <strong>{applicationData.programName || 'the program'}</strong> has been submitted successfully.
          </p>
        </div>

        {/* Application Summary */}
        <div className="application-summary">
          <h2>Application Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Application ID:</span>
              <span className="summary-value">{applicationData.applicationId || applicationData.id}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Program:</span>
              <span className="summary-value">{applicationData.programName || 'Program'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">University:</span>
              <span className="summary-value">{applicationData.universityName || 'University'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Student Name:</span>
              <span className="summary-value">{applicationData.firstName} {applicationData.lastName}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Email:</span>
              <span className="summary-value">{applicationData.email}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Submission Date:</span>
              <span className="summary-value">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="cost-breakdown">
          <h2>Payment Summary</h2>
          <div className="cost-items">
            <div className="cost-item">
              <span className="cost-label">Application Fee:</span>
              <span className="cost-value">{applicationData.applicationFees || 4000} MAD</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">Service Fee:</span>
              <span className="cost-value">{applicationData.serviceFees || 11000} MAD</span>
            </div>
            <div className="cost-total">
              <span className="cost-label">Total Amount:</span>
              <span className="cost-value">
                {(parseInt(applicationData.applicationFees || 4000) + parseInt(applicationData.serviceFees || 11000))} MAD
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <div className="primary-actions">
            <button 
              className="btn-purple btn-receipt"
              onClick={handleDownloadReceipt}
              disabled={generatingReceipt}
            >
              {generatingReceipt ? (
                <>
                  <div className="spinner-small"></div>
                  Generating Receipt...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Receipt
                </>
              )}
            </button>
            
            <button 
              className="btn-purple btn-pdf"
              onClick={handleDownloadPDF}
              disabled={generatingPDF}
            >
              {generatingPDF ? (
                <>
                  <div className="spinner-small"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Complete PDF
                </>
              )}
            </button>
          </div>
          
          <div className="secondary-actions">
            <button className="btn-secondary" onClick={handleViewApplications}>
              View All Applications
            </button>
            <button className="btn-secondary" onClick={handleGoToDashboard}>
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h2>What's Next?</h2>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Application Review</h3>
                <p>Our team will review your application within 2-3 business days.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Document Verification</h3>
                <p>We'll verify all your submitted documents and information.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>University Processing</h3>
                <p>Your application will be forwarded to the university for final review.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Admission Decision</h3>
                <p>You'll receive the admission decision within 4-6 weeks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Need Help?</h2>
          <p>If you have any questions about your application, please don't hesitate to contact us:</p>
          <div className="contact-details">
            <div className="contact-item">
              <strong>Email:</strong> support@diravenir.com
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> +212 5XX XXX XXX
            </div>
            <div className="contact-item">
              <strong>WhatsApp:</strong> +212 6XX XXX XXX
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default ApplicationSuccess;
