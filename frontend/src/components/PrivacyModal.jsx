import React from 'react';
import '../styles/Modal.css';

const PrivacyModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Privacy Policy</h2>
          <button className="modal-close" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="privacy-content">
            <p>This Privacy Policy explains how <strong>Diravenir</strong>, operated by Diravenir, a company registered in Morocco, collects, uses, and protects your personal data when you use our online platform. This policy is in full compliance with Moroccan Law No. 09-08 relating to the protection of individuals with regard to the processing of personal data.</p>
            
            <h3>1. Information We Collect</h3>
            <p>We collect various types of information to provide and improve our services, in accordance with the principles of necessity and proportionality outlined in Law No. 09-08:</p>
            <ul>
              <li><strong>Personal Information:</strong> This includes data you provide during registration and application, such as your full name, date of birth, contact details (email, phone number), and passport information.</li>
              <li><strong>Academic Information:</strong> This includes transcripts, academic certificates, diplomas, and any other educational records required for your application.</li>
              <li><strong>Payment Information:</strong> For processing service charges, we may collect information such as bank details, credit card confirmations, or other transaction details.</li>
            </ul>
            
            <h3>2. How We Use Your Information</h3>
            <p>Your data is used for the following purposes:</p>
            <ul>
              <li>To process and submit your applications to partner universities and educational programs.</li>
              <li>To facilitate and manage scholarship applications.</li>
              <li>To communicate with you regarding the status of your applications and provide customer support.</li>
              <li>To improve our services, user experience, and platform functionality.</li>
            </ul>
            <p>The collection and processing of your personal data are carried out with your explicit and informed consent, as required by Law No. 09-08.</p>
            
            <h3>3. Data Sharing</h3>
            <p>We will only share your personal data with authorized third parties as necessary to provide our services. This includes:</p>
            <ul>
              <li><strong>Partner Universities:</strong> To process your application for admission.</li>
              <li><strong>Governmental Bodies:</strong> To facilitate visa or study permit applications, as required by law.</li>
              <li><strong>Authorized Third Parties:</strong> Such as payment processors or other service providers that are essential to our operations.</li>
            </ul>
            <p>Any transfer of personal data to a foreign country will be subject to the prior authorization of the Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP), in accordance with the provisions of Law No. 09-08.</p>
            <p>We do not sell, rent, or trade your personal data to any third parties for marketing or commercial purposes.</p>
            
            <h3>4. Data Security</h3>
            <p>We take your data security seriously and implement appropriate technical and organizational measures to protect your information, in compliance with Law No. 09-08. We use data encryption, secure servers, and strict access controls to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.</p>
            
            <h3>5. Your Rights</h3>
            <p>In accordance with Moroccan Law No. 09-08, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Obtain a copy of your personal data held by us.</li>
              <li><strong>Rectify:</strong> Request the correction of any inaccurate or incomplete data.</li>
              <li><strong>Oppose:</strong> Object to the processing of your personal data for legitimate reasons.</li>
              <li><strong>Request Deletion:</strong> Request the deletion of your personal data when it is no longer necessary for the purpose for which it was collected.</li>
            </ul>
            <p>You can exercise these rights by contacting us at Contact@Diravenir.com. We will process your request within a reasonable timeframe, in compliance with the procedures set forth by the CNDP.</p>
            
            <h3>6. Cookies</h3>
            <p>We use cookies and similar tracking technologies to enhance your user experience, analyze platform usage, and personalize content. You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of certain parts of our platform.</p>
            
            <h3>7. Compliance and CNDP Declaration</h3>
            <p>As a data controller operating in Morocco, Diravenir has fulfilled its legal obligation by submitting a prior declaration to the Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP) regarding the processing of your personal data. We are committed to upholding the principles and obligations established by Law No. 09-08.</p>
            
            <p><strong>Changes to this Policy:</strong> We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this policy periodically.</p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-button modal-button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button modal-button-primary" onClick={onAccept}>
            Accept Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
