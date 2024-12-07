import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PatientService } from '../../../shared/services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule,CommonModule],
  templateUrl: './patient-dialog.component.html',
  styleUrl: './patient-dialog.component.scss',
  providers: [provideNativeDateAdapter()],

})
export class PatientDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  patientService = inject(PatientService);

  PatientForm: FormGroup;

  // Blood group options
  bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 
    'O+', 'O-', 'AB+', 'AB-'
  ];

  // Gender options
  genders = [
    { key: 'male', value: 'Male' },
    { key: 'female', value: 'Female' },
    { key: 'other', value: 'Other' }
  ];

  constructor(private fb: FormBuilder) {
    this.PatientForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      blood_group: ['', [Validators.required]],
      mobile: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      zipcode: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{6}(-[0-9]{4})?$/)
      ]],
    });
  }

  ngOnInit(): void {
    // Any initialization logic
  }

  // Optional: Submit method
  onSubmit() {
    if (this.PatientForm.valid) {
      console.log(this.PatientForm.value);

      this.patientService.addPatient(this.PatientForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          
        }
      })
      // Process form submission
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.PatientForm.controls).forEach(key => {
        const control = this.PatientForm.get(key);
        control?.markAsTouched();
      });
    }
  }

}
