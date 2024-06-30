import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HttpBackend } from '@angular/common/http';
import { routes } from './app.routes';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ELanguageCode } from '../shared/utils/country.enum';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory2,
          deps: [HttpBackend],
        },
        defaultLanguage: ELanguageCode.PL,
      })
    ),
  ],
};

export function HttpLoaderFactory2(http: HttpBackend) {
  return new MultiTranslateHttpLoader(http, [
    {
      prefix: './assets/i18n/dashboard/',
      suffix: '.json',
      optional: true,
    },
    {
      prefix: './assets/i18n/shared/',
      suffix: '.json',
      optional: true,
    },
  ]);
}
