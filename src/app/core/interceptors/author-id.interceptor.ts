import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authorIdInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = req.headers.append(
    'authorId',
    environment.authorId.toString()
  );
  const reqClone = req.clone({ headers });
  return next(reqClone);
};
