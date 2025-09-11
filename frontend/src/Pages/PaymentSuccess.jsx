import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Get data from URL params
  const [paymentData, setPaymentData] = useState({
    applicationId: '000085752257',
    studentName: 'Meryem Derni',
    paymentMethod: 'Credit Card',
    paymentAmount: '15 000 MAD',
    paymentTime: new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    programName: 'Mechanical Engineering',
    universityName: 'Hefei University',
    refNumber: `REF${Date.now()}`,
    transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    
    // Informations complètes de l'étudiant (pour le PDF)
    studentInfo: {
      firstName: 'Meryem',
      lastName: 'Derni',
      email: 'meryem.derni@email.com',
      phone: '+212 6 12 34 56 78',
      whatsapp: '+212 6 12 34 56 78',
      dateOfBirth: '15/03/2000',
      placeOfBirth: 'Casablanca, Maroc',
      gender: 'Femme',
      maritalStatus: 'Célibataire',
      passportNumber: 'AB123456',
      passportExpiry: '15/03/2030',
      country: 'Maroc',
      fullAddress: '123 Rue Hassan II, Casablanca 20000, Maroc',
      province: 'Casablanca-Settat',
      postalCode: '20000'
    },
    
    // Informations académiques
    academicInfo: {
      englishLevel: 'Très Bon',
      englishCertificate: 'IELTS',
      englishScore: '7.5',
      educationBackground: [
        {
          school: 'Lycée Lyautey',
          major: 'Sciences Mathématiques',
          startedDate: '2018',
          finishedDate: '2021',
          grade: 'Très Bien'
        }
      ],
      workExperience: [
        {
          company: 'Stage chez Renault Maroc',
          position: 'Stagiaire en Ingénierie',
          startedDate: 'Juin 2023',
          finishedDate: 'Août 2023',
          description: 'Stage en conception mécanique'
        }
      ]
    },
    
    // Informations familiales et garant
    familyInfo: {
      familyMembers: [
        { name: 'Ahmed Derni', relationship: 'Père', occupation: 'Ingénieur' },
        { name: 'Fatima Derni', relationship: 'Mère', occupation: 'Médecin' }
      ],
      guarantor: {
        name: 'Ahmed Derni',
        relationship: 'Père',
        country: 'Maroc',
        address: '123 Rue Hassan II, Casablanca 20000, Maroc',
        email: 'ahmed.derni@email.com',
        workplace: 'Office National des Chemins de Fer',
        workplaceAddress: 'Avenue Mohammed V, Rabat, Maroc'
      },
      emergencyContact: {
        name: 'Ahmed Derni',
        country: 'Maroc',
        email: 'ahmed.derni@email.com',
        address: '123 Rue Hassan II, Casablanca 20000, Maroc'
      }
    },
    
    // Documents requis
    documents: {
      passport: '✅ Passport valide',
      academicCertificate: '✅ Diplôme de Baccalauréat',
      academicTranscript: '✅ Relevé de notes',
      languageCertificate: '✅ Certificat IELTS',
      physicalExamination: '✅ Certificat médical',
      nonCriminalCertificate: '✅ Casier judiciaire vierge',
      bankStatement: '✅ Relevé bancaire',
      photo: '✅ Photo d\'identité',
      resume: '✅ CV détaillé',
      awardCertificates: '✅ Certificats de mérite',
      parentId: '✅ Carte d\'identité du garant'
    },
    
    // Informations du programme
    programInfo: {
      category: 'Ingénierie',
      degreeType: 'Bachelor',
      duration: '4 ans',
      language: 'Anglais',
      tuitionFees: '18,000 RMB/an',
      scholarship: 'Bourse partielle disponible',
      applyBefore: '31 Mai 2024',
      campusCity: 'Hefei',
      universityRanking: '283ème mondial'
    },
    
    // Statut de l'application
    applicationStatus: {
      status: 'SUBMITTED',
      currentStep: 5,
      submittedAt: new Date().toLocaleString('en-GB'),
      adminNotes: 'Candidature complète et bien documentée',
      verificationStatus: 'PENDING',
      paymentStatus: 'COMPLETED'
    }
  });

  // Parse data from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        
        // Merge with default data to ensure all required properties exist
        const mergedData = {
          ...paymentData, // Default data
          ...parsedData,  // URL data (overrides defaults)
          // Ensure nested objects exist
          studentInfo: {
            ...paymentData.studentInfo,
            ...parsedData.studentInfo
          },
          academicInfo: {
            ...paymentData.academicInfo,
            ...parsedData.academicInfo
          },
          programInfo: {
            ...paymentData.programInfo,
            ...parsedData.programInfo
          },
          applicationStatus: {
            ...paymentData.applicationStatus,
            ...parsedData.applicationStatus
          },
          documents: {
            ...paymentData.documents,
            ...parsedData.documents
          }
        };
        
        setPaymentData(mergedData);
      } catch (error) {
        console.error('Error parsing payment data:', error);
        // Keep default data if parsing fails
      }
    }
  }, []);

  // Generate Comprehensive Payment Receipt PDF
  const generatePaymentReceiptPDF = async () => {
    try {
      setLoading(true);
      
      // Create PDF content using jsPDF
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // ===== EN-TÊTE PROFESSIONNEL =====
      doc.setFontSize(24);
      doc.setTextColor(84, 22, 82); // #541652
      doc.text('DIRAVENIR', 105, 30, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text('Reçu de Paiement Officiel', 105, 45, { align: 'center' });
      
      // ===== INFORMATIONS DE PAIEMENT =====
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Détails du Paiement', 20, 70);
      
      // Informations de base du paiement
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      
      const paymentDetails = [
        ['Numéro de Reçu:', paymentData.refNumber],
        ['ID Transaction:', paymentData.transactionId],
        ['Date et Heure:', paymentData.paymentTime],
        ['Méthode de Paiement:', paymentData.paymentMethod],
        ['Montant Total:', paymentData.paymentAmount]
      ];
      
      let yPos = 85;
      paymentDetails.forEach(([label, value]) => {
        doc.setTextColor(100, 100, 100);
        doc.text(label, 20, yPos);
        doc.setTextColor(0, 0, 0);
        doc.text(value, 80, yPos);
        yPos += 8;
      });
      
      // ===== INFORMATIONS DE L'ÉTUDIANT =====
      yPos += 10;
      doc.setFontSize(14);
      doc.setTextColor(84, 22, 82);
      doc.text('Informations de l\'Étudiant', 20, yPos);
      
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      
      const studentDetails = [
        ['Nom Complet:', paymentData.studentInfo?.firstName && paymentData.studentInfo?.lastName 
          ? `${paymentData.studentInfo.firstName} ${paymentData.studentInfo.lastName}`
          : paymentData.studentName || 'Non spécifié'
        ],
        ['Email:', paymentData.studentInfo?.email || 'Non spécifié'],
        ['Téléphone:', paymentData.studentInfo?.phone || 'Non spécifié'],
        ['Date de Naissance:', paymentData.studentInfo?.dateOfBirth || 'Non spécifié'],
        ['Lieu de Naissance:', paymentData.studentInfo?.placeOfBirth || 'Non spécifié'],
        ['Genre:', paymentData.studentInfo?.gender || 'Non spécifié'],
        ['Statut Civil:', paymentData.studentInfo?.maritalStatus || 'Non spécifié'],
        ['Passeport:', paymentData.studentInfo?.passportNumber || 'Non spécifié'],
        ['Expiration Passeport:', paymentData.studentInfo?.passportExpiry || 'Non spécifié'],
        ['Pays:', paymentData.studentInfo?.country || 'Non spécifié'],
        ['Adresse:', paymentData.studentInfo?.fullAddress || 'Non spécifié']
      ];
      
      studentDetails.forEach(([label, value]) => {
        doc.setTextColor(100, 100, 100);
        doc.text(label, 20, yPos);
        doc.setTextColor(0, 0, 0);
        doc.text(value, 80, yPos);
        yPos += 8;
      });
      
      // ===== INFORMATIONS DU PROGRAMME =====
      yPos += 10;
      doc.setFontSize(14);
      doc.setTextColor(84, 22, 82);
      doc.text('Informations du Programme', 20, yPos);
      
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      
      const programDetails = [
        ['Programme:', paymentData.programName || 'Non spécifié'],
        ['Université:', paymentData.universityName || 'Non spécifié'],
        ['Catégorie:', paymentData.programInfo?.category || 'Non spécifié'],
        ['Type de Diplôme:', paymentData.programInfo?.degreeType || 'Non spécifié'],
        ['Durée:', paymentData.programInfo?.duration || 'Non spécifié'],
        ['Langue:', paymentData.programInfo?.language || 'Non spécifié'],
        ['Frais de Scolarité:', paymentData.programInfo?.tuitionFees || 'Non spécifié'],
        ['Bourse:', paymentData.programInfo?.scholarship || 'Non spécifié'],
        ['Date Limite:', paymentData.programInfo?.applyBefore || 'Non spécifié'],
        ['Ville du Campus:', paymentData.programInfo?.campusCity || 'Non spécifié'],
        ['Classement:', paymentData.programInfo?.universityRanking || 'Non spécifié']
      ];
      
      programDetails.forEach(([label, value]) => {
        doc.setTextColor(100, 100, 100);
        doc.text(label, 20, yPos);
        doc.setTextColor(0, 0, 0);
        doc.text(value, 80, yPos);
        yPos += 8;
      });
      
      // ===== INFORMATIONS ACADÉMIQUES =====
      yPos += 10;
      doc.setFontSize(14);
      doc.setTextColor(84, 22, 82);
      doc.text('Informations Académiques', 20, yPos);
      
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      
      const academicDetails = [
        ['Niveau d\'Anglais:', paymentData.academicInfo?.englishLevel || 'Non spécifié'],
        ['Certificat d\'Anglais:', paymentData.academicInfo?.englishCertificate || 'Non spécifié'],
        ['Score d\'Anglais:', paymentData.academicInfo?.englishScore || 'Non spécifié']
      ];
      
      academicDetails.forEach(([label, value]) => {
        doc.setTextColor(100, 100, 100);
        doc.text(label, 20, yPos);
        doc.setTextColor(0, 0, 0);
        doc.text(value, 80, yPos);
        yPos += 8;
      });
      
      // Formation académique
      yPos += 5;
      doc.setTextColor(84, 22, 82);
      doc.text('Formation Académique:', 20, yPos);
      yPos += 8;
      
      paymentData.academicInfo?.educationBackground?.forEach((edu, index) => {
        doc.setTextColor(100, 100, 100);
        doc.text(`${index + 1}. ${edu.school}`, 25, yPos);
        yPos += 6;
        doc.text(`   Spécialité: ${edu.major}`, 30, yPos);
        yPos += 6;
        doc.text(`   Période: ${edu.startedDate} - ${edu.finishedDate}`, 30, yPos);
        yPos += 6;
        doc.text(`   Mention: ${edu.grade}`, 30, yPos);
        yPos += 8;
      });
      
      // ===== DOCUMENTS REQUIS =====
      yPos += 5;
      doc.setFontSize(14);
      doc.setTextColor(84, 22, 82);
      doc.text('Documents Requis', 20, yPos);
      
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      
      Object.entries(paymentData.documents).forEach(([docType, status]) => {
        doc.text(status, 25, yPos);
        yPos += 6;
      });
      
      // ===== STATUT DE L'APPLICATION =====
      yPos += 10;
      doc.setFontSize(14);
      doc.setTextColor(84, 22, 82);
      doc.text('Statut de l\'Application', 20, yPos);
      
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      
      const statusDetails = [
        ['Statut:', paymentData.applicationStatus?.status || 'Non spécifié'],
        ['Étape Actuelle:', paymentData.applicationStatus?.currentStep ? `${paymentData.applicationStatus.currentStep}/5` : 'Non spécifié'],
        ['Date de Soumission:', paymentData.applicationStatus?.submittedAt || 'Non spécifié'],
        ['Statut de Vérification:', paymentData.applicationStatus?.verificationStatus || 'Non spécifié'],
        ['Statut de Paiement:', paymentData.applicationStatus?.paymentStatus || 'Non spécifié']
      ];
      
      statusDetails.forEach(([label, value]) => {
        doc.setTextColor(100, 100, 100);
        doc.text(label, 20, yPos);
        doc.setTextColor(0, 0, 0);
        doc.text(value, 80, yPos);
        yPos += 8;
      });
      
      // Notes de l'administrateur
      if (paymentData.applicationStatus?.adminNotes) {
        yPos += 5;
        doc.setTextColor(84, 22, 82);
        doc.text('Notes Administratives:', 20, yPos);
        yPos += 8;
        doc.setTextColor(0, 0, 0);
        doc.text(paymentData.applicationStatus.adminNotes, 25, yPos);
        yPos += 10;
      }
      
      // ===== MONTANT TOTAL =====
      doc.setFontSize(16);
      doc.setTextColor(252, 190, 28); // #FCBE1C
      doc.text('Montant Total du Paiement:', 20, yPos + 10);
      doc.text(paymentData.paymentAmount, 80, yPos + 10);
      
      // ===== PIED DE PAGE =====
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Merci d\'avoir choisi Diravenir pour vos études en Chine !', 105, 270, { align: 'center' });
      doc.text('Ce reçu est un document officiel de paiement.', 105, 275, { align: 'center' });
      doc.text('Pour toute question, contactez-nous à support@diravenir.com', 105, 280, { align: 'center' });
      
      // ===== SAUVEGARDE DU PDF =====
      const fileName = paymentData.studentInfo?.firstName && paymentData.studentInfo?.lastName
        ? `Reçu_Paiement_${paymentData.refNumber}_${paymentData.studentInfo.firstName}_${paymentData.studentInfo.lastName}.pdf`
        : `Reçu_Paiement_${paymentData.refNumber}_${paymentData.studentName || 'Etudiant'}.pdf`;
      doc.save(fileName);
      
      toast.success('Reçu de paiement complet téléchargé avec succès !');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Erreur lors de la génération du PDF');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="payment-success-container">
      {/* Main Success Card */}
      <div className="success-main-card">
        
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon-container">
            <div className="success-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M10 30L25 45L50 15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <h1 className="success-title">Paiement Réussi !</h1>
          <p className="success-subtitle">Votre paiement a été traité avec succès</p>
        </div>

        {/* Payment Receipt Card */}
        <div className="receipt-card">
          <div className="receipt-header">
            <h2>💰 Reçu de Paiement Complet</h2>
            <div className="receipt-number">#{paymentData.refNumber}</div>
          </div>
          
          <div className="receipt-content">
            <div className="receipt-row">
              <span className="receipt-label">Nom de l'étudiant:</span>
              <span className="receipt-value">
                {paymentData.studentInfo?.firstName && paymentData.studentInfo?.lastName 
                  ? `${paymentData.studentInfo.firstName} ${paymentData.studentInfo.lastName}`
                  : paymentData.studentName || 'Non spécifié'
                }
              </span>
            </div>
            
            <div className="receipt-row">
              <span className="receipt-label">Programme:</span>
              <span className="receipt-value">{paymentData.programName}</span>
            </div>
            
            <div className="receipt-row">
              <span className="receipt-label">Université:</span>
              <span className="receipt-value">{paymentData.universityName}</span>
            </div>
            
            <div className="receipt-row">
              <span className="receipt-label">Méthode de paiement:</span>
              <span className="receipt-value">{paymentData.paymentMethod}</span>
            </div>
            
            <div className="receipt-row">
              <span className="receipt-label">Date et heure:</span>
              <span className="receipt-value">{paymentData.paymentTime}</span>
            </div>
            
            <div className="receipt-row">
              <span className="receipt-label">ID Transaction:</span>
              <span className="receipt-value">{paymentData.transactionId}</span>
            </div>
            
            <div className="receipt-total">
              <span className="total-label">Montant Total</span>
              <span className="total-amount">{paymentData.paymentAmount}</span>
            </div>
          </div>
          
          <div className="receipt-actions">
            <button 
              className="download-receipt-btn"
              onClick={generatePaymentReceiptPDF}
              disabled={loading}
            >
              {loading ? '⏳ Génération...' : '📥 Télécharger le Reçu Complet PDF'}
            </button>
          </div>
        </div>

        {/* Application Summary Card */}
        <div className="application-summary-card">
          <h3>📋 Résumé de la Candidature</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Statut:</span>
              <span className={`summary-value status-${paymentData.applicationStatus?.status?.toLowerCase() || 'unknown'}`}>
                {paymentData.applicationStatus?.status || 'Non spécifié'}
              </span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Étape:</span>
              <span className="summary-value">{paymentData.applicationStatus?.currentStep || 0}/5</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Vérification:</span>
              <span className="summary-value">{paymentData.applicationStatus?.verificationStatus || 'Non spécifié'}</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Paiement:</span>
              <span className="summary-value">{paymentData.applicationStatus?.paymentStatus || 'Non spécifié'}</span>
            </div>
          </div>
        </div>

        {/* Documents Status Card */}
        <div className="documents-status-card">
          <h3>📄 État des Documents</h3>
          <div className="documents-grid">
            {Object.entries(paymentData.documents || {}).map(([docType, status]) => (
              <div key={docType} className="document-item">
                <span className="document-icon">✅</span>
                <span className="document-name">{docType}</span>
                <span className="document-status">{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="next-steps-card">
          <h3>🔄 Prochaines Étapes</h3>
          <div className="steps-timeline">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Révision de la Candidature</h4>
                <p>Nous examinerons votre dossier sous 5-10 jours ouvrables</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Notifications par Email</h4>
                <p>Vous recevrez des mises à jour depuis admissions@diravenir.com</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Documents Supplémentaires</h4>
                <p>Si nécessaire, nous vous demanderons des documents additionnels</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Admission et Visa</h4>
                <p>Une fois admis, nous vous guiderons pour le JW202 et le visa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn-secondary"
            onClick={() => window.print()}
          >
            🖨️ Imprimer la Page
          </button>
          
          <button 
            className="btn-primary"
            onClick={goToDashboard}
          >
            🏠 Aller au Tableau de Bord
          </button>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h4>📞 Besoin d'aide ?</h4>
          <p>Contactez-nous à <strong>support@diravenir.com</strong> ou appelez le <strong>+212 5XX XX XX XX</strong></p>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;
