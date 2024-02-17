import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import type { FC } from "react";

const DefaultUpdateForm: FC = function () {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update product
        </h2>
        <form>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <Label htmlFor="name" className="block mb-2 dark:text-white">
                Product Name
              </Label>
              <TextInput
                defaultValue={`Apple iMac 27"`}
                id="name"
                name="name"
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="brand" className="block mb-2 dark:text-white">
                Brand
              </Label>
              <TextInput
                defaultValue="Apple"
                id="brand"
                name="brand"
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="price" className="block mb-2 dark:text-white">
                Price
              </Label>
              <TextInput
                defaultValue="2999"
                id="price"
                name="price"
                required
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="category" className="block mb-2 dark:text-white">
                Category
              </Label>
              <Select id="category">
                <option selected value="EC">
                  Electronics
                </option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="item-weight"
                className="block mb-2 dark:text-white"
              >
                Item Weight (kg)
              </Label>
              <TextInput
                defaultValue="15"
                id="item-weight"
                name="item-weight"
                required
                type="number"
              />
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="description"
                className="block mb-2 dark:text-white"
              >
                Description
              </Label>
              <Textarea
                defaultValue="Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US"
                id="description"
                placeholder="Your description here"
                rows={8}
                className="text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-6">
            <Button type="submit" className="[&>span]:px-5 [&>span]:py-2.5">
              Update product
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

export default DefaultUpdateForm;
