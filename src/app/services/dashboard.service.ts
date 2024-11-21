import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  getMedicineView(medicineId:any):Observable<any> {
    const data = new FormData();
      data.append('apikey', 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3')
      data.append('medicine_id', medicineId)
      return this.http.post('https://dev-api.evitalrx.in/v1/fulfillment/medicines/view', data)
  }
}
