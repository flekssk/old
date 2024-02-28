export const getX = (price: number, purchase: number): number => {
  return +(price / purchase).toFixed(1);
};

export const getDeliveryFromPercentOfBuyout = (
  delivery: number,
  percentOfRedemption: number,
): number => {
  return +((delivery / percentOfRedemption) * 100).toFixed(0);
};

export const getTaxOnSale = (price: number, tax: number): number => {
  return +((price * tax) / 100).toFixed(0);
};

export const getCommissionForProduct = (
  price: number,
  commission: number,
): number => {
  return +((price * commission) / 100).toFixed(0);
};

export const priceForMarriage = (
  purchase: number,
  marriage: number,
): number => {
  return +((purchase * marriage) / 100).toFixed(0);
};
export const getProfit = (
  price: number,
  delivery: number,
  percentOfRedemption: number,
  tax: number,
  commission: number,
  fulfilment: number,
  purchase: number,
  marriage: number,
): number => {
  return +(
    price -
    getDeliveryFromPercentOfBuyout(delivery, percentOfRedemption) -
    getTaxOnSale(price, tax) -
    getCommissionForProduct(price, commission) -
    fulfilment -
    priceForMarriage(purchase, marriage) -
    purchase
  ).toFixed(0);
};

export const getMargin = (
  price: number,
  delivery: number,
  percentOfRedemption: number,
  tax: number,
  commission: number,
  fulfilment: number,
  purchase: number,
  marriage: number,
): number => {
  return +(
    (getProfit(
      price,
      delivery,
      percentOfRedemption,
      tax,
      commission,
      fulfilment,
      purchase,
      marriage,
    ) *
      100) /
    price
  ).toFixed(0);
};

export const getROI = (
  price: number,
  delivery: number,
  percentOfRedemption: number,
  tax: number,
  commission: number,
  fulfilment: number,
  purchase: number,
  marriage: number,
): number => {
  return +(
    (getProfit(
      price,
      delivery,
      percentOfRedemption,
      tax,
      commission,
      fulfilment,
      purchase,
      marriage,
    ) *
      100) /
    purchase
  ).toFixed(0);
};
