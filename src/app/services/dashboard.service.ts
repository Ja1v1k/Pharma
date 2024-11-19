import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  // private http = inject(HttpClient)
  getMedicines(searchstring):Observable<any> {
    const data = new FormData();
      data.append('apikey', 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3')
      data.append('searchstring', searchstring)
      return this.http.post('https://dev-api.evitalrx.in/v1/fulfillment/medicines/search', data)
  }
  getMedicineView(medicineIds):Observable<any> {
    const data = new FormData();
      data.append('apikey', 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3')
      data.append('medicine_ids', medicineIds)
      return this.http.post('https://dev-api.evitalrx.in/v1/fulfillment/medicines/view', data)
  }
}
