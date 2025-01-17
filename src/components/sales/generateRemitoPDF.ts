import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Sales } from "@/types/sales";
import { fakeCustomers, fakeStatuses } from "@/data/fake-data";

export const generateRemitoPDF = (sale: Sales) => {
    const doc = new jsPDF();

    // Buscar cliente y estado en los datos falsos
    const cliente =
        fakeCustomers.find((c) => c.id === sale.cliente_id)?.nombre ||
        "Cliente desconocido";
    const estado =
        fakeStatuses.find((s) => s.id === sale.estado_id)?.label ||
        "Estado desconocido";

    // Configurar título del documento
    doc.setFontSize(16);
    doc.text("Remito de Venta", 14, 20);

    // Información de la venta
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Cliente: ${cliente}`, 14, 40);
    doc.text(`Estado: ${estado}`, 14, 50);
    doc.text(`Detalle: ${sale.detalle}`, 14, 60);

    // Formatear productos en una tabla
    const productosTabla = sale.productos.map((producto, index) => [
        index + 1,
        producto.detalle || "Producto sin descripción",
        producto.cantidad || 1,
        `$${producto.precioUnitario.toFixed(2)}`,
        `$${((producto.cantidad || 1) * producto.precioUnitario).toFixed(2)}`,
    ]);

    // Agregar tabla de productos
    autoTable(doc, {
        startY: 70,
        head: [["#", "Producto", "Cantidad", "Precio Unitario", "Total"]],
        body: productosTabla,
    });

    // Obtener la posición final de la tabla usando `doc.autoTable.previous.finalY`
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).autoTable.previous?.finalY || 90;

    // Total de la venta
    doc.setFontSize(14);
    doc.text(`Total: $${sale.total.toFixed(2)}`, 14, finalY + 10);

    // Descargar el PDF
    doc.save(`Remito_Venta_${sale.id}.pdf`);
};
