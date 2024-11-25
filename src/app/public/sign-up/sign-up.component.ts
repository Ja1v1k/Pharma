import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { EmailValidator, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignUpComponent {
  hide = signal(true);
  
  signUpForm: FormGroup;
  
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  route = inject(Router)
  ngOnInit() {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submitForm() {
    this.authService.signUp(this.signUpForm.value).subscribe(res => {
      this.route.navigate(['/'])
    }
    )
  }
}
