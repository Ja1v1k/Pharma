import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MaterialModule, NgOptimizedImage, RouterLink, JsonPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  sharedService = inject(SharedService)

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
  }

}
