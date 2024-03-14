// филтры и сортировки по всем полям кроме img, url
export interface ProductReportItem {
  // ссылка на изображение
  image?: string;
  // ссылка на товар
  url: string;
  // Заказы
  orders: number;
  // Заказы шт
  ordersCount: number;
  // Название товара
  name: string;
  // Артикул продавца
  vendorCode: string;
  // Бренд
  brand: string;
  // Категория
  category: string;
  // Артикул WB
  article: string;
  // себестоимость
  cost: number;
  // Средняя цена до СПП
  averagePriceBeforeSPP: number;
  //Реализация (сумма продаж до СПП)
  shareInTotalRevenue: number;
  // продажа
  sale: number;
  // К перечислению
  toTransfer: number;
  //Возвраты
  returns: number;
  // Cебестоимость продаж
  costOfSales: number;
  // Штрафы
  fines: number;
  // Компенсация подмененного товара
  compensationForSubstitutedGoods: number;
  // Компенсация поставщика
  reimbursementOfTransportationCosts: number;
  //Оплата брака + потерянного товара
  paymentForMarriageAndLostGoods: number;
  //Ср. стоимость логистики
  averageLogisticsCost: number;
  // Логистика
  logistics: number;
  //Хранение
  storage: number;
  //Количество отказов+ возвраты
  rejectionsAndReturns: number;
  //Общее количество продаж, с учетом возвратов
  totalSales: number;
  // Средний процент выкупа
  averageRedemption: number;
  // Средняя прибыль на 1 шт
  averageProfitPerPiece: number;
  // Налог
  tax: number;
  // Прибыль
  profit: number;
  // ROI
  roi: number;
  // Рентабельность
  profitability: number;
  // Доля в общей выручке
  shareInTotalRevenuePart: number;
  // Доля в общей прибыли
  shareInTotalProfit: number;
  // маржинальность (в %) realization / profit
  marginality: number;
  // Рекламные расходы (собирается за день по артикулу  товара по всем рекламным компаниям)
  advertisingExpenses: number;
  // ДДР % advertisingExpenses / sales
  ddr: number;
}

export interface TopProduct {
  name: string;
  vendorCode: string;
  profit: number;
  // расчитывается как доля прибыли от всех продуктов
  profitShare: number;
}

export interface ReportChartItem {
  date: string;
  averagePriceBeforeSPP: number;
  sale: number;
  returns: number;
  averageLogisticsCost: number;
  logistics: number;
  marginality: number;
  advertisingExpenses: number;
  ddr: number;
  profit: number;
  orders: number;
  ordersCount: number;
}

export interface ReportStats {
  //Чистая прибль
  profit: number;
  // Процент выкупа
  averageRedemption: number;
  // Маржинальность
  marginality: number;
  // Продажи
  sale: number;
  // Заказы
  orders: number;
  // Заказы в штуках
  ordersCount: number;
  // ДРР
  ddr: number;
  advertisingExpenses: number;
  returns: number;
}

export interface RevenueStructure {
  margin: number;
  logistics: number;
  storage: number;
  cost: number;
  advertising: number;
  tax: number;
  commission: number;
}

export interface ReportResponse {
  chart: ReportChartItem[];
  byProduct: ProductReportItem[];
  topFiveProducts: TopProduct[];
  stats: ReportStats;
  revenueStructure: RevenueStructure;
}

// филтры и сортировки по всем полям кроме img, url
export interface BarcodeReportItem {
  // ссылка на изображение
  image?: string;
  // ссылка на товар
  url: string;
  // Заказы
  orders: number;
  // Заказы шт
  ordersCount: number;
  barcode: string;
  size: string;
  // себестоимость
  cost: number;
  // Средняя цена до СПП
  averagePriceBeforeSPP: number;
  //Реализация (сумма продаж до СПП)
  shareInTotalRevenue: number;
  // продажа
  sale: number;
  // К перечислению
  toTransfer: number;
  //Возвраты
  returns: number;
  // Cебестоимость продаж
  costOfSales: number;
  // Штрафы
  fines: number;
  // Компенсация подмененного товара
  compensationForSubstitutedGoods: number;
  // Компенсация поставщика
  reimbursementOfTransportationCosts: number;
  //Оплата брака + потерянного товара
  paymentForMarriageAndLostGoods: number;
  //Ср. стоимость логистики
  averageLogisticsCost: number;
  // Логистика
  logistics: number;
  //Хранение
  storage: number;
  //Количество отказов+ возвраты
  rejectionsAndReturns: number;
  //Общее количество продаж, с учетом возвратов
  totalSales: number;
  // Средний процент выкупа
  averageRedemption: number;
  // Средняя прибыль на 1 шт
  averageProfitPerPiece: number;
  // Налог
  tax: number;
  // Прибыль
  profit: number;
  // ROI
  roi: number;
  // Рентабельность
  profitability: number;
  // Доля в общей выручке
  shareInTotalRevenue: number;
  // Доля в общей прибыли
  shareInTotalProfit: number;
  // маржинальность (в %) realization / profit
  marginality: number;
  // Рекламные расходы (собирается за день по артикулу  товара по всем рекламным компаниям)
  advertisingExpenses: number;
  // ДДР % advertisingExpenses / sales
  ddr: number;
}

export interface ProductSizesRevenue {
  size: string;
  barcode: string;
  revenue: number;
}

export interface Stocks {
  warehouse: string;
  barcode: string;
  size: string;
  quantity: number;
  inWayToClient: number;
  inWayFromClient: number;
}

export interface ReportItemResponse {
  productData: {
    vendorCode: string;
    name: string;
    category: string;
    brand: string;
    article: string;
    url: string;
    image?: string;
  };
  chart: ReportChartItem[];
  byBarcode: BarcodeReportItem[];
  stocks: Stocks[];
  // собирается так же как чарт только для каждого размера отдельные данные
  chartBySize: ReportChartItem[];
  productSizesRevenues: ProductSizesRevenue[];
  stats: ReportStats;
  revenueStructure: RevenueStructure;
}