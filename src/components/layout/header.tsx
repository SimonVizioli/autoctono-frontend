import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Boxes, Search, User } from "lucide-react";
import { Link } from "react-router";

export function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <Boxes className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                CeramicStock
                            </span>
                        </Link>
                        <nav className="hidden md:ml-6 md:flex md:space-x-4">
                            <Link
                                to="/inventory"
                                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Inventory
                            </Link>
                            <Link
                                to="/orders"
                                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Orders
                            </Link>
                            <Link
                                to="/suppliers"
                                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Suppliers
                            </Link>
                            <Link
                                to="/reports"
                                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Reports
                            </Link>
                        </nav>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-4"
                            >
                                <User className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

export default Header;
