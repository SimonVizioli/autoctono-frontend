// src/utils/crud.tsx
import React, { useState } from "react";
import CustomTable from "../table/custom-table";
import ActionsColumn from "../actions/action-column";
import Modal from "../modal/modal";
import { Button } from "@/components/ui/button";

interface CrudProps<T> {
    columns: { key: keyof T; label: string }[];
    data: T[];
    title?: React.ReactElement;
    fetchAll: () => Promise<T[]>;
    create: (data: T) => Promise<void>;
    update: (data: T) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
    FormComponent: React.FC<{ onSubmit: (data: T) => void; initialData?: T }>;
    renderActionsColumn?: (item: T) => React.ReactNode; // Nueva prop para acciones
}

const Crud = <T extends { id: string }>({
    columns,
    data,
    title,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchAll,
    create,
    update,
    deleteEntry,
    FormComponent,
}: CrudProps<T>) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);

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

    return (
        <div className="container mx-auto p-4 bg-background rounded-md shadow-md">
            <div className="flex justify-between">
                <div>{title}</div>
                <Button onClick={() => openModal()}>Crear Nuevo</Button>
            </div>

            <CustomTable
                columns={[
                    ...columns,
                    {
                        key: "acciones" as keyof T,
                        label: "Acciones",
                        render: (item: T) => (
                            <ActionsColumn
                                item={item}
                                onEdit={() => openModal(item)}
                                onDelete={() => handleDelete(item.id)}
                            />
                        ),
                    },
                ]}
                data={data}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Editar" : "Crear Nuevo"}
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
