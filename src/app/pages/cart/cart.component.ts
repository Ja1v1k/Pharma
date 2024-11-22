import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MaterialModule, NgOptimizedImage, RouterLink, CurrencyPipe,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  sharedService = inject(SharedService)
  dashboardService = inject(DashboardService)
  router = inject(Router)

  medicinedata:any[] = []

  ngOnInit() {
    if(localStorage.getItem('data') != null){
      const data = JSON.parse(localStorage.getItem('data'))
      this.medicinedata.push(...data)
    }else{

      this.sharedService.cartSubject$.subscribe(res => {
        this.medicinedata.push(...res)
        console.log(this.medicinedata)
      })
    }
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

  submit(){
    if(this.medicinedata.length > 0){
      console.log('cart',this.medicinedata)
      let item:any = []
      this.medicinedata.map(x => {
        const obj = { quantity:x.quantity,medicine_id:x.data.id}
        item.push(obj)
      })
      console.log('cart',this.medicinedata)
      console.log('cart',item)
      this.dashboardService.checkOut(JSON.stringify(item)).subscribe(res => {
        if(res){
          debugger
          this.sharedService.sendCheckOutData({res,item:JSON.stringify(item)})
          this.router.navigate(['/checkout'])
        }

      })

    }else{
      return
    }
  }

}
