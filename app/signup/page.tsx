"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/hooks/redux-toolkit/store";
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
import { RegisterUser } from "@/hooks/redux-toolkit/slice/auth.slice";
import { toast } from "sonner";
import  Cookies  from "js-cookie";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.email("Please enter a valid email address."),
  mobile: z
    .string("Enter your mobile number here")
    .min(10, "Mobile number must be at least 10 digits."),

  password: z
    .string("Enter your password here")
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters."),

  first_school: z
    .string()
    .min(2, "First school must be at least 2 characters."),
  image: z.file().optional(),
});

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      first_school: "",
      image: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);
    formData.append("first_school", data.first_school);
    if (data.image) {
      formData.append("image", data.image);
    }

    dispatch(RegisterUser(formData))
      .unwrap() 
      .then((res) => {
        console.log("user register success", res);
        toast.success("User registered successfully!");
        router.push("/dashboard");

        const token = res.token; 
        if (token) {
          Cookies.set("x-access-token", token, { expires: 7 }); 
        }

        form.reset();    
      })
      .catch((err) => {
        console.log("user register failed", err);
        toast.error("User registration failed: " + err);
      });

    

  }

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Create the account to enter your best future
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
                        placeholder="Enter your name here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="mobile"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Mobile
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your mobile here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password here..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="first_school"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Enter you firest school name?
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your first school name here..."
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
                      <FieldLabel htmlFor="profile-image-upload">
                        Upload Profile Image
                      </FieldLabel>

                 
                      <Input
                        {...fieldProps} 
                        id="profile-image-upload"
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
          <div className="p-4">
           Already have an account? &nbsp;
            <Button variant="link" onClick={() => router.push("/login")}>
              Login here
            </Button>
            </div>
        </Card>
      </div>
    </>
  );
}
