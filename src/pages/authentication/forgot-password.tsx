/* eslint-disable jsx-a11y/anchor-is-valid */
import { useResetPasswordMutation } from "@/api/auth";
import { ServerError } from "@/components/ServerError";
import { ServerSuccess } from "@/components/ServerSuccess";
import { useAuth } from "@/components/auth/AuthProvider";
import { CheckboxControl } from "@/components/forms/CheckboxControl";
import { InputControl } from "@/components/forms/InputControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Label } from "flowbite-react";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  terms: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

const ForgotPasswordPage: FC = function () {
  const { isAuthenticated } = useAuth();

  const resetPasswordMutation = useResetPasswordMutation();

  const onSubmit = async (data: FormSchema) => {
    await resetPasswordMutation.mutateAsync(data);
  };

  const isLoading = resetPasswordMutation.status === "pending";

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const terms = form.watch("terms");
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <a href="/" className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-10"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          TrueStat
        </span>
      </a>
      <Card className="w-full lg:max-w-[640px] lg:[&>*]:w-full lg:[&>*]:p-16">
        <h1 className="text-2xl font-bold dark:text-white md:text-3xl">
          Забыли пароль
        </h1>
        <ServerSuccess message={resetPasswordMutation.data?.message} />
        <p className="mb-3 text-gray-500 dark:text-gray-300">
          Не волнуйтесь! Просто введите свой адрес электронной почты, и мы
          вышлем вам код для сброса пароля!
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <div className="mb-6 flex flex-col gap-y-3">
              <InputControl
                name="email"
                placeholder="name@company.com"
                type="email"
                label="Ваш email"
              />
            </div>
            <div className="mb-6 flex items-center gap-x-3">
              <CheckboxControl name="terms" />
              <Label htmlFor="terms">
                Я согласен &nbsp;
                <a href="#" className="text-primary-700 dark:text-primary-300">
                  с пользовательским соглашением
                </a>
              </Label>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full lg:w-auto"
                isProcessing={isLoading}
                disabled={isLoading || !terms}
              >
                Сбросить пароль
              </Button>
            </div>
            <ServerError mutation={resetPasswordMutation} className="mt-3" />
          </FormProvider>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
