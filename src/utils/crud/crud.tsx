import React, { useState } from "react";
import CustomTable from "../table/custom-table";
import ActionsColumn from "../actions/action-column";
import Modal from "../modal/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FilterDefinition<T> {
    key: keyof T;
    label: string;
    render?: (item: T, filterValue: string) => boolean;
}

interface CrudProps<T> {
    columns: {
        key: keyof T;
        label: string;
        render?: (item: T) => React.ReactNode;
    }[];
    data: T[];
    title?: React.ReactElement;
    customModalHeader?: string;
    fetchAll: () => Promise<T[]>;
    create: (data: T) => Promise<void>;
    update: (data: T) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
    FormComponent: React.FC<{ onSubmit: (data: T) => void; initialData?: T }>;
    renderActionsColumn?: (item: T) => React.ReactNode;
    enableSelection?: boolean;
    selectedItems?: string[];
    onSelectItem?: (id: string) => void;
    filters?: FilterDefinition<T>[];
}

const Crud = <T extends { id: string }>({
    columns,
    data,
    title,
    customModalHeader,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchAll,
    create,
    update,
    deleteEntry,
    FormComponent,
    renderActionsColumn,
    enableSelection,
    selectedItems,
    onSelectItem,
    filters,
}: CrudProps<T>) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
    const [filterValues, setFilterValues] = useState<Record<string, string>>(
        {}
    );

    const openModal = (item?: T) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedItem(undefined);
    };

    const handleDelete = async (id: string) => {
        await deleteEntry(id);
    };

    // Función que aplica los filtros basándose en los campos definidos
    const applyFilters = (data: T[]): T[] => {
        if (!filters || filters.length === 0) return data;
        return data.filter((item) =>
            filters.every((filterDef) => {
                const filterValue = filterValues[filterDef.key as string] || "";
                if (!filterValue) return true;
                if (filterDef.render) {
                    // Usa la función personalizada para filtrar
                    return filterDef.render(item, filterValue);
                } else {
                    // Comparación por defecto: convertir el valor del item a string y ver si incluye el filtro
                    const itemValue = (item[filterDef.key] as unknown)
                        ?.toString()
                        .toLowerCase();
                    return itemValue?.includes(filterValue.toLowerCase());
                }
            })
        );
    };

    const filteredData = applyFilters(data);

    return (
        <div className="container mx-auto p-4 bg-background rounded-md shadow-md">
            <div className="flex justify-between">
                <div>{title}</div>

                <Button onClick={() => openModal()}>Crear Nuevo</Button>
            </div>
            <div className="flex space-x-4 mb-1">
                {filters &&
                    filters.map((filter) => (
                        <div
                            key={filter.key as string}
                            className="flex flex-col"
                        >
                            <Label className="text-sm font-medium">
                                {filter.label}
                            </Label>
                            <Input
                                type="text"
                                placeholder={filter.label}
                                value={filterValues[filter.key as string] || ""}
                                onChange={(e) =>
                                    setFilterValues({
                                        ...filterValues,
                                        [filter.key as string]: e.target.value,
                                    })
                                }
                                className="p-1"
                            />
                        </div>
                    ))}
            </div>

            <CustomTable
                columns={[
                    ...(enableSelection
                        ? [
                              {
                                  key: "seleccionar" as keyof T,
                                  label: "✔",
                                  render: (item: T) => (
                                      <input
                                          type="checkbox"
                                          checked={selectedItems?.includes(
                                              item.id
                                          )}
                                          onChange={() =>
                                              onSelectItem &&
                                              onSelectItem(item.id)
                                          }
                                      />
                                  ),
                              },
                          ]
                        : []),
                    ...columns,
                    {
                        key: "acciones" as keyof T,
                        label: "Acciones",
                        render: (item: T) => (
                            <ActionsColumn
                                item={item}
                                onEdit={() => openModal(item)}
                                onDelete={() => handleDelete(item.id)}
                            >
                                {renderActionsColumn
                                    ? renderActionsColumn(item)
                                    : null}
                            </ActionsColumn>
                        ),
                    },
                ]}
                data={filteredData}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    selectedItem
                        ? "Editar"
                        : customModalHeader
                        ? customModalHeader
                        : "Crear nuevo"
                }
                className="max-w-4xl"
            >
                <FormComponent
                    onSubmit={async (data: T) => {
                        if (selectedItem) {
                            await update(data);
                        } else {
                            await create(data);
                        }
                        closeModal();
                    }}
                    initialData={selectedItem}
                />
            </Modal>
        </div>
    );
};

export default Crud;
