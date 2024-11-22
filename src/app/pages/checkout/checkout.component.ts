import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  PlaceOrderForm: FormGroup
  charges: any;
  shippingCharges: any;
  constructor(private fb: FormBuilder) {

  }
  shareService = inject(SharedService)
  dashboardService = inject(DashboardService)
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
      debugger
      if (items) {
        this.shippingCharges = items.res.data.shipping_charges
        this.charges = items.res.data.items.reduce((z, a) => z + a.mrp, 0)
        this.PlaceOrderForm.patchValue({
          items: items.item
        })
      }
    })

  }

  placeOrder() {

    this.dashboardService.placeOrder(this.PlaceOrderForm.value).subscribe(res =>{
    console.log(res)
    })
  }
}
