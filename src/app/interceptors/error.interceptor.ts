import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorNotificationService } from '../services/error-notification.service';
import { ERROR_MESSAGES_MAP, ERRORS_WITHOUT_DYNAMIC_VALUE } from '../constants/error-messages';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorNotificationService = inject(ErrorNotificationService); 

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let friendlyMessage = ERROR_MESSAGES_MAP['500'];
      
      if (error.error && error.error.message) {
        const backendMessage: string = error.error.message;
        let mapped = false;

        for (const key in ERROR_MESSAGES_MAP) {
          if (backendMessage.includes(key)) {
            friendlyMessage = ERROR_MESSAGES_MAP[key];
            mapped = true;

            const shouldAppendValue = !ERRORS_WITHOUT_DYNAMIC_VALUE.includes(key);
            
            if (shouldAppendValue) {
                const match = backendMessage.match(/:\s*([^:]+)$/);
                
                if (match && match[1]) {
                    friendlyMessage = `${friendlyMessage} (Valor inválido: ${match[1]})`;
                }
            }
            
            friendlyMessage = `${friendlyMessage}`;
            break; 
          }
        }
        
        if (!mapped) {
           const statusCode = String(error.status);
           if (ERROR_MESSAGES_MAP[statusCode]) {
               friendlyMessage = ERROR_MESSAGES_MAP[statusCode];
           }
        }

      } else if (error.status === 0) {
          friendlyMessage = 'Falha de comunicação: O servidor está offline ou houve um problema de rede.';
      }

      errorNotificationService.showError(friendlyMessage); 

      return throwError(() => new Error(friendlyMessage));
    })
  );
};