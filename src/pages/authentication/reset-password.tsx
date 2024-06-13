/* eslint-disable jsx-a11y/anchor-is-valid */
import { useResetPasswordByTokenMutation } from "@/api/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { InputControl } from "@/components/forms/InputControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card } from "flowbite-react";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  firstPassword: z.string().min(6),
  secondPassword: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

const ResetPasswordPage: FC = function () {
  const { isAuthenticated } = useAuth();
  const { token } = useParams<{ token: string }>();

  const resetPasswordMutation = useResetPasswordByTokenMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    if (token) {
      await resetPasswordMutation.mutateAsync({
        token,
        plainPassword: {
          first: data.firstPassword,
          second: data.secondPassword,
        },
      });
    }
  };

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
          TrueStats
        </span>
      </a>
      <Card
        horizontal
        imgSrc="/images/authentication/reset-password.jpg"
        imgAlt=""
        className="w-full md:max-w-[1024px] md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Задайте новый пароль
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <div className="mb-6 flex flex-col gap-y-3">
              <InputControl
                name="firstPassword"
                label="Новый пароль"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <div className="mb-6 flex flex-col gap-y-3">
              <InputControl
                name="secondPassword"
                label="Повторите пароль"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <div>
              <Button type="submit" className="w-full lg:w-auto">
                Изменить пароль
              </Button>
            </div>
          </FormProvider>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
