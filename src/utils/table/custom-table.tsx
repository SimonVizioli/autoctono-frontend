// src/components/table/shadcn-table.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableColumn<T> {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode; // Agregamos soporte para render personalizado
}

interface CustomTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
}

const CustomTable = <T,>({ data, columns }: CustomTableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={String(col.key)}>
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)}>
                                        {col.render
                                            ? col.render(row)
                                            : String(row[col.key])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center"
                            >
                                No hay datos disponibles.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomTable;
