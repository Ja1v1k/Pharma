import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ThemeManagerService } from '../../shared/services/theme-manager.service';
import { SharedService } from '../../shared/services/shared.service';

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
  private themeManager = inject(ThemeManagerService);
  sharedStatus = inject(SharedService)

  badge: number;
  theme = this.themeManager.theme;

  darkmode = signal(false);
  setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkmode())
  })

  ngOnInit() {
    // let getlocalCartData:any = localStorage.getItem('cartData')
    // getlocalCartData = JSON.parse(getlocalCartData)
    // if(getlocalCartData){
    // this.badge += getlocalCartData.length
    // }
    
    this.sharedStatus.cartSubject$.subscribe(res => {
      if (res) {
        this.badge = res.length
      }
    }
    )
  }

  logout() {
    this.authService.logOut()
    this.route.navigate(['/signin'])
  }


  toggleTheme() {
    // this.themeManager.toggleTheme();
  }

}
