import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor() {
    // let getlocalCartData: any = localStorage.getItem('cartData')
    // getlocalCartData = JSON.parse(getlocalCartData)
    // this.cartSubject.next(getlocalCartData?.length)
  }

  private cartSubject = new BehaviorSubject<any>(null);
  public cartSubject$ = this.cartSubject.asObservable();

  sendCartData(data: any) {
    // debugger
    // let getlocalCartData: any = localStorage.getItem('cartData')
    // getlocalCartData = JSON.parse(getlocalCartData)
    // if(getlocalCartData){
    //   data = [...data,...getlocalCartData]
    //   localStorage.setItem('cartData', JSON.stringify(data))
    // }else{
    //   localStorage.setItem('cartData', JSON.stringify(data))
    // }
    // let getlocalCartDataNew: any = localStorage.getItem('cartData')
    // getlocalCartDataNew = JSON.parse(getlocalCartData)
    // if (getlocalCartDataNew) {
      this.cartSubject.next(data)
    // }
  }

  // clearLocalCartData() {
  //   localStorage.clear()
  // }

  private checkoutSubject = new BehaviorSubject<any>(null);
  public checkoutSubject$ = this.checkoutSubject.asObservable()

  sendCheckOutData(data: any) {
    this.checkoutSubject.next(data)
  }



}
