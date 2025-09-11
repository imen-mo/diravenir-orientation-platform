package com.diravenir.service;

import com.diravenir.Entities.Application;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class PDFGenerationService {

    @Value("${app.pdf.output.path:./pdfs/}")
    private String pdfOutputPath;

    @Value("${app.company.name:Diravenir}")
    private String companyName;

    @Value("${app.company.address:123 Main Street, City, Country}")
    private String companyAddress;

    @Value("${app.company.phone:+212-XXXXXXXXX}")
    private String companyPhone;

    @Value("${app.company.email:contact@diravenir.com}")
    private String companyEmail;

    private static final Font TITLE_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.DARK_GRAY);
    private static final Font SUBTITLE_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.DARK_GRAY);
    private static final Font HEADER_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);
    private static final Font NORMAL_FONT = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);
    private static final Font SMALL_FONT = FontFactory.getFont(FontFactory.HELVETICA, 8, BaseColor.GRAY);

    public byte[] generateApplicationPDF(Application application) {
        try {
            Document document = new Document(PageSize.A4, 50, 50, 50, 50);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, baos);

            document.open();
            
            // Header
            addHeader(document);
            
            // Application Information
            addApplicationInfo(document, application);
            
            // Personal Information
            addPersonalInfo(document, application);
            
            // Educational Background
            addEducationalBackground(document, application);
            
            // Work Experience
            addWorkExperience(document, application);
            
            // Family Information
            addFamilyInfo(document, application);
            
            // Financial Guarantor
            addFinancialGuarantor(document, application);
            
            // Emergency Contact
            addEmergencyContact(document, application);
            
            // Documents List
            addDocumentsList(document, application);
            
            // Payment Information
            addPaymentInfo(document, application);
            
            // Footer
            addFooter(document);
            
            document.close();
            
            log.info("PDF generated successfully for application: {}", application.getApplicationId());
            return baos.toByteArray();
            
        } catch (Exception e) {
            log.error("Error generating PDF for application: {}", application.getApplicationId(), e);
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }

    private void addHeader(Document document) throws DocumentException {
        // Company Logo and Info
        Paragraph header = new Paragraph();
        header.add(new Chunk(companyName, TITLE_FONT));
        header.add(Chunk.NEWLINE);
        header.add(new Chunk(companyAddress, NORMAL_FONT));
        header.add(Chunk.NEWLINE);
        header.add(new Chunk("Phone: " + companyPhone + " | Email: " + companyEmail, SMALL_FONT));
        header.setAlignment(Element.ALIGN_CENTER);
        document.add(header);
        
        // Separator
        document.add(new LineSeparator(1f, 100f, BaseColor.GRAY, Element.ALIGN_CENTER, -2f));
        document.add(Chunk.NEWLINE);
    }

    private void addApplicationInfo(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("APPLICATION INFORMATION", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{40, 60});

        addTableRow(table, "Application ID:", application.getApplicationId());
        addTableRow(table, "Program:", application.getProgramName());
        addTableRow(table, "University:", application.getUniversityName());
        addTableRow(table, "Status:", application.getStatus());
        addTableRow(table, "Created Date:", application.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        addTableRow(table, "Current Step:", application.getCurrentStep().toString());

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addPersonalInfo(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("PERSONAL INFORMATION", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{40, 60});

        addTableRow(table, "Full Name:", application.getFirstName() + " " + application.getLastName());
        addTableRow(table, "Email:", application.getEmail());
        addTableRow(table, "Phone:", application.getPhone());
        addTableRow(table, "WhatsApp:", application.getWhatsapp());
        addTableRow(table, "Date of Birth:", application.getDateOfBirth() != null ? 
            application.getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) : "N/A");
        addTableRow(table, "Place of Birth:", application.getPlaceOfBirth());
        addTableRow(table, "Gender:", application.getGender() != null ? application.getGender().toString() : "N/A");
        addTableRow(table, "Marital Status:", application.getMaritalStatus() != null ? 
            application.getMaritalStatus().toString() : "N/A");
        addTableRow(table, "Passport Number:", application.getPassportNumber());
        addTableRow(table, "Passport Expiry:", application.getPassportExpiry() != null ? 
            application.getPassportExpiry().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) : "N/A");
        addTableRow(table, "Country:", application.getCountry());
        addTableRow(table, "Full Address:", application.getFullAddress());
        addTableRow(table, "English Level:", application.getEnglishLevel() != null ? 
            application.getEnglishLevel().toString() : "N/A");
        addTableRow(table, "English Certificate:", application.getEnglishCertificate() != null ? 
            application.getEnglishCertificate().toString() : "N/A");
        if (application.getEnglishScore() != null && !application.getEnglishScore().isEmpty()) {
            addTableRow(table, "English Score:", application.getEnglishScore());
        }

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addEducationalBackground(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("EDUCATIONAL BACKGROUND", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        if (application.getEducationBackground() != null && !application.getEducationBackground().isEmpty()) {
            // Parse JSON and create table
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{30, 25, 15, 15, 15});

            // Headers
            addTableHeader(table, "School", "Major", "Started", "Finished", "Grade");

            // Add education entries (simplified - in real implementation, parse JSON)
            addTableRow(table, "Sample School", "Sample Major", "01/09/2020", "30/06/2024", "A+");

            document.add(table);
        } else {
            document.add(new Paragraph("No educational background provided", NORMAL_FONT));
        }
        document.add(Chunk.NEWLINE);
    }

    private void addWorkExperience(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("WORK EXPERIENCE", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        if (application.getWorkExperience() != null && !application.getWorkExperience().isEmpty()) {
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{25, 30, 15, 15, 15});

            // Headers
            addTableHeader(table, "Employer", "Job Title", "Started", "Finished", "Status");

            // Add work entries (simplified - in real implementation, parse JSON)
            addTableRow(table, "Sample Company", "Sample Position", "01/01/2023", "Present", "Active");

            document.add(table);
        } else {
            document.add(new Paragraph("No work experience provided", NORMAL_FONT));
        }
        document.add(Chunk.NEWLINE);
    }

    private void addFamilyInfo(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("FAMILY INFORMATION", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        if (application.getFamilyMembers() != null && !application.getFamilyMembers().isEmpty()) {
            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{20, 20, 20, 15, 15, 10});

            // Headers
            addTableHeader(table, "Name", "Nationality", "Email", "Workplace", "Position", "Relationship");

            // Add family members (simplified - in real implementation, parse JSON)
            addTableRow(table, "Sample Name", "Morocco", "sample@email.com", "Sample Workplace", "Sample Position", "Father");

            document.add(table);
        } else {
            document.add(new Paragraph("No family information provided", NORMAL_FONT));
        }
        document.add(Chunk.NEWLINE);
    }

    private void addFinancialGuarantor(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("FINANCIAL GUARANTOR", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{40, 60});

        addTableRow(table, "Relationship:", application.getGuarantorRelationship());
        addTableRow(table, "Name:", application.getGuarantorName());
        addTableRow(table, "Country:", application.getGuarantorCountry());
        addTableRow(table, "Address:", application.getGuarantorAddress());
        addTableRow(table, "Email:", application.getGuarantorEmail());
        addTableRow(table, "Workplace:", application.getGuarantorWorkplace());
        addTableRow(table, "Workplace Address:", application.getGuarantorWorkplaceAddress());

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addEmergencyContact(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("EMERGENCY CONTACT IN CHINA", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{40, 60});

        addTableRow(table, "Name:", application.getEmergencyName());
        addTableRow(table, "Country:", application.getEmergencyCountry());
        addTableRow(table, "Email:", application.getEmergencyEmail());
        addTableRow(table, "Address:", application.getEmergencyAddress());

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addDocumentsList(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("DOCUMENTS", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{50, 30, 20});

        // Headers
        addTableHeader(table, "Document Type", "Status", "File Path");

        // Add document entries
        addDocumentRow(table, "Passport Pages", application.getPassportPath());
        addDocumentRow(table, "Academic Certificate", application.getAcademicCertificatePath());
        addDocumentRow(table, "Academic Transcript", application.getAcademicTranscriptPath());
        addDocumentRow(table, "Language Certificate", application.getLanguageCertificatePath());
        addDocumentRow(table, "Physical Examination", application.getPhysicalExaminationPath());
        addDocumentRow(table, "Non-Criminal Certificate", application.getNonCriminalCertificatePath());
        addDocumentRow(table, "Bank Statement", application.getBankStatementPath());
        addDocumentRow(table, "Personal Photo", application.getPhotoPath());
        addDocumentRow(table, "Resume/CV", application.getResumePath());
        addDocumentRow(table, "Award Certificates", application.getAwardCertificatesPath());
        addDocumentRow(table, "Parent ID", application.getParentIdPath());

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addPaymentInfo(Document document, Application application) throws DocumentException {
        Paragraph section = new Paragraph("PAYMENT INFORMATION", SUBTITLE_FONT);
        section.setAlignment(Element.ALIGN_CENTER);
        document.add(section);
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{40, 60});

        addTableRow(table, "Payment Method:", application.getPaymentMethod());
        addTableRow(table, "Payment Status:", application.getPaymentStatus() != null ? 
            application.getPaymentStatus().toString() : "N/A");
        addTableRow(table, "Amount:", application.getPaymentAmount() + " " + application.getPaymentCurrency());
        addTableRow(table, "Application Fees:", application.getApplicationFees());
        addTableRow(table, "Service Fees:", application.getServiceFees());

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addFooter(Document document) throws DocumentException {
        document.add(new LineSeparator(1f, 100f, BaseColor.GRAY, Element.ALIGN_CENTER, -2f));
        document.add(Chunk.NEWLINE);
        
        Paragraph footer = new Paragraph();
        footer.add(new Chunk("Generated by " + companyName + " - " + 
            java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), SMALL_FONT));
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);
    }

    private void addTableRow(PdfPTable table, String label, String value) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, HEADER_FONT));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        
        PdfPCell valueCell = new PdfPCell(new Phrase(value != null ? value : "N/A", NORMAL_FONT));
        valueCell.setBorder(Rectangle.NO_BORDER);
        
        table.addCell(labelCell);
        table.addCell(valueCell);
    }

    private void addTableRow(PdfPTable table, String... values) {
        for (String value : values) {
            PdfPCell cell = new PdfPCell(new Phrase(value != null ? value : "N/A", NORMAL_FONT));
            cell.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell);
        }
    }

    private void addTableHeader(PdfPTable table, String... headers) {
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, HEADER_FONT));
            cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }
    }

    private void addDocumentRow(PdfPTable table, String documentType, String filePath) {
        table.addCell(new PdfPCell(new Phrase(documentType, NORMAL_FONT)));
        
        String status = (filePath != null && !filePath.isEmpty()) ? "Uploaded" : "Not Uploaded";
        PdfPCell statusCell = new PdfPCell(new Phrase(status, NORMAL_FONT));
        statusCell.setBackgroundColor(status.equals("Uploaded") ? BaseColor.GREEN : BaseColor.RED);
        table.addCell(statusCell);
        
        table.addCell(new PdfPCell(new Phrase(filePath != null ? filePath : "N/A", SMALL_FONT)));
    }

    public String savePDFToFile(byte[] pdfBytes, String applicationId) {
        try {
            String fileName = "application_" + applicationId + "_" + 
                java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".pdf";
            String filePath = pdfOutputPath + fileName;
            
            java.nio.file.Files.createDirectories(java.nio.file.Paths.get(pdfOutputPath));
            
            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(pdfBytes);
            }
            
            log.info("PDF saved to file: {}", filePath);
            return filePath;
            
        } catch (Exception e) {
            log.error("Error saving PDF to file for application: {}", applicationId, e);
            throw new RuntimeException("Failed to save PDF to file", e);
        }
    }

    /**
     * Générer un reçu de paiement simple
     */
    public byte[] generateReceipt(Map<String, Object> receiptData) {
        try {
            Document document = new Document(PageSize.A4, 50, 50, 50, 50);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, baos);

            document.open();
            
            // Header
            addReceiptHeader(document);
            
            // Informations du reçu
            addReceiptInfo(document, receiptData);
            
            // Détails du paiement
            addPaymentDetails(document, receiptData);
            
            // Footer
            addReceiptFooter(document);
            
            document.close();
            
            log.info("Receipt generated successfully for application: {}", receiptData.get("applicationId"));
            return baos.toByteArray();
            
        } catch (Exception e) {
            log.error("Error generating receipt", e);
            throw new RuntimeException("Failed to generate receipt", e);
        }
    }

    private void addReceiptHeader(Document document) throws DocumentException {
        Paragraph header = new Paragraph();
        header.setAlignment(Element.ALIGN_CENTER);
        header.add(new Chunk(companyName, TITLE_FONT));
        header.add(Chunk.NEWLINE);
        header.add(new Chunk(companyAddress, NORMAL_FONT));
        header.add(Chunk.NEWLINE);
        header.add(new Chunk("Tel: " + companyPhone + " | Email: " + companyEmail, SMALL_FONT));
        header.add(Chunk.NEWLINE);
        header.add(new Chunk("=", NORMAL_FONT));
        document.add(header);
        document.add(Chunk.NEWLINE);
    }

    private void addReceiptInfo(Document document, Map<String, Object> receiptData) throws DocumentException {
        Paragraph info = new Paragraph();
        info.add(new Chunk("RECEIPT / REÇU", SUBTITLE_FONT));
        info.add(Chunk.NEWLINE);
        info.add(new Chunk("Application ID: " + receiptData.get("applicationId"), NORMAL_FONT));
        info.add(Chunk.NEWLINE);
        info.add(new Chunk("Date: " + receiptData.get("paymentDate"), NORMAL_FONT));
        info.add(Chunk.NEWLINE);
        info.add(new Chunk("Status: " + receiptData.get("paymentStatus"), NORMAL_FONT));
        info.add(Chunk.NEWLINE);
        document.add(info);
        document.add(Chunk.NEWLINE);
    }

    private void addPaymentDetails(Document document, Map<String, Object> receiptData) throws DocumentException {
        Paragraph details = new Paragraph();
        details.add(new Chunk("PAYMENT DETAILS / DÉTAILS DU PAIEMENT", SUBTITLE_FONT));
        details.add(Chunk.NEWLINE);
        
        // Student info
        details.add(new Chunk("Student / Étudiant: " + receiptData.get("studentName"), NORMAL_FONT));
        details.add(Chunk.NEWLINE);
        details.add(new Chunk("Program / Programme: " + receiptData.get("programName"), NORMAL_FONT));
        details.add(Chunk.NEWLINE);
        details.add(new Chunk("University / Université: " + receiptData.get("universityName"), NORMAL_FONT));
        details.add(Chunk.NEWLINE);
        details.add(Chunk.NEWLINE);
        
        // Payment breakdown
        details.add(new Chunk("Application Fee / Frais d'inscription: " + receiptData.get("applicationFee") + " MAD", NORMAL_FONT));
        details.add(Chunk.NEWLINE);
        details.add(new Chunk("Service Fee / Frais de service: " + receiptData.get("serviceFee") + " MAD", NORMAL_FONT));
        details.add(Chunk.NEWLINE);
        details.add(new Chunk("Total Amount / Montant total: " + receiptData.get("totalAmount") + " MAD", HEADER_FONT));
        details.add(Chunk.NEWLINE);
        
        document.add(details);
        document.add(Chunk.NEWLINE);
    }

    private void addReceiptFooter(Document document) throws DocumentException {
        Paragraph footer = new Paragraph();
        footer.setAlignment(Element.ALIGN_CENTER);
        footer.add(new Chunk("Thank you for choosing DIRAVENIR!", NORMAL_FONT));
        footer.add(Chunk.NEWLINE);
        footer.add(new Chunk("Merci d'avoir choisi DIRAVENIR!", NORMAL_FONT));
        footer.add(Chunk.NEWLINE);
        footer.add(new Chunk("This receipt is proof of payment.", SMALL_FONT));
        footer.add(Chunk.NEWLINE);
        footer.add(new Chunk("Ce reçu est une preuve de paiement.", SMALL_FONT));
        document.add(footer);
    }
}
