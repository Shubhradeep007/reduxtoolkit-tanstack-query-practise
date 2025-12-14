"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2, View, Plus, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useProductList, useDeleteProduct } from "@/hooks/react-query/use-product";
import { PageLoader } from "@/components/ui/page-loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductList = () => {
    const { data, isLoading, error } = useProductList();
    const { mutate: deleteMutate } = useDeleteProduct();
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteMutate(id, {
                onSuccess: () => {
                    toast.success("Product deleted successfully");
                },
                onError: (err: any) => {
                    toast.error(err.response?.data?.message || "Failed to delete product");
                },
            });
        }
    };

    const filteredData = data?.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <PageLoader text="Loading products..." />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-red-500">
                Error loading products: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Products</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your product inventory.</p>
                </div>
                <Button onClick={() => router.push("/dashboard/addproducts")} className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            <Card className="border-none shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search products by name or brand..."
                            className="pl-9 w-full md:max-w-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border bg-white dark:bg-gray-900 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                <TableRow>
                                    <TableHead className="w-[80px]">Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="hidden md:table-cell">Brand</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="hidden lg:table-cell max-w-[200px]">Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData?.length > 0 ? (
                                    filteredData.map((item: any) => (
                                        <TableRow key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <TableCell>
                                                <div className="h-10 w-10 rounded-md overflow-hidden border bg-gray-100 dark:bg-gray-800">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    {item.brand}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "INR",
                                                }).format(item.price)}
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell max-w-[200px] truncate text-gray-500">
                                                {item.description}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                                        onClick={() => router.push(`/dashboard/productlist/${item._id}`)}
                                                    >
                                                        <View className="h-4 w-4" />
                                                        <span className="sr-only">View</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                        onClick={() => router.push(`/dashboard/addproducts?id=${item._id}`)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <Search className="h-8 w-8 mb-2 opacity-20" />
                                                <p>No products found matching your search.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductList;
