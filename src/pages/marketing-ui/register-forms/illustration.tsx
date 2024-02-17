import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import type { FC } from "react";

const RegisterFormWithIllustration: FC = function () {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-20 lg:py-16">
        <div className="mx-auto w-full rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:max-w-xl sm:p-8 lg:col-span-6">
          <a
            href="#"
            className="mb-4 inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              alt="logo"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              className="mr-2 h-8 w-8"
            />
            Flowbite
          </a>
          <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Создать аккаунт
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Запустите свой сайт за считанные секунды. У вас уже есть
            аккаунт?&nbsp;
            <a
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Войти здесь
            </a>
            .
          </p>
          <form className="mt-4 space-y-6 sm:mt-6" action="#">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email" className="dark:text-white">
                  Адрес электронной почты
                </Label>
                <TextInput
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="full-name" className="dark:text-white">
                  Полное имя
                </Label>
                <TextInput
                  id="full-name"
                  name="full-name"
                  placeholder="Иванов Иван Иванович"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="countries" className="dark:text-white">
                  Страна
                </Label>
                <Select id="countries">
                  <option selected>Выберите страну</option>
                  <option value="US">Соединенные Штаты</option>
                  <option value="CA">Канада</option>
                  <option value="FR">Франция</option>
                  <option value="DE">Германия</option>
                  <option value="DE">Россия</option>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="password" className="dark:text-white">
                  Пароль
                </Label>
                <TextInput
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                или
              </div>
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="space-y-3">
              <a
                href="#"
                className="mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                {/* <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_13183_10121)">
                    <path
                      d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                      fill="#3F83F8"
                    />
                    <path
                      d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_13183_10121">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg> */}
                <svg
                  className="mr-2 h-5 w-5"
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
                Зарегистрироваться с помощью VK
              </a>
              <a
                href="#"
                className="mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <svg
                  className="mr-2 h-5 w-5 text-gray-900 dark:text-white"
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
                Зарегистрироваться с помощью Яндекс
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <Checkbox
                    aria-describedby="terms-illustrations"
                    id="terms-illustrations"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label
                    htmlFor="terms-illustrations"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Регистрируясь, вы создаете учетную запись Flowbite и
                    соглашаетесь с условиями Flowbite.&nbsp;
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Условия использования
                    </a>
                    &nbsp;и&nbsp;
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Политика конфиденциальности
                    </a>
                    .
                  </Label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <Checkbox
                    aria-describedby="newsletter"
                    id="newsletter"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label
                    htmlFor="newsletter"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Пишите мне об обновлениях и ресурсах продукта.
                  </Label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Cоздать учетную запись
            </Button>
          </form>
        </div>
        <div className="mr-auto place-self-center lg:col-span-6">
          <img
            alt=""
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            className="mx-auto hidden lg:flex"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterFormWithIllustration;
