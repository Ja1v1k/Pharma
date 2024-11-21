import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeManagerService } from '../../services/theme-manager.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
  authService = inject(AuthService)
  route = inject(Router)
  badge: number;
  logout() {
    this.authService.logOut()
    this.route.navigate(['/signin'])
  }

  private themeManager = inject(ThemeManagerService);
  theme = this.themeManager.theme;

  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  sharedStatus = inject(SharedService)
  ngOnInit() {
    debugger
    this.sharedStatus.cartSubject$.subscribe(res => {
      if(res){
        console.log('cartres',res)
        this.badge = res.length
        console.log('',this.badge)
      }
    }
    )
  }
}
