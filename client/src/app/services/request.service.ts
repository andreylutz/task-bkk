import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
    ) {}

  getComboxFields() {
   return this.http
   .get('http://jsonplaceholder.typicode.com/posts')
   .pipe(
    catchError(this.errorHandler.bind(this))
   )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
