import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, tap, map } from 'rxjs/operators';
import { IResponseMenu, IRestaurantByMenu } from './interface';

@Injectable({
  providedIn: 'root'
})
export class FindRestaurantsService {
  private menuSearchAPI ='https://api.documenu.com/v2/menuitems/search/geo?';
  private APIKey = '78c47f682129f4ae0faba34ec48655db';
  constructor(private http: HttpClient) { }
  getRestaurantByFood(lat: string, lon: string, dish: string): Observable<IRestaurantByMenu[]>{
    let params = new HttpParams()
      .set('lat',lat)
      .set('lon',lon)
      .set('distance','20')
      .set('size', '100')
      .set('search',dish)
      .set('key',this.APIKey);
    return this.http.get<IResponseMenu>(this.menuSearchAPI,{params}).pipe(
      map(result=>result.data),
      tap(result =>console.log(result)),
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
