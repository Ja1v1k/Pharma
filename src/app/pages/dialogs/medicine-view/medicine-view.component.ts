import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-medicine-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './medicine-view.component.html',
  styleUrl: './medicine-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicineViewComponent {
  data = inject(MAT_DIALOG_DATA);
  dashboardService = inject(DashboardService);

  ngOnInit(){
    debugger
    const medicineIds = [this.data.medicine_id]
    this.dashboardService.getMedicineView(medicineIds).subscribe(res=>{
      console.log(res)
    })
  }
}
