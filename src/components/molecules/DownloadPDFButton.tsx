import React from "react";
import jsPDF from "jspdf";

interface Report {
  reportId: string;
  userId: string;
  generationDate: string; // ISO string
  grammarScore: number;
  vocabularyScore: number;
  feedback: string;
}

interface Props {
  report: Report;
}

const DownloadPdfButton: React.FC<Props> = ({ report }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de Sesión", 20, 20);

    doc.setFontSize(12);
    doc.text(`ID del Reporte: ${report.reportId}`, 20, 35);
    doc.text(`ID del Usuario: ${report.userId}`, 20, 45);
    doc.text(
      `Fecha: ${new Date(report.generationDate).toLocaleString()}`,
      20,
      55
    );
    doc.text(`Puntaje Gramática: ${report.grammarScore}`, 20, 65);
    doc.text(`Puntaje Vocabulario: ${report.vocabularyScore}`, 20, 75);

    doc.setFontSize(14);
    doc.text("Feedback de la IA:", 20, 90);
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(report.feedback, 170), 20, 100);

    doc.save("reporte.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
    >
      Descargar reporte PDF
    </button>
  );
};

export default DownloadPdfButton;
