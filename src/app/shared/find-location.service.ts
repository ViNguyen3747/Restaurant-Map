import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ILocation } from './interface';

@Injectable({
  providedIn: 'root'
})
export class FindLocationService {
    private openWeatherAPI = 'http://api.openweathermap.org/geo/1.0/direct?';
    private  APIkey = '27cc0f9e54d73d8e67bfafb8beef78e4';
  constructor(private http: HttpClient) { }

  getLocation(name: string): Observable<ILocation>{
    let params = new HttpParams()
      .set('q',name)
      .set('limit', '1')
      .set('appid', this.APIkey)
    return this.http.get<ILocation>(this.openWeatherAPI,{params}).pipe(
      tap(data =>console.log(data)),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      //The backend returned an unsuccesful response code
      //the response body ma contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
