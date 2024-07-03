export enum EDateFormat {
  DAY,
  WEEK,
  MONTH,
}

export interface IDate {
  from: string;
  to: string;
}

export interface ISaleSummaryDTO {
  totalSale: number;
  currencySymbol: string;
  amountSold: number;
  progressSaleInPercent: number;
  progressAmountSoldInPercent: number;
  mostPopularItem: IPopularItemDTO;
}

export interface IPopularItemDTO {
  id: number;
  image: string;
  name: string;
  amountSold: string;
  progressAmountSoldInPercent: number;
}
