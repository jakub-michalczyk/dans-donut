export enum EDateFormat {
  DAY,
  WEEK,
  MONTH,
}

export interface ISaleSummaryDTO {
  totalSale: number;
  currencySymbol: string;
  amountSold: number;
  progressSaleInPercent: number;
  progressAmountSoldInPercent: number;
}
