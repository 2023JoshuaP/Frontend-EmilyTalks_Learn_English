import React from "react";
import jsPDF from "jspdf";

interface ReportInput {
  generationDate: string;
  grammarScore: number;
  vocabularyScore: number;
  feedback: string;
}

const DownloadPdfButton: React.FC<{ report: ReportInput }> = ({ report }) => {
  const handleDownload = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users/verifyToken", {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) {
        alert("Sesión expirada. Vuelve a iniciar sesión.");
        return;
      }

      const userDTO = await res.json();
      const userId = userDTO.id.value;
      const username = userDTO.username;
      const email = userDTO.email;

      // Guardar el reporte en backend
      await fetch("http://localhost:8080/api/reports/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          ...report
        })
      });

      // Generar el PDF con todos los datos
      generatePdf({
        reportId: generateRandomId(),
        userId,
        username,
        email,
        ...report
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al generar el PDF");
    }
  };

  const generateRandomId = (): string => {
    return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generatePdf = async (report: {
    reportId: string;
    userId: string;
    username: string;
    email: string;
    generationDate: string;
    grammarScore: number;
    vocabularyScore: number;
    feedback: string;
  }) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    try {
      const imageData = await getBase64ImageFromURL("/logo.png");

      doc.setFillColor(0, 63, 92);
      doc.rect(0, 0, pageWidth, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text("EmilyTalks", 20, 20);
      doc.addImage(imageData, "PNG", pageWidth - 45, 7, 30, 15);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Reporte de Sesión", pageWidth / 2, 45, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);

      let y = 60;
      const lineSpacing = 8;

      const drawLabelValue = (label: string, value: string) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, 20, y);
        doc.setFont("helvetica", "normal");
        doc.text(value, 70, y);
        y += lineSpacing;
      };

      drawLabelValue("ID del Reporte:", report.reportId);
      drawLabelValue("ID del Usuario:", report.userId);
      drawLabelValue("Usuario:", report.username);
      drawLabelValue("Correo:", report.email);
      drawLabelValue("Fecha de Generación:", new Date(report.generationDate).toLocaleString());

      y += 5;
      doc.setFillColor(224, 236, 247);
      doc.roundedRect(20, y, 170, 20, 4, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 63, 92);
      doc.text(`Gramática: ${report.grammarScore}`, 25, y + 13);
      doc.text(`Vocabulario: ${report.vocabularyScore}`, 100, y + 13);
      y += 30;

      doc.setDrawColor(200);
      doc.line(20, y, pageWidth - 20, y);
      y += 10;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Feedback de la IA:", 20, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      const feedbackLines = doc.splitTextToSize(report.feedback, 170);
      doc.text(feedbackLines, 20, y);

      doc.save("reporte_emilytalks.pdf");
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Hubo un problema generando el PDF");
    }
  };

  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("No se pudo obtener contexto");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject("No se pudo cargar la imagen");
      img.src = url;
    });
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
