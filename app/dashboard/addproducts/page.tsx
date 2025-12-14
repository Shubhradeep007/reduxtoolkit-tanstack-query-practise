"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { PageLoader } from "@/components/ui/page-loader";
import { createProduct, useUpdateProduct, useProductById } from "@/hooks/react-query/use-product";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  price: z
    .string("Enter your product price here")
    .min(1, "Price must be at least 1 digit."),
  description: z.string().min(2, "Description must be at least 2 characters."),
  brand: z
    .string()
    .min(2, "Brand must be at least 2 characters.")
    .max(32, "Brand must be at most 32 characters."),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Addproduct() {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = !!id;

  console.log("id for update", id);

  const { data: productData, isLoading: isProductLoading } = useProductById(id || "");
  const { mutate: updateMutate, isPending: updatePending } = useUpdateProduct(id || "");
  const { mutate: createMutate, isPending: createPending } = createProduct();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (isEditMode && productData) {
      console.log("Resetting form with data:", productData);
      form.reset({
        name: productData.name,
        price: String(productData.price),
        description: productData.description,
        brand: productData.brand,
        image: productData.image,
      });
    }
  }, [isEditMode, productData, form]);

  const [submitError, setSubmitError] = useState<any>(null);

  function onSubmit(data: FormSchema) {
    console.log("Product Form Data:", data);
    setSubmitError(null);

    if (isEditMode) {
      updateMutate(data, {
        onSuccess: (res) => {
          console.log({ res });
          toast.success("Product updated successfully!");
          // Optional: redirect or keep on page
        },
        onError: (err: any) => {
          const errorMessage = err.response?.data?.message || err.message || "Failed to update product";
          setSubmitError(errorMessage);
          toast.error(errorMessage);
          console.log("Full error object:", err);
        },
      });
    } else {
      createMutate(data, {
        onSuccess: (res) => {
          console.log({ res });
          toast.success("Product created successfully!");
          form.reset();
        },
        onError: (err: any) => {
          const errorMessage = err.response?.data?.message || err.message || "Failed to create product";
          setSubmitError(errorMessage);
          toast.error(errorMessage);
          console.log("Full error object:", err);
        },
      });
    }
  }

  if (isEditMode && isProductLoading) {
    return <PageLoader text="Loading product details..." />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {isEditMode ? "Update Product" : "Create New Product"}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isEditMode
              ? "Modify the details of your existing product."
              : "Add a new product to your inventory."}
          </p>
        </div>

        {/* Debug Info - Hidden for production feel, but kept if needed */}
        {/* {isEditMode && ( ... )} */}

        <Card className="border-none shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left Column: Image Upload */}
                <div className="space-y-4">
                  <FieldGroup>
                    <FieldLabel className="text-lg font-semibold">Product Image</FieldLabel>
                    <Controller
                      control={form.control}
                      name="image"
                      render={({
                        field: { value, onChange, ...fieldProps },
                        fieldState,
                      }) => {
                        console.log("Image field value:", value);
                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors cursor-pointer relative overflow-hidden group">
                              <label
                                htmlFor="product-image-upload"
                                className="flex flex-col items-center justify-center w-full h-full cursor-pointer z-10"
                              >
                                {value ? (
                                  <img
                                    src={
                                      value instanceof File
                                        ? URL.createObjectURL(value)
                                        : value
                                    }
                                    alt="Preview"
                                    className="w-full h-full object-cover absolute inset-0"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                  </div>
                                )}
                                {/* Overlay for change on hover if value exists */}
                                {value && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-semibold">Change Image</p>
                                  </div>
                                )}
                              </label>
                              <Input
                                {...fieldProps}
                                id="product-image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                  const file = event.target.files && event.target.files[0];
                                  if (file) {
                                    onChange(file);
                                  }
                                }}
                              />
                            </div>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </FieldGroup>
                </div>

                {/* Right Column: Form Fields */}
                <div className="space-y-6">
                  <FieldGroup>
                    <FieldLabel>Product Name</FieldLabel>
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input {...field} placeholder="e.g. Premium Headphones" className="h-11" />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup>
                      <FieldLabel>Price</FieldLabel>
                      <Controller
                        control={form.control}
                        name="price"
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <Input {...field} type="number" placeholder="0.00" className="h-11" />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel>Brand</FieldLabel>
                      <Controller
                        control={form.control}
                        name="brand"
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <Input {...field} placeholder="e.g. Sony" className="h-11" />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup>
                    <FieldLabel>Description</FieldLabel>
                    <Controller
                      control={form.control}
                      name="description"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Textarea {...field} placeholder="Describe your product..." className="min-h-[120px] resize-none" />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto min-w-[200px]"
                  disabled={createPending || updatePending}
                >
                  {createPending || updatePending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    isEditMode ? "Update Product" : "Create Product"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
