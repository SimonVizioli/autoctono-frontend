import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Sales } from "@/types/sales";
import { fakeCustomers, fakeStatuses } from "@/data/fake-data";

// Importar imágenes en Base64
import phoneIcon from "@/assets/icons/phone.png";
import instagramIcon from "@/assets/icons/instagram.png";
import facebookIcon from "@/assets/icons/facebook.png";

export const generateRemitoPDF = (sale: Sales) => {
    console.log("sale", sale);

    const doc = new jsPDF();

    // Buscar cliente y estado en los datos falsos
    const cliente =
        fakeCustomers.find((c) => c.id === sale.cliente_id)?.nombre ||
        "Cliente desconocido";
    const estado =
        fakeStatuses.find((s) => s.id === sale.estado_id)?.label ||
        "Estado desconocido";

    // Obtener altura total de la página
    const pageHeight = doc.internal.pageSize.height;

    // 📌 Pie de Página con Iconos y Redes Sociales (Siempre en la parte inferior)
    const footerY = pageHeight - 20; // Fijar el pie de página en la parte inferior

    // 📌 Cambiar Fuente del Título a una más llamativa
    doc.setFontSize(20);
    doc.setFont("times", "bold"); // Cambiar "times" por otra fuente si se carga una personalizada
    doc.text("CERÁMICA PELLIZER", 105, 15, { align: "center" });

    // 📌 Tabla de Datos del Remito (sin bordes internos)
    autoTable(doc, {
        startY: 25,
        theme: "plain",
        styles: { fontSize: 10, cellPadding: 1, lineWidth: 0.5 },
        tableLineColor: [0, 0, 0], // Borde externo negro
        tableLineWidth: 0.5,
        body: [
            ["Fecha:", new Date().toLocaleDateString()],
            ["Cliente:", cliente],
            ["Estado:", estado],
            ["Descripción:", sale.detail],
        ],
    });

    // Posición final de la tabla de datos
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataFinalY = (doc as any).autoTable.previous?.finalY || 40;

    // 📌 Tabla de Productos (con color gris)
    autoTable(doc, {
        startY: dataFinalY + 10,
        head: [["Cantidad", "Producto", "Precio Unitario"]],
        body: sale.productos.map((producto) => [
            producto.cantidad || 1,
            producto.detail || "Producto sin descripción",
            `$${producto.precioUnitario.toFixed(2)}`,
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: {
            fillColor: [220, 220, 220], // Color gris
            textColor: 0,
            fontStyle: "bold",
        },
    });

    // Posición final de la tabla de productos
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productsFinalY = (doc as any).autoTable.previous?.finalY || 90;

    // 📌 Total alineado a la derecha
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text(`Total: $${sale.total.toFixed(2)}`, 165, productsFinalY + 15);

    // 📌 Línea separadora antes del pie de página
    doc.setLineWidth(0.5);
    doc.line(10, footerY - 10, 200, footerY - 10);

    // 📌 Pie de Página con Iconos y Redes Sociales
    const iconSize = 7;

    // Teléfono
    doc.addImage(phoneIcon, "PNG", 10, footerY, iconSize, iconSize);
    doc.text("2616673847", 20, footerY + 5);

    // Instagram
    doc.addImage(instagramIcon, "PNG", 80, footerY, iconSize, iconSize);
    doc.text("@ceramica.pellizer", 90, footerY + 5);

    // Facebook
    doc.addImage(facebookIcon, "PNG", 150, footerY, iconSize, iconSize);
    doc.text("ceramicapellizer", 160, footerY + 5);

    // 📌 Descargar el PDF
    doc.save(`Remito_Venta_${sale.id}.pdf`);
};
