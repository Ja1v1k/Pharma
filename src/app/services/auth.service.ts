import { inject, Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, tap } from 'rxjs';
import { ToasterService } from './toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authfire = inject(AngularFireAuth)
  private toasterService = inject(ToasterService);
  spinner = inject(NgxSpinnerService)

  constructor() { }

  get isAuthenticated():Observable<boolean> {
    return this.authfire.authState.pipe(
      map(user => user !== null) // `authState` returns null if not authenticated
    );
  }

  signUp(user: SignUp): Observable<any> {
    this.spinner.show();
    return from(this.authfire.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      tap(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      }, error => {
        this.toasterService.toast('Error occurred', 'Close','error');
      })
    );
  }

  signIn(user: SignIn): Observable<any> {
    this.spinner.show();
    return from(this.authfire.signInWithEmailAndPassword(user.email, user.password)).pipe(
      tap(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      }, error => {
        this.toasterService.toast('Error occurred', 'Close','error');
      })
    );
  }

  logOut() {
    this.authfire.currentUser = null
    this.authfire.signOut()
  }

}
type SignIn = {
  email: string; password: string;
}
type SignUp = {
  email: string; password: string;
}
