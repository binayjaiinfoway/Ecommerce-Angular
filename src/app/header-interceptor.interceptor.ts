import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './Service/auth.service';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {


  constructor( private authSvc:AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('/logIn') > -1 || request.url.indexOf('/token') > -1) {
      console.log('Skipping')

      return next.handle(request);
    }
    const accessToken = localStorage.getItem('accesstoken');
    const refreshToken = localStorage.getItem('refreshtoken');
    // alert(accessToken+' '+ refreshToken);
    if (accessToken) {
      request= request.clone({
        setHeaders: {
          // 'Content-Type': 'application/json',
        "authorization": `Bearer ${accessToken}`
        }
      
      })
    }
    return next.handle(request).pipe(
      tap((event: any) => {
        return event;
      }, (error: { status: number; }) => {
        if (error.status === 401) {
          return this.authSvc.RefreshToken(refreshToken).subscribe(
            (data: any) => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);

              request = request.clone({
                setHeaders: {
                  // 'Content-Type': 'application/json',
                  "authorization": `Bearer ${accessToken}`
                }
              });
              return next.handle(request);
            })
        } else {
          throw error;
        }
      })
    );
  }

  }
