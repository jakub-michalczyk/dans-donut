import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const API =
    'https://my-json-server.typicode.com/jakub-michalczyk/dans-donut/';
  const modifiedRequest = req.clone({
    url: `${API}/${req.url}`,
  });

  return next(modifiedRequest);
};
