// src/components/ui/ActionsColumn.tsx

import { Button } from "@/components/ui/button";

interface ActionColumnProps<T> {
    item: T;
    onEdit: (item: T) => void;
    onDelete: (id: string) => void;
}

const ActionsColumnColumn = <T extends { id: string }>({
    item,
    onEdit,
    onDelete,
}: ActionColumnProps<T>) => {
    return (
        <div className="flex space-x-2">
            <Button variant={"ghost"} onClick={() => onEdit(item)}>
                Editar
            </Button>
            <Button variant={"destructive"} onClick={() => onDelete(item.id)}>
                Eliminar
            </Button>
        </div>
    );
};

export default ActionsColumnColumn;
