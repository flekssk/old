import { Button, Label, TextInput, Textarea } from "flowbite-react";
import type { FC } from "react";

const UpdateUserForm: FC = function () {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update user
        </h2>
        <form>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <Label
                htmlFor="first-name"
                className="block mb-2 dark:text-white"
              >
                First Name
              </Label>
              <TextInput
                defaultValue="Helene"
                id="first-name"
                name="first-name"
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="last-name" className="block mb-2 dark:text-white">
                Last Name
              </Label>
              <TextInput
                defaultValue="Engels"
                id="last-name"
                name="last-name"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="block mb-2 dark:text-white">
                Password
              </Label>
              <TextInput
                id="password"
                name="password"
                placeholder="•••••••••"
                required
                type="password"
              />
            </div>
            <div>
              <Label
                htmlFor="confirm-password"
                className="block mb-2 dark:text-white"
              >
                Confirm password
              </Label>
              <TextInput
                id="confirm-password"
                name="confirm-password"
                placeholder="•••••••••"
                required
                type="password"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="biography" className="block mb-2 dark:text-white">
                Biography
              </Label>
              <Textarea
                defaultValue="Hello, I'm Helene Engels, USA Designer, Creating things that stand out, Featured by Adobe, Figma, Webflow and others, Daily design tips & resources, Exploring Web3."
                id="biography"
                rows={8}
                className="text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-6">
            <Button type="submit" className="[&>span]:px-5 [&>span]:py-2.5">
              Update user
            </Button>
            <Button
              color="failure"
              outline
              theme={{
                color: {
                  failure:
                    "text-white bg-red-600 border border-transparent enabled:hover:bg-red-600 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-500 dark:focus:ring-red-900",
                },
                outline: {
                  on: "flex justify-center bg-white text-red-600 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-red-500 w-full",
                },
              }}
              className="[&>span]:border-red-600 [&>span]:px-5 [&>span]:py-2.5"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-1 -ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateUserForm;
