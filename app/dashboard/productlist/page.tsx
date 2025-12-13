"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { productList } from "@/hooks/react-query/use-product";
import { useEffect } from "react";

const ProductList = () => {
  const { data, isLoading, error } = productList();
  console.log("Product list", data);

  useEffect(() => {
    console.log("Products data updated:", data);
  }, [data]);

  if (isLoading) {
    return <div className="flex justify-center items-center mt-4">Loading products...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center mt-4 text-red-500">Error loading products: {error.message}</div>;
  }

  return (
    <>
      <div className="rounded-md border p-4">
        <Table>
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="max-w-[200px]">Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {data?.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                
                  <TableCell>
                    <img
                      src={item.image || "https://placehold.co/100"}
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover border"
                    />
                  </TableCell>

                
                  <TableCell className="font-medium">{item.name}</TableCell>

              
                  <TableCell>{item.brand}</TableCell>

                
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "INR",
                    }).format(item.price)}
                  </TableCell>

                
                  <TableCell
                    className="max-w-[200px] truncate"
                    title={item.description}
                  >
                    {item.description}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => console.log("Update", item.id)}
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => console.log("Delete", item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
        </Table>
      </div>
    </>
  );
};

export default ProductList;
