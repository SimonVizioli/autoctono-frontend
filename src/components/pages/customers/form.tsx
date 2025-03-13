// src/pages/customers/customer-form.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerSchema } from "@/utils/schema";

interface CustomerFormProps {
    onSubmit: (data: Customer) => void;
    initialData?: Customer;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
    onSubmit,
    initialData,
}) => {
    const form = useForm<Customer>({
        resolver: zodResolver(CustomerSchema),
        defaultValues: initialData || {
            companyName: "",
            firstName: "",
            lastName: "",
            email: "",
            cuit: "",
            contactNumber: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
    }, [initialData, form]);

    const handleSubmit = (data: Customer) => {
        onSubmit(data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 bg-card p-6 rounded-lg shadow-md"
            >
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Razón Social</FormLabel>
                            <FormControl>
                                <Input placeholder="Empresa XYZ" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Juan" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input placeholder="Pérez" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="juan.perez@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cuit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cuit</FormLabel>
                            <FormControl>
                                <Input placeholder="20-12345678-9" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de contacto</FormLabel>
                            <FormControl>
                                <Input placeholder="261-1234567" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium transition-all duration-300"
                >
                    Guardar
                </Button>
            </form>
        </Form>
    );
};

export default CustomerForm;
