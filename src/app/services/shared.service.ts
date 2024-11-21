import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  constructor() { }
  
  private cartSubject = new BehaviorSubject<any>(null);
  public cartSubject$ = this.cartSubject.asObservable();

  sendCartData(data){
    this.cartSubject.next(data)
    console.log('local',localStorage.getItem('data'))
    if(localStorage.getItem('data') == null){

      localStorage.setItem('data',JSON.stringify(data))
    }
  }




}
