import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Medicine } from '../../interface/medicine.interface';
import { MatDialog } from '@angular/material/dialog';
import { MedicineViewComponent } from '../dialogs/medicine-view/medicine-view.component';
import { DashboardService } from '../../shared/services/dashboard.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { SharedService } from '../../shared/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    // {
    //   columnDef: 'schedule_type',
    //   header: 'Schedule Type',
    //   cell: (element: Medicine) => `${element.schedule_type}`,
    // },
    // {
    //   columnDef: 'cess_percentage',
    //   header: 'Cess Percent',
    //   cell: (element: Medicine) => `${element.cess_percentage}`,
    // }
  ];
  dataSource = new MatTableDataSource<Medicine>();
  displayedColumns = this.columns.map(c => c.columnDef);

  dashboardService = inject(DashboardService)
  cdr = inject(ChangeDetectorRef)
  toasterService = inject(ToasterService)
  sharedService = inject(SharedService)
  dialog = inject(MatDialog);
  spinner = inject(NgxSpinnerService)


  dialogRef: any;
  cartData: any[] = [];
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


  medicineView(data) {
    this.spinner.show()

    this.dashboardService.getMedicineView(data.medicine_id).subscribe(
      {
        next: (res) => {
          if (res.data == null && res && res.status_code == "1") {
            this.spinner.hide()
            this.toasterService.toast('No data found',  'info');
            return
          } else if (res.status_code == "0") {
            this.toasterService.toast(res.status_message,  'info');
          }
          this.spinner.hide()

          this.dialogRef = this.dialog.open(MedicineViewComponent, {
            width: '50%',
            panelClass: 'custom-dialog-container',
            data: res.data
          });

        }, error: (error) => {
          this.spinner.hide()
          this.toasterService.toast(error,  'error')
        }
      }
    )

  }

  checkOut(data) { }

  sendDataToCart(data) {
    debugger
    // let getlocalCartData:any = localStorage.getItem('cartData')
    // getlocalCartData = JSON.parse(getlocalCartData)
    // if(getlocalCartData && getlocalCartData?.some(x => data.medicine_id == x.data.id)){
    //   this.toasterService.toast('Already added', 'warn');
    //   return
    // }

    if (this.cartData.some(x => data.medicine_id == x.data.id)) {
      this.toasterService.toast('Already added', 'warn');
      return
    }
    this.dashboardService.getMedicineView(data.medicine_id).subscribe(res => {
      if (res.data == null) {
        this.toasterService.toast('No data found',  'info');
        return
      }
      this.cartData.push({ ...res, quantity: 1 })
      this.sharedService.sendCartData(this.cartData)
      this.toasterService.toast('Added to cart Successfully','success')
    })
  }

}
