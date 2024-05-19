import type { ReportItemResponse } from "@/api/report/types";
import { Breadcrumb } from "flowbite-react";
import { type FC } from "react";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";

type ProductInfoProps = {
  product: ReportItemResponse["productData"];
};

const ProductInfo: FC<ProductInfoProps> = function ({ product }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <div className="flex items-center gap-x-3">
            <IoMdArrowRoundBack
              className="text-xl"
              cursor="pointer"
              onClick={() => navigate(-1)}
            />
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/">
          <div className="flex items-center gap-x-3">
            <HiHome className="text-xl" />
            <span className="dark:text-white">Главная</span>
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {product.vendorCode} • {product.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center gap-5">
        <img className="w-32" src={product.image} alt={product.name} />
        <div className="flex flex-col gap-2 ">
          <div>
            <span className="mr-2 font-bold">Артикул:</span>
            <span>
              {product.vendorCode} ({product.article})
            </span>
          </div>
          <div>
            <span className="mr-2 font-bold">Название:</span>
            <span>{product.name}</span>
          </div>
          <div>
            <span className="mr-2 font-bold">Бренд:</span>
            <span>{product.brand}</span>
          </div>
          <div>
            <span className="mr-2 font-bold">Категория:</span>
            <span>{product.category}</span>
          </div>

          {/* <div className="flex gap-5">
            <p className="w-56 font-bold">Цена, продажи, отзывы</p>
            <p className="w-24">{product.cost}₽</p>
            <p>{product.storage} шт</p>
            <p>14’294</p>
            <div className="flex gap-1">
              <p>Рейтинг 4.5</p>
              <img src="/images/table/star.svg" alt="star" />
            </div>
          </div>
          <div className="flex gap-5">
            <p className="w-56 font-bold">Характеристики</p>
            <p className="w-24">{product.orders} цветов</p>
            <p className="w-24">{product.orders} размеров</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
