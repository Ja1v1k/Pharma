import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../shared/services/shared.service';
import { DashboardService } from '../../shared/services/dashboard.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MaterialModule, NgOptimizedImage, RouterLink, CurrencyPipe, FormsModule, NgxSpinnerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartComponent {

  sharedService = inject(SharedService)
  dashboardService = inject(DashboardService)
  toasterService = inject(ToasterService)
  spinner = inject(NgxSpinnerService)
  router = inject(Router)

  medicinedata: any[] = []

  ngOnInit() {

    // let getlocalCartData:any = localStorage.getItem('cartData')
    // getlocalCartData = JSON.parse(getlocalCartData)
        
    // if(getlocalCartData){
    //   this.medicinedata.push(...getlocalCartData)
    // }

    this.sharedService.cartSubject$.subscribe(res => {
      this.medicinedata.push(...res)
    })
    this.calculateSubtotals()
  }

  updateSubtotal(item: any): void {
    item.subtotal = item.data.mrp * item.quantity;
  }

  calculateSubtotals(): void {
    this.medicinedata.forEach(item => {
      item.subtotal = item.data.mrp * item.quantity;
    });
  }

  getTotal(): number {
    return this.medicinedata.reduce((total, item) => total + item.subtotal, 0);
  }

  submit() {
    if (this.medicinedata.length > 0) {
      this.spinner.show()
      let item: any = []
      setTimeout(() => {
        this.medicinedata.map(x => {
          const obj = { quantity: x.quantity, medicine_id: x.data.id }
          item.push(obj)
        })
        this.dashboardService.checkOut(JSON.stringify(item)).subscribe({
          next: (res:any) => {
            if (res.status_code == "1" && res) {
              this.sharedService.sendCheckOutData({ res, item: JSON.stringify(item) })
              this.toasterService.toast(res.status_message,  'success')
              this.router.navigate(['/checkout'])
            } else if(res.status_code == "0" && res){
              this.toasterService.toast(res.status_message,  'error')
            }
            this.spinner.hide()
          },
          error: (error) => {
            this.spinner.hide()
            this.toasterService.toast(error,  'error')
          }
        })
      }, 2000);

    }
  }

}
