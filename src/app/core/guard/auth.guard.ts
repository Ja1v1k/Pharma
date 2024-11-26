import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  return authService.isAuthenticated.pipe(
    take(1), // Ensure we only take the first emitted value
    map(isAuth => {
      if (isAuth) {
        return true; // Allow navigation if authenticated
      } else {
        router.navigate(['/signin']); // Redirect to signin if not authenticated
        return false;
      }
    })
  );
};
