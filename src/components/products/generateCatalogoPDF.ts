import { Product } from "@/types/product";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Importar íconos / imágenes en base64 o ruta
import facebookIcon from "@/assets/icons/facebook.png";
import instagramIcon from "@/assets/icons/instagram.png";
import phoneIcon from "@/assets/icons/phone.png";
import logo from "@/assets/icons/logo.jpeg"; // Ajusta la ruta si es distinta

export const generateCatalogPDF = (products: Product[]) => {
    // 1) Crear documento A4
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    // Ajustes de color de línea y grosor (gris claro)
    doc.setDrawColor(160);
    doc.setLineWidth(0.5);

    // ---------------------------------------------------------
    // 2) Encabezado con Logo, Fecha y Título del Catálogo
    // ---------------------------------------------------------
    // Rectángulo redondeado para el encabezado (x=10, y=10, ancho=190, alto=40, radio=2)
    doc.roundedRect(10, 10, 190, 40, 2, 2);

    // Logo (arriba a la izquierda)
    doc.addImage(logo, "JPEG", 15, 11, 35, 35);

    // Fecha (arriba a la derecha)
    doc.setFontSize(15);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 20);

    // Título del Catálogo (centrado en el header)
    doc.setFontSize(18);
    doc.text("Catálogo de Productos", 110, 45, { charSpace: 1 });

    // ---------------------------------------------------------
    // 3) Sección de la tabla (con borde redondeado)
    // ---------------------------------------------------------
    // Rectángulo para el cuerpo de la tabla (x=10, y=55, ancho=190, alto=235, radio=2)
    doc.roundedRect(10, 55, 190, 235, 2, 2);

    // Tabla de productos: columnas Código, Nombre, Detalle y Precio
    const tableStartY = 55;
    autoTable(doc, {
        startY: tableStartY + 5,
        margin: { left: 15, right: 15 },
        head: [["Código", "Nombre", "Detalle", "Precio"]],
        body: products.map((product) => [
            product.code,
            product.name,
            product.detail,
            `$${product.price.toFixed(2)}`,
        ]),
        theme: "grid",
        styles: {
            fontSize: 10,
            cellPadding: 3,
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontStyle: "bold",
        },
        tableLineColor: 160,
        tableLineWidth: 0.5,
    });

    // ---------------------------------------------------------
    // 4) Pie con íconos (borde redondeado)
    // ---------------------------------------------------------
    // Línea horizontal de separación
    doc.line(10, 265, 200, 265);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    // Íconos y textos centrados en ese rectángulo
    const iconSize = 7;
    const iconY = 275; // un poco debajo del borde superior

    // Instagram
    doc.addImage(instagramIcon, "PNG", 25, iconY, iconSize, iconSize);
    doc.text("Ceramica.Pellizzer", 35, iconY + 5);

    // Teléfono
    doc.addImage(phoneIcon, "PNG", 80, iconY, iconSize, iconSize);
    doc.text("2616673847", 90, iconY + 5);

    // Facebook
    doc.addImage(facebookIcon, "PNG", 135, iconY, iconSize, iconSize);
    doc.text("Ceramica/Pellizzer", 145, iconY + 5);

    // ---------------------------------------------------------
    // 5) Guardar/descargar el PDF
    // ---------------------------------------------------------
    doc.save("Catalogo_Productos.pdf");
};
