import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Status } from "@/types/status";
import React from "react";
import { useForm } from "react-hook-form";

type SaleStatusFormProps = {
    onSubmit: (data: Status) => void;
    initialData?: Status;
};

const SaleStatusForm: React.FC<SaleStatusFormProps> = ({
    onSubmit,
    initialData,
}) => {
    const form = useForm<Status>({
        defaultValues: initialData || {
            name: "",
            code: "",
            description: "",
        },
    });

    const handleSubmit = (values: Status) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Nombre"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Código"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Descripción"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Guardar
                </Button>
            </form>
        </Form>
    );
};

export default SaleStatusForm;
