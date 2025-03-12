import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    EyeOff,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// Importa tu componente Skeleton desde shadcn/ui (o el que tengas definido)
import { Skeleton } from "@/components/ui/skeleton";

export interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[] | CustomColumn<TData>[];
    initialFilters?: ColumnFiltersState;
}

/**
 * Opciones personalizadas para definir columnas.
 */
export interface CustomColumn<TData> {
    key: keyof TData | string;
    label: string;
    render?: (item: TData) => React.ReactNode;
    /**
     * Si es false, se desactiva la funcionalidad de ordenamiento y se renderiza el label directamente.
     * Por defecto es true.
     */
    sortable?: boolean;
}

/**
 * Header ordenable. Muestra un botón con dropdown para:
 * - Orden Ascendente
 * - Orden Descendente
 * - Limpiar orden
 * - Ocultar columna
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SortableHeader({ column, label }: { column: any; label: string }) {
    const currentSort = column.getIsSorted();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                    {label}
                    {currentSort === "asc" ? (
                        <ArrowUp className="w-4 h-4" />
                    ) : currentSort === "desc" ? (
                        <ArrowDown className="w-4 h-4" />
                    ) : (
                        <ArrowUpDown className="w-4 h-4" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="bg-slate-900 border-slate-700 text-slate-200"
            >
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                    <ArrowUp className="mr-2 w-4 h-4" /> Ascendente
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                    <ArrowDown className="mr-2 w-4 h-4" /> Descendente
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.clearSorting()}>
                    <ArrowUpDown className="mr-2 w-4 h-4" /> Limpiar Orden
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => column.toggleVisibility(false)}
                >
                    <EyeOff className="mr-2 w-4 h-4" /> Ocultar Columna
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/**
 * DataTable: componente genérico que:
 * - Renderiza la tabla con data y columnas pasadas por props.
 * - Si isLoading es true, muestra un skeleton.
 * - Envuelve el contenido en un motion.div para animación de entrada.
 */
function DataTable<TData>({
    data,
    columns,
    initialFilters = [],
}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>(initialFilters);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Convertir columnas en formato CustomColumn a ColumnDef si es necesario.
    const tableColumns: ColumnDef<TData>[] =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "0" in columns && typeof (columns as any)[0].key !== "undefined"
            ? (columns as CustomColumn<TData>[]).map((col) => ({
                  accessorKey:
                      typeof col.key === "string" ? col.key : String(col.key),
                  header:
                      col.sortable !== false &&
                      col.key !== "acciones" &&
                      col.key !== "seleccionar"
                          ? ({ column }) => (
                                <SortableHeader
                                    column={column}
                                    label={col.label}
                                />
                            )
                          : col.label,
                  cell: ({ row, getValue }) =>
                      col.render
                          ? col.render(row.original)
                          : String(getValue()),
                  enableSorting: col.sortable !== false,
                  enableHiding:
                      col.key !== "acciones" && col.key !== "seleccionar",
              }))
            : (columns as ColumnDef<TData>[]);

    const table = useReactTable({
        data,
        columns: tableColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // Renderiza el skeleton de la tabla
    const renderSkeleton = () => (
        <div className="rounded-lg border border-slate-800 overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-900">
                    {table.getHeaderGroups().map((headerGroup) => (
                        // En el header no se aplica hover
                        <TableRow
                            key={headerGroup.id}
                            className="border-slate-800"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    <Skeleton className="h-6 w-full" />
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            {table.getAllColumns().map((col) => (
                                <TableCell key={col.id}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    // Renderiza las filas de datos
    const renderRows = () => (
        <div className="rounded-lg border border-slate-800 overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-900">
                    {table.getHeaderGroups().map((headerGroup) => (
                        // Quita el hover en el header
                        <TableRow
                            key={headerGroup.id}
                            className="border-slate-800"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-slate-300 font-medium"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="border-slate-800"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="px-4">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            {/* Renderizado condicional: Skeleton si se está cargando, de lo contrario renderiza las filas */}
            {table.options.data ? renderRows() : renderSkeleton()}

            {/* Paginación: Página actual / Total de páginas */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="h-8 w-8 border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                    <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="h-8 w-8 border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-slate-400 px-2">
                    Pagína{" "}
                    <span className="font-medium text-white">
                        {table.getState().pagination.pageIndex + 1}
                    </span>{" "}
                    de{" "}
                    <span className="font-medium text-white">
                        {table.getPageCount()}
                    </span>
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="h-8 w-8 border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="h-8 w-8 border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                    <ChevronsRight className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    );
}

export default DataTable;
