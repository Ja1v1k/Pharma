import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  constructor() { }
  
  private cartSubject = new BehaviorSubject<any>(null);
  public cartSubject$ = this.cartSubject.asObservable();

  sendCartData(data:any){
    this.cartSubject.next(data)
    // console.log('local',localStorage.getItem('data'))
    // if(localStorage.getItem('data') == null){

    //   localStorage.setItem('data',JSON.stringify(data))
    // }
  }

  private checkoutSubject = new BehaviorSubject<any>(null);
  public checkoutSubject$ = this.checkoutSubject.asObservable()

  sendCheckOutData(data:any){
    this.checkoutSubject.next(data)
  }



}
