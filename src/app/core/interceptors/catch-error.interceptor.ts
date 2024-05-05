import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { parsePartialContentResponse } from '../utils/parse-partial-content-response';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    tap((r) => {
      if (r instanceof HttpResponse) {
        if (r.status === 206) {
          toast.show({
            message: parsePartialContentResponse(
              r.body as Record<string, string>
            ),
            severity: 'warning',
          });
          throw throwError(() => r.body);
        }
      }
    }),
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 500) {
          toast.show({
            message: '¡Ocurrió un error inesperado!',
            severity: 'error',
          });
        }
        if (error.status === 401) {
          toast.show({
            message: '¡No tiene permisos para relizar esta acción!',
            severity: 'error',
          });
        }
        if (error.status === 400) {
          toast.show({
            message: '¡Falta "authorId" en la consulta!',
            severity: 'error',
          });
        }
        if (error.status === 404) {
          toast.show({
            message: '¡No se ha encontrado el recurso solicitado!',
            severity: 'error',
          });
        }
      }
      return throwError(() => error);
    })
  );
};
