import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { HandleErrorService } from "../services/handle-error.service";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private error: HandleErrorService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
        console.log(err.error.message);
        if (err instanceof HttpErrorResponse) {
          try {
            this.error.handleError(err);
          } catch (e) {
            this.error.handleError(err);
          }
          //log error 
        }
        return of(err);
      }));
  }

}