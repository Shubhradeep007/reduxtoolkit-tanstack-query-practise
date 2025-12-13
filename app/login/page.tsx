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
import { LoginUser } from "@/hooks/redux-toolkit/slice/auth.slice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string("Enter your password here")
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    

    dispatch(LoginUser(data))
      .unwrap()
      .then((res) => {
        console.log("user login success", res);
        toast.success("User logged in successfully!");
        router.push("/dashboard");

        const token = res.token;
        if (token) {
          Cookies.set("x-access-token", token, { expires: 7 });
        }

        form.reset();
      })
      .catch((err) => {
        console.log("user login failed", err);
        toast.error("User login failed: " + err);
      });
  }

  return (
    <>
      <div className="flex items-center justify-center mt-40">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Login to your account to enter your best future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
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
            Don't have an account? &nbsp;
            <Button variant="link" onClick={() => router.push("/signup")}>
              Register here
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
