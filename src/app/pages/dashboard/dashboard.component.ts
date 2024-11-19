import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';
import { firstValueFrom } from 'rxjs';
import { Medicine } from '../../interface/medicine.interface';
import { MatDialog } from '@angular/material/dialog';
import { MedicineViewComponent } from '../dialogs/medicine-view/medicine-view.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  columns = [
    {
      columnDef: 'medicine_name',
      header: 'Medicine Name',
      cell: (element: Medicine) => `${element.medicine_name}`,
    },
    {
      columnDef: 'manufacturer_name',
      header: 'Manufacturer Name',
      cell: (element: Medicine) => `${element.medicine_name}`,
    },
    {
      columnDef: 'content',
      header: 'Content',
      cell: (element: Medicine) => `${element.content}`,
    },
    {
      columnDef: 'dosage_type',
      header: 'Dosage Type',
      cell: (element: Medicine) => `${element.dosage_type}`,
    },
    {
      columnDef: 'medicine_type',
      header: 'Type',
      cell: (element: Medicine) => `${element.medicine_type}`,
    },
    {
      columnDef: 'mrp',
      header: 'MRP',
      cell: (element: Medicine) => `${element.mrp}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: Medicine) => `${element.price}`,
    },
    {
      columnDef: 'size',
      header: 'Size',
      cell: (element: Medicine) => `${element.size}`,
    },
    {
      columnDef: 'gst_percentage',
      header: 'GST Percent',
      cell: (element: Medicine) => `${element.gst_percentage}`,
    },
    {
      columnDef: 'schedule_type',
      header: 'Schedule Type',
      cell: (element: Medicine) => `${element.schedule_type}`,
    },
    {
      columnDef: 'cess_percentage',
      header: 'Cess Percent',
      cell: (element: Medicine) => `${element.cess_percentage}`,
    }
  ];
  dataSource = new MatTableDataSource<Medicine>();
  displayedColumns = this.columns.map(c => c.columnDef);

  dashboardService = inject(DashboardService)
  cdr = inject(ChangeDetectorRef)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dashboardService.getMedicines(filterValue).subscribe(res => {
      this.dataSource = res.data.result
    })
  }

  async filterRemove(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      await this.getAllMedicinesData()
    }
  }

  async ngOnInit() {

    await this.getAllMedicinesData()
  }

  async getAllMedicinesData() {
    let data: any = []
    const medicines = ['dolo', 'ltk', 'beta', 'mamy', 'zifi', 'Thyrox', 'Shilajit', 'Ashwagandha', 'Trichup']

    const promises = medicines.map(async (medicine) => {
      const res = await firstValueFrom(this.dashboardService.getMedicines(medicine))
      data.push(...res.data.result);
    });

    await Promise.all(promises);


    this.dataSource = data;
    this.shuffleArray(this.dataSource)
    this.cdr.detectChanges();
  }

  shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  dialog = inject(MatDialog);

  medicineView(data) {
      debugger
      const dialogRef = this.dialog.open(MedicineViewComponent,{
        height: '400px',
        width: '600px',
        data:data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
  // checkOut(data){}

}
