/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth } from "@/components/auth/AuthProvider";
import { InputControl } from "@/components/forms/InputControl";
import { ROUTES } from "@/constants/routes";
import { Alert, Button, Checkbox, Label } from "flowbite-react";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/api/auth";
import { HiCheckCircle } from "react-icons/hi";
import { ServerError } from "@/components/ServerError";
import { getVkAuthUrl, getYandexUrl } from "./helper";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

const SignInPage: FC = function () {
  const { isAuthenticated, setToken } = useAuth();

  const loginMutation = useLoginMutation();

  const [params] = useSearchParams();
  const isEmailVerified = params.get("email_verified");

  const onSubmit = async (data: FormSchema) => {
    const response = await loginMutation.mutateAsync(data);
    if (response) {
      setToken(response.token);
    }
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex h-screen flex-col justify-center bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-20 lg:py-16">
        <div className="w-full place-self-center lg:col-span-6">
          <div className="mx-auto rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:max-w-xl sm:p-8">
            <a
              href="#"
              className="mb-4 inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="mr-2 size-8"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              TrueStat
            </a>

            <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              С возвращением
            </h1>
            {isEmailVerified && (
              <Alert color="success" icon={HiCheckCircle} className="mb-2">
                Ваш адрес электронной почты был успешно подтвержден.
              </Alert>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Запустите свой сайт за считанные секунды. У вас нет учетной
              записи?&nbsp;
              <Link
                to={ROUTES.registration}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Зарегистрироваться
              </Link>
              .
            </p>
            <form
              className="mt-4 space-y-6 sm:mt-6"
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormProvider {...form}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <InputControl
                    name="email"
                    placeholder="name@company.com"
                    type="email"
                  />
                  <InputControl
                    name="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="flex items-center">
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                    или
                  </div>
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="space-y-3">
                  <Button
                    href="#"
                    color="gray"
                    className="w-full hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => {
                      const url = getVkAuthUrl();
                      window.location.assign(url);
                    }}
                  >
                    <svg
                      className="mr-2 size-5"
                      width="20px"
                      height="20px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#2787f5"
                    >
                      <circle cx="512" cy="512" r="512" />
                      <path
                        d="M585.83 271.5H438.17c-134.76 0-166.67 31.91-166.67 166.67v147.66c0 134.76 31.91 166.67 166.67 166.67h147.66c134.76 0 166.67-31.91 166.67-166.67V438.17c0-134.76-32.25-166.67-166.67-166.67zm74 343.18h-35c-13.24 0-17.31-10.52-41.07-34.62-20.71-20-29.87-22.74-35-22.74-7.13 0-9.17 2-9.17 11.88v31.57c0 8.49-2.72 13.58-25.12 13.58-37 0-78.07-22.4-106.93-64.16-43.45-61.1-55.33-106.93-55.33-116.43 0-5.09 2-9.84 11.88-9.84h35c8.83 0 12.22 4.07 15.61 13.58 17.31 49.9 46.17 93.69 58 93.69 4.41 0 6.45-2 6.45-13.24v-51.6c-1.36-23.76-13.92-25.8-13.92-34.28 0-4.07 3.39-8.15 8.83-8.15h55c7.47 0 10.18 4.07 10.18 12.9v69.58c0 7.47 3.39 10.18 5.43 10.18 4.41 0 8.15-2.72 16.29-10.86 25.12-28.17 43.11-71.62 43.11-71.62 2.38-5.09 6.45-9.84 15.28-9.84h35c10.52 0 12.9 5.43 10.52 12.9-4.41 20.37-47.18 80.79-47.18 80.79-3.73 6.11-5.09 8.83 0 15.61 3.73 5.09 16 15.61 24.1 25.12 14.94 17 26.48 31.23 29.53 41.07 3.45 9.84-1.65 14.93-11.49 14.93z"
                        fill="#fff"
                      />
                    </svg>
                    Войти с помощью VK
                  </Button>
                  <Button
                    href="#"
                    color="gray"
                    className="w-full hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => {
                      const url = getYandexUrl();
                      window.location.assign(url);
                    }}
                  >
                    <svg
                      className="mr-2 size-5 text-gray-900 dark:text-white"
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="#D7143A"
                    >
                      <path
                        d="M363.493,0h-72.744C217.05,0,142.684,54.422,142.684,176.006c0,62.978,26.691,112.027,75.619,139.922
	l-89.552,162.091c-4.246,7.666-4.357,16.354-0.298,23.24c3.963,6.725,11.21,10.741,19.378,10.741h45.301
	c10.291,0,18.315-4.974,22.163-13.688L299.26,334.08h6.128v157.451c0,11.096,9.363,20.469,20.446,20.469h39.574
	c12.429,0,21.106-8.678,21.106-21.104V22.403C386.516,9.213,377.05,0,363.493,0z M305.388,261.126h-10.81
	c-41.915,0-66.938-34.214-66.938-91.523c0-71.259,31.61-96.648,61.194-96.648h16.554V261.126z"
                      />
                    </svg>
                    Войти с помощью Яндекс
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <Checkbox id="remember-illustration" required />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label
                        htmlFor="remember-illustration"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Запомнить меня
                      </Label>
                    </div>
                  </div>
                  <Link
                    to={ROUTES.resetPassword}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <ServerError mutation={loginMutation} />

                <Button
                  type="submit"
                  className="w-full"
                  isProcessing={loginMutation.status === "pending"}
                  disabled={loginMutation.status === "pending"}
                >
                  Войти в свой аккаунт
                </Button>
              </FormProvider>
            </form>
          </div>
        </div>
        <div className="mr-auto place-self-center lg:col-span-6">
          <img
            className="mx-auto hidden lg:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            alt="illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
