import { Component, inject, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from '../dialogs/patient-dialog/patient-dialog.component';
import { PatientService } from '../../shared/services/patient.service';

interface Patient {
  zipcode: string;
  mobile: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  blood_group: string;
}

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {
  dialog = inject(MatDialog);
  patientService = inject(PatientService)

  displayedColumns: string[] = [
    'first_name', 
    'last_name', 
    'dob', 
    'gender', 
    'blood_group', 
    'zipcode', 
    'mobile',
    'actions'
  ];
  
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogRef: any;

  constructor() {
    // Sample patient data - replace with your actual data source
    const PATIENT_DATA: Patient[] = [
      {
        first_name: 'John',
        last_name: 'Doe',
        dob: '1990-05-15',
        gender: 'Male',
        blood_group: 'A+',
        zipcode: '12345',
        mobile: '555-1234'
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        dob: '1985-08-22',
        gender: 'Female',
        blood_group: 'O-',
        zipcode: '67890',
        mobile: '555-5678'
      }
      // Add more patient entries as needed
    ];

    this.dataSource = new MatTableDataSource(PATIENT_DATA);
  }

  ngOnInit(): void {
    // Setup paginator and sort after view initialization
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getPatients()
  }

  getPatients(){
    this.patientService.getAllPatients().subscribe({
      next:(res)=>{
console.log(res)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editPatient(row){

  }

  addPatient(){
    this.dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '50%',
      panelClass: 'custom-dialog-container',
      data: null
    });
  }
}
