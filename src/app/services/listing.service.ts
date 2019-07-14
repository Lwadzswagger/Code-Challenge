import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
selectedItem;
  baseUrl = '../../mockdata/listingData.json';
  constructor(
    public http: HttpClient
  ) { }








  public getData() {
    return this.http.get<any[]>(`${this.baseUrl}`)
      .pipe(
        tap(_ => this.log('Fetched listing Data')),
        catchError(this.handleError('GET listing data', []))
      );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }


}
