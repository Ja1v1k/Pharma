import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, isSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'Practice';

  authService = inject(AuthService)
  showLayout = signal<boolean>(false)
  ngOnInit() {
  
    this.authService.isAuthenticated.subscribe(res=>{
      this.showLayout.set(res)
    })
  }
}
