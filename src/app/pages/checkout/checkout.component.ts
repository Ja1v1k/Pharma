import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../shared/services/shared.service';
import { DashboardService } from '../../shared/services/dashboard.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { OrderSuccessComponent } from '../dialogs/order-success/order-success.component';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgxSpinnerComponent,NgIf, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  shareService = inject(SharedService)
  dashboardService = inject(DashboardService)
  toasterService = inject(ToasterService)
  spinner = inject(NgxSpinnerService)
  dialog = inject(MatDialog);

  PlaceOrderForm: FormGroup
  charges: any;
  shippingCharges: any;
  dialogRef: any;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.PlaceOrderForm = this.fb.group({
      patient_name: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      auto_assign: [true, Validators.required],
      chemist_id: ['pFSLzbwQTH8LY23N2IlczQ==', Validators.required],
      latitude: ['12.970612', Validators.required],
      longitude: ['77.6382433', Validators.required],
      delivery_type: ['delivery', Validators.required],
      items: ['', Validators.required],
      apikey: ['wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3', Validators.required]
    })

    this.shareService.checkoutSubject$.subscribe(items => {
      if (items) {
        this.shippingCharges = items.res.data?.shipping_charges
        this.charges = items.res.data.items.reduce((z, a) => z + a.mrp, 0)
        this.PlaceOrderForm.patchValue({
          items: items.item
        })
      }
    })

  }

  placeOrder() {
    this.dialogRef = this.dialog.open(OrderSuccessComponent, {
      width: '50%',
      panelClass: '',
      data: 'res.data'
    });
    // this.spinner.show()
    // setTimeout(() => {
      
    // }, 2000);
    // this.dashboardService.placeOrder(this.PlaceOrderForm.value).subscribe({
    //   next: (res:any) => {
    //     if (res.status_code == "1" && res) {
    //       this.toasterService.toast(res.status_message,  'success')
    //       this.dialogRef = this.dialog.open(OrderSuccessComponent, {
    //         width: '50%',
    //         panelClass: 'custom-dialog-container',
    //         data: res.data
    //       });
    //     } else if(res.status_code == "0" && res){
    //       this.toasterService.toast(res.status_message,  'error')
    //     }
    //     this.spinner.hide()
    //   },
    //   error: (error) => {
    //     this.spinner.hide()
    //     this.toasterService.toast(error,  'error')
    //   }
    // })
  }
}
