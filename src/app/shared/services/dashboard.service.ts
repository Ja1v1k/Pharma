import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  // private http = inject(HttpClient)
  getMedicines(searchstring): Observable<any> {
    const data = new FormData();
    data.append('apikey', environment.apikey)
    data.append('searchstring', searchstring)
    return this.http.post(environment.domain + 'medicines/search', data)
  }
  getMedicineView(medicineId: any): Observable<any> {
    const data = new FormData();
    data.append('apikey', environment.apikey)
    data.append('medicine_id', medicineId)
    return this.http.post(environment.domain + 'medicines/view', data)
  }

  checkOut(items: any) {
    const data = new FormData();
    data.append('apikey', environment.apikey)
    data.append('latitude', '12.970612')
    data.append('longitude', '77.6382433')
    data.append('items', items)
    return this.http.post(environment.domain + 'orders/checkout', data)
  }

  placeOrder(data: any) {
    const formData = new FormData();
    formData.append('apikey', data.apikey);
    formData.append('items', data.items);
    formData.append('delivery_type', data.delivery_type);
    formData.append('patient_name', data.patient_name);
    formData.append('mobile', data.mobile);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('zipcode', data.zipcode);
    formData.append('auto_assign', data.auto_assign);
    formData.append('chemist_id', data.chemist_id);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    return this.http.post(environment.domain + 'orders/place_order', formData)
  }
}
