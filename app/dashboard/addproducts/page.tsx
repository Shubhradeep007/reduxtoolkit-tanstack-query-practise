"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/hooks/react-query/use-product";
import { toast } from "sonner";
import { Product } from "@/types/Authinterfaces";

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
  image: z.instanceof(File).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Addproduct() {

  const { mutate } = createProduct();
  
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

  function onSubmit(data: FormSchema) {
    console.log("Product Form Data:", data);

    mutate(data, {
      onSuccess: (res) => {
        console.log({ res });
        toast.success("Product created successfully!");
        form.reset();
      },
      onError: (err: any) => {
        toast.error(err.response.data.message)
        console.log("Full error object:", err);
        
      },
    })
  }

  return (
    <>
      <div className="flex items-center justify-center mt-5">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Add your product</CardTitle>
            <CardDescription>
              Add your product details to create a new product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your product name here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Price
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your product price here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="brand"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Brand
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your product brand here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Product Description
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your product description here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="image"
                  control={form.control}
                  render={({
                    field: { value, onChange, ...fieldProps },
                    fieldState,
                  }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="product-image-upload">
                        Upload Product Image
                      </FieldLabel>

                      <Input
                        {...fieldProps}
                        id="product-image-upload"
                        type="file"
                        accept="image/*"
                        value={undefined}
                        onChange={(event) => {
                          const file =
                            event.target.files && event.target.files[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="form-rhf-demo">
                Submit
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
