'use client'
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { Form, Input, Button, Card, CardHeader, CardBody, addToast, CardFooter, Divider } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/app/queries/useAuth";
import { handleErrorApi } from "@/lib/utils";

export default function LoginForm() {
    const loginMutation = useLoginMutation();
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginBodyType) => {
        if (loginMutation.isPending) return;
        try {
            const result = await loginMutation.mutateAsync(data);
            addToast({
                title: "Đăng nhập thành công",
                description: result.payload.message,
                timeout: 5000,
            });
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError });
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-col">
                <p className="text-2xl font-bold">Đăng nhập</p>
            </CardHeader>
            <Divider />
            <form
                className="w-full"
                onSubmit={form.handleSubmit(onSubmit, err => {
                    console.warn(err);
                })}
            >
                <CardBody className="flex gap-4 flex-col">
                    <Input
                        {...form.register("email")}
                        isRequired
                        errorMessage="Please enter a valid email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <Input
                        {...form.register("password")}
                        isRequired
                        errorMessage="Please enter password"
                        label="Password"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        type="password"
                    />
                    <Button className="w-full" color="primary" type="submit">
                        Đăng nhập
                    </Button>
                </CardBody>
            </form>
        </Card>
    );
}
