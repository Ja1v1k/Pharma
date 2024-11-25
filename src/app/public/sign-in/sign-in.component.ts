import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignInComponent {
  hide = signal(true);

  signInForm: FormGroup

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  route = inject(Router)

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submitForm() {
    this.authService.signIn(this.signInForm.value).subscribe(res => {
      this.route.navigate(['/dashboard'])
    }
    )
  }
}
