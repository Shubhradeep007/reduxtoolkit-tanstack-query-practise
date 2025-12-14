"use client";

import { useProductById } from "@/hooks/react-query/use-product";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Loader2, Tag } from "lucide-react";
import { PageLoader } from "@/components/ui/page-loader";

const ProductViewById = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data, isLoading, error } = useProductById(id);

    if (isLoading) {
        return <PageLoader text="Loading product details..." />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-red-500">
                Error loading product: {error.message}
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <p className="text-lg text-gray-500">Product not found.</p>
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Product Details
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            View detailed information about this product.
                        </p>
                    </div>
                </div>
                <Button onClick={() => router.push(`/dashboard/addproducts?id=${id}`)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Product
                </Button>
            </div>

            <Card className="border-none shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8 min-h-[400px]">
                            <img
                                src={data.image || "https://placehold.co/600x400"}
                                alt={data.name}
                                className="max-h-[350px] w-auto object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="p-8 flex flex-col justify-center space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="secondary" className="text-sm px-3 py-1">
                                        {data.brand}
                                    </Badge>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Tag className="mr-1 h-3 w-3" />
                                        ID: {data._id.slice(-6)}
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {data.name}
                                </h2>
                                <p className="text-3xl font-bold text-primary">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                    }).format(data.price)}
                                </p>
                            </div>

                            <div className="prose dark:prose-invert max-w-none">
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {data.description}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="block text-gray-500 dark:text-gray-400">Created At</span>
                                        <span className="font-medium">
                                            {new Date(data.createdAt || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 dark:text-gray-400">Last Updated</span>
                                        <span className="font-medium">
                                            {new Date(data.updatedAt || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductViewById;
