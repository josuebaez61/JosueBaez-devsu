import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authorIdInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      headers: new HttpHeaders({
        authorId: environment.authorId,
      }),
    })
  );
};
