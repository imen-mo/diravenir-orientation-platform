import React from 'react';
import '../styles/Modal.css';

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Terms and Conditions</h2>
          <button className="modal-close" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="terms-content">
            <p><strong>Welcome to Diravenir</strong>, an online platform for academic orientation and application to programs abroad. These Terms & Conditions govern your use of the Diravenir platform and its services. By accessing, using, or submitting an application through our platform, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, you may not use our services.</p>
            
            <h3>1. Acceptance of Terms</h3>
            <p>This is a legally binding agreement between you, the Applicant or User, and Diravenir, operated by Diravenir, a company registered under Moroccan law. These Terms & Conditions, along with our Privacy Policy, constitute the entire agreement regarding your use of the platform.</p>
            
            <h3>2. Eligibility</h3>
            <p>Our services are available to individuals who meet the eligibility criteria for the specific universities, institutions, and programs they are applying to. You must provide information that is accurate, authentic, and complete at all stages of the application process, in accordance with applicable Moroccan law.</p>
            
            <h3>3. Application Process</h3>
            <p><strong>3.1. Service Function:</strong> Diravenir facilitates the application process by providing a centralized portal for submitting documents and information to various universities and educational programs.</p>
            <p><strong>3.2. Document Submission:</strong> You are required to upload all necessary documents as specified for your chosen program(s).</p>
            <p><strong>3.3. Review and Approval:</strong> The submission of an application does not guarantee admission. All applications are subject to a thorough review and final approval by the respective university or educational institution and any other relevant governmental or regulatory authorities.</p>
            
            <h3>4. Service Charges and Fees</h3>
            <p><strong>4.1. Diravenir Service Charges:</strong> By using our platform, you agree to pay the applicable service charges for the services provided by Diravenir. These charges are outlined on the platform or communicated to you before payment.</p>
            <p><strong>4.2. Non-Refundable Policy:</strong> All service charges paid to Diravenir are non-refundable unless explicitly stated otherwise in a separate Refund Policy. This policy is in accordance with consumer protection regulations in Morocco.</p>
            <p><strong>4.3. Third-Party Fees:</strong> You are solely responsible for all additional fees, including but not limited to, university application fees, visa application fees, language proficiency exam fees, travel expenses, or any other costs imposed by third parties.</p>
            
            <h3>5. Applicant's Responsibilities</h3>
            <p><strong>5.1. Accuracy of Information:</strong> You are responsible for ensuring that all information, documents, and data you provide to Diravenir are true, accurate, and complete. Providing false, misleading, or fraudulent information is strictly prohibited and may result in the termination of your account and application, and may subject you to legal consequences under Moroccan law.</p>
            <p><strong>5.2. Compliance:</strong> You are responsible for attending any interviews, examinations, or meetings required by the universities or by Diravenir.</p>
            <p><strong>5.3. Legal Compliance:</strong> You must comply with all applicable local, national, and international laws and regulations related to your application and studies abroad.</p>
            
            <h3>6. Platform Use</h3>
            <p><strong>6.1. Prohibited Conduct:</strong> You agree not to engage in any of the following prohibited activities:</p>
            <ul>
              <li>Sharing your account credentials with any third party.</li>
              <li>Submitting fraudulent, malicious, or unauthorized information.</li>
              <li>Attempting to interfere with the proper functioning of the platform.</li>
            </ul>
            <p><strong>6.2. Termination of Access:</strong> Diravenir reserves the right to suspend or terminate your access to the platform without notice if we believe, in our sole discretion, that you have violated these Terms & Conditions or have engaged in any fraudulent or unlawful behavior.</p>
            
            <h3>7. Limitations of Liability</h3>
            <p><strong>7.1. Circumstances Beyond Our Control:</strong> Diravenir is not liable for any outcomes or circumstances beyond its reasonable control, including, but not limited to:</p>
            <ul>
              <li>Rejection of your application by a university.</li>
              <li>Delay or rejection of a visa or study permit.</li>
              <li>Delays caused by third parties, such as postal services, universities, or governmental bodies.</li>
            </ul>
            <p><strong>7.2. General Disclaimer:</strong> The services are provided "as is" and "as available." Diravenir makes no warranties, either express or implied, regarding the accuracy, completeness, or reliability of the services. You use the platform at your own risk.</p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-button modal-button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button modal-button-primary" onClick={onAccept}>
            Accept Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
