import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
authService = inject(AuthService)
route = inject(Router)
logout(){
  this.authService.logOut()
  this.route.navigate(['/signin'])
}
}
