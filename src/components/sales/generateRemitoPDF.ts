import { Sales } from "@/types/sales";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Importar íconos / imágenes en base64 o ruta
import facebookIcon from "@/assets/icons/facebook.png";
import instagramIcon from "@/assets/icons/instagram.png";
import phoneIcon from "@/assets/icons/phone.png";
import logo from "@/assets/icons/logo.jpeg"; // Ajusta la ruta si es distinta

export const generateRemitoPDF = (sale: Sales) => {
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
    // 2) Encabezado (borde redondeado) con Logo, Fecha, Nombre y Teléfono
    // ---------------------------------------------------------
    // Rectángulo redondeado para el encabezado
    // (x=10, y=10, ancho=190, alto=40, radio=3)
    doc.roundedRect(10, 10, 190, 40, 2, 2);

    // Logo (arriba a la izquierda)
    // Ajusta posición y tamaño según tu necesidad
    doc.addImage(logo, "JPEG", 15, 11, 35, 35);

    // Fecha (arriba a la derecha)
    doc.setFontSize(15);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 20);

    // Nombre y Teléfono (misma línea, debajo de la fecha y logo)
    const nombreCliente = sale.customer.id
        ? `${sale.customer.lastName}, ${sale.customer.firstName}`
        : "Cliente desconocido";
    const telefonoCliente = sale.customer.contactNumber || "No especificado";

    // Ejemplo: Nombre a la izquierda, Teléfono a la derecha
    doc.text(`Nombre: ${nombreCliente}`, 120, 38, { charSpace: 1 });
    doc.text(`Teléfono: ${telefonoCliente}`, 120, 45, { charSpace: 1 });

    // ---------------------------------------------------------
    // 3) Sección de la tabla (con borde redondeado)
    // ---------------------------------------------------------
    // Rectángulo para el cuerpo de la tabla
    // (x=10, y=55, ancho=190, alto=170, radio=3) - ajusta si necesitas más/menos alto
    doc.roundedRect(10, 55, 190, 235, 2, 2);

    // Tabla de productos
    // Comienza en Y=55 + un pequeño margen
    const tableStartY = 55;

    autoTable(doc, {
        startY: tableStartY + 5,
        margin: { left: 15, right: 15 }, // Para no pegar a los bordes del rectángulo
        head: [["Cant.", "Descripción", "Desc. (%)", "Precio U.", "Subtotal"]],
        body: sale.productSales.map((item) => {
            const quantity = item.quantity || 1;
            const detail = item.product?.detail || "Sin descripción";
            const discount = item?.percentageDiscount || 0; // descuento en %
            const unitPrice = item.unitPrice || 0;

            // Cálculo del total por producto:
            const subtotal = quantity * unitPrice;

            return [
                String(quantity),
                detail,
                `${discount}%`,
                `$${unitPrice}`,
                `$${subtotal * ((100 - discount) / 100)}`,
            ];
        }),
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

    // Posición final de la tabla
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).autoTable.previous?.finalY || tableStartY + 20;

    // ---------------------------------------------------------
    // 4) Calcular y mostrar el Total Global
    // ---------------------------------------------------------
    // Recorremos los productos para sumar con la misma fórmula
    const totalGlobal = sale.productSales.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        const discount = item?.percentageDiscount || 0;
        const unitPrice = item.unitPrice || 0;
        const subtotal = quantity * unitPrice;
        console.log(
            "acc",
            acc,
            "subtotal",
            subtotal,
            "descuento",
            (100 - discount) / 100
        );
        return acc + subtotal * ((100 - discount) / 100);
    }, 0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    // Ubicamos el texto cerca del borde derecho del recuadro de la tabla
    // (ajusta Y según tu preferencia)
    doc.text(`IVA: ${sale.iva}%`, 165, finalY + 10);
    doc.text(`Total: $${totalGlobal.toFixed(2)}`, 165, finalY + 20);

    // ---------------------------------------------------------
    // 5) Pie con íconos (borde redondeado)
    // ---------------------------------------------------------
    doc.line(10, 265, 200, 265); // Línea horizontal

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
    // 6) Guardar/descargar el PDF
    // ---------------------------------------------------------
    doc.save(`Remito_Venta_${sale.id}.pdf`);
};
