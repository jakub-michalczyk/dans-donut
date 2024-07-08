import { ELanguageCode } from '../utils/country.enum';

export interface LanguageUnit {
  code: ELanguageCode;
  label: string;
  isActive: boolean;
}
