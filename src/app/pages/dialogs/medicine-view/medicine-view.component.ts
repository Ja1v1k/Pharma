import { ChangeDetectionStrategy, Component, inject, Pipe, signal } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../../services/dashboard.service';
import { JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-medicine-view',
  standalone: true,
  imports: [MaterialModule,NgOptimizedImage,NgIf],
  templateUrl: './medicine-view.component.html',
  styleUrl: './medicine-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicineViewComponent {
  data = inject(MAT_DIALOG_DATA);
  dashboardService = inject(DashboardService);

  medicineData = signal<any>(null)
  toasterService = inject(ToasterService)
  ngOnInit(){
    this.medicineData.set(this.data)
    debugger
    // this.dashboardService.getMedicineView(this.data.medicine_id).subscribe(res=>{
    //   if(res.data.length == 0){
    //     this.toasterService.toast('No data found', 'Close');
    //     return
    //   }
    //   this.medicineData.set(res.data)
    // })
  }
}
