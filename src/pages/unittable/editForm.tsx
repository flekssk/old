import { Button, Label, TextInput } from "flowbite-react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import type { Product } from "./productsTable";

export type EditFormType = Omit<Product, "x" | "profit" | "margin" | "roi">;

const EditForm = ({
  data,
  setActive,
  setData,
}: {
  data: EditFormType;
  setActive: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Product[]>>;
}) => {
  const [form, setForm] = useState({ ...data });

  const onSubmitClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      id: data.id,
      purchase: form.purchase,
      price: form.price,
      percentOfRedemption: form.percentOfRedemption,
      delivery: form.delivery,
      tax: form.tax,
      commission: form.commission,
      fulfilment: form.fulfilment,
      marriage: form.marriage,
    };

    const links = JSON.parse(localStorage.getItem("unitTable") || "{}");

    Object.assign(
      links.find((item: EditFormType) => item.id === payload.id),
      payload,
    );
    localStorage.setItem("unitTable", JSON.stringify(links));
    setData(JSON.parse(localStorage.getItem("unitTable") || "{}"));
    setActive(false);
  };
  return (
    <div className="flex min-w-[635px] flex-col">
      <div>
        <div className="p-[20px] font-sans font-bold">{data?.title}</div>
      </div>
      <form onSubmit={onSubmitClick}>
        <div className="border-y-2 pb-[15px] pt-[20px]">
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="purchase" className="m-1">
              ЗАКУПКА, Р
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="purchase"
              type="text"
              name="purchase"
              value={form.purchase}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, purchase: +e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="price" className="m-1">
              ЦЕНА БЕЗ СПП, Р
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="price"
              type="text"
              name="price"
              value={form.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, price: +e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="percentOfRedemption" className="m-1">
              % ВЫКУПА
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="percentOfRedemption"
              type="text"
              name="percentOfRedemption"
              value={form.percentOfRedemption}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  percentOfRedemption: +e.currentTarget.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="delivery" className="m-1">
              ДОСТАВКА МП, P
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="delivery"
              type="text"
              name="delivery"
              value={form.delivery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, delivery: +e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="tax" className="m-1">
              НАЛОГ, %
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="tax"
              type="text"
              name="tax"
              value={form.tax}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, tax: +e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="commission" className="m-1">
              КОМИССИЯ МП, %
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="commission"
              type="text"
              name="commission"
              value={form.commission}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, commission: +e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="fulfilment" className="m-1">
              ФУЛФИЛМЕНТ, р
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="fulfilment"
              type="text"
              name="fulfilment"
              value={form.fulfilment}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, fulfilment: +e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="marriage" className="m-1">
              БРАК, %
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="marriage"
              type="text"
              name="marriage"
              value={form.marriage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, marriage: +e.currentTarget.value });
              }}
            />
          </div>
        </div>
        <div className="flex min-h-[77px] items-center justify-start pl-[15px]">
          <Button color="primary" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
