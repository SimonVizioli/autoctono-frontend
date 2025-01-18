import React, { useState } from "react";
import CustomTable from "../table/custom-table";
import ActionsColumn from "../actions/action-column";
import Modal from "../modal/modal";
import { Button } from "@/components/ui/button";

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
                data={data}
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
