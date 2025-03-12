// src/components/ui/ActionsColumn.tsx

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ActionColumnProps<T> {
    item: T;
    onEdit: (item: T) => void;
    onDelete: (id: string) => void;
    children?: React.ReactNode;
}

const ActionsColumn = <T extends { id: string }>({
    item,
    onEdit,
    onDelete,
    children,
}: ActionColumnProps<T>) => {
    return (
        <div className="flex space-x-2 ">
            {children}
            <Button
                variant={"ghost"}
                onClick={() => onEdit(item)}
                className="h-8 px-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
                <Pencil /> Editar
            </Button>
            <Button
                variant={"ghost"}
                onClick={() => onDelete(item.id)}
                className="h-8 px-2 text-red-400 hover:text-white hover:bg-red-900/50"
            >
                <Trash2 /> Eliminar
            </Button>
        </div>
    );
};

export default ActionsColumn;
