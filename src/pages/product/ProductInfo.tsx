import type { ReportItemResponse } from "@/api/report/types";
import { type FC } from "react";

type ProductInfoProps = {
  product: ReportItemResponse["productData"];
};

const ProductInfo: FC<ProductInfoProps> = function ({ product }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="mb-2 text-lg">
        Отчет → {product.vendorCode} • {product.name}
      </h2>
      <div className="flex items-center gap-5">
        <img className="w-32" src={product.image} alt={product.name} />
        <div className="grid grid-cols-2 gap-2 ">
          <span className="font-bold">Артикул:</span>
          <span>
            {product.vendorCode} ({product.article})
          </span>
          <span className="font-bold">Название:</span>
          <span>{product.name}</span>
          <span className="font-bold">Бренд:</span>
          <span>{product.brand}</span>
          <span className="font-bold">Категория:</span>
          <span>{product.category}</span>

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
